import { spawn } from "child_process"
import { promises as fs } from "fs"
import { join } from "path"
import { randomUUID } from "crypto"

export interface CompileOptions {
  tex: string
  timeout?: number
  maxSize?: number
}

export interface CompileResult {
  success: boolean
  pdf?: Buffer
  error?: string
  logs?: string
}

export async function compileTex({
  tex,
  timeout = 10000,
  maxSize = 204800, // 200KB max input
}: CompileOptions): Promise<CompileResult> {
  console.log("[v0] Starting LaTeX compilation, input size:", tex.length)

  // Security: Check input size
  if (tex.length > maxSize) {
    console.log("[v0] Input too large:", tex.length, "bytes")
    return {
      success: false,
      error: "Input too large (max 200KB)",
    }
  }

  // Security: Check for dangerous commands
  const dangerousPatterns = [
    /\\write18/,
    /\\immediate\\write18/,
    /\\input\{[^}]*\|/,
    /\\openin/,
    /\\openout/,
    /\\write/,
  ]

  for (const pattern of dangerousPatterns) {
    if (pattern.test(tex)) {
      console.log("[v0] Dangerous LaTeX command detected")
      return {
        success: false,
        error: "Dangerous LaTeX command detected",
      }
    }
  }

  const tempDir = join("/tmp", `latex-${randomUUID()}`)
  console.log("[v0] Using temp directory:", tempDir)

  try {
    // Create temporary directory
    await fs.mkdir(tempDir, { recursive: true })

    // Write tex file
    const texFile = join(tempDir, "document.tex")
    await fs.writeFile(texFile, tex, "utf8")
    console.log("[v0] LaTeX file written")

    // Compile with tectonic
    const result = await new Promise<CompileResult>((resolve) => {
      console.log("[v0] Starting tectonic process")
      const proc = spawn("tectonic", ["-Zshell-escape=0", texFile], {
        cwd: tempDir,
        stdio: ["pipe", "pipe", "pipe"],
      })

      const chunks: Buffer[] = []
      const errorChunks: Buffer[] = []

      proc.stdout.on("data", (data) => chunks.push(Buffer.from(data)))
      proc.stderr.on("data", (data) => errorChunks.push(Buffer.from(data)))

      const timer = setTimeout(() => {
        console.log("[v0] Compilation timeout, killing process")
        proc.kill("SIGKILL")
        resolve({
          success: false,
          error: "Compilation timeout",
        })
      }, timeout)

      proc.on("close", async (code) => {
        clearTimeout(timer)
        console.log("[v0] Tectonic process closed with code:", code)

        const logs = Buffer.concat(errorChunks).toString("utf8")

        if (code === 0) {
          try {
            const pdfPath = join(tempDir, "document.pdf")
            const pdf = await fs.readFile(pdfPath)
            console.log("[v0] PDF generated successfully, size:", pdf.length)
            resolve({
              success: true,
              pdf,
              logs,
            })
          } catch (error) {
            console.log("[v0] Failed to read PDF output:", error)
            resolve({
              success: false,
              error: "Failed to read PDF output",
              logs,
            })
          }
        } else {
          console.log("[v0] Compilation failed with logs:", logs)
          resolve({
            success: false,
            error: `Compilation failed with code ${code}`,
            logs,
          })
        }
      })

      proc.on("error", (error) => {
        clearTimeout(timer)
        console.log("[v0] Process error:", error.message)
        resolve({
          success: false,
          error: `Process error: ${error.message}`,
        })
      })
    })

    return result
  } catch (error) {
    console.log("[v0] Setup error:", error)
    return {
      success: false,
      error: `Setup error: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  } finally {
    // Cleanup
    try {
      await fs.rm(tempDir, { recursive: true, force: true })
      console.log("[v0] Cleanup completed")
    } catch {
      console.log("[v0] Cleanup failed (non-critical)")
    }
  }
}
