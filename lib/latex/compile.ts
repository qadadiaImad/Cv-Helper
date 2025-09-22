import { spawn } from "child_process"
import { promises as fs } from "fs"
import { join } from "path"
import { randomUUID } from "crypto"
import { tmpdir } from "os"
import path from "path"

// Get tectonic executable path
function getTectonicPath(): string {
  // Try local tectonic.exe first
  const localTectonic = path.join(process.cwd(), "tectonic.exe")
  return localTectonic
}

// Check if tectonic is available
async function checkTectonicAvailable(): Promise<boolean> {
  return new Promise((resolve) => {
    const tectonicPath = getTectonicPath()
    const proc = spawn(tectonicPath, ["--version"], { stdio: "pipe" })
    
    const timer = setTimeout(() => {
      proc.kill()
      resolve(false)
    }, 2000)
    
    proc.on("close", (code) => {
      clearTimeout(timer)
      resolve(code === 0)
    })
    
    proc.on("error", () => {
      clearTimeout(timer)
      // Try system tectonic as fallback
      const systemProc = spawn("tectonic", ["--version"], { stdio: "pipe" })
      const systemTimer = setTimeout(() => {
        systemProc.kill()
        resolve(false)
      }, 2000)
      
      systemProc.on("close", (code) => {
        clearTimeout(systemTimer)
        resolve(code === 0)
      })
      
      systemProc.on("error", () => {
        clearTimeout(systemTimer)
        resolve(false)
      })
    })
  })
}

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
  timeout = 60000, // Increased to 60 seconds for first-time package downloads
  maxSize = 204800, // 200KB max input
}: CompileOptions): Promise<CompileResult> {
  console.log("[v0] Starting LaTeX compilation, input size:", tex.length)

  // Check if tectonic is available
  const isTectonicAvailable = await checkTectonicAvailable()
  if (!isTectonicAvailable) {
    console.log("[v0] Tectonic not available, returning LaTeX code only")
    return {
      success: false,
      error: "LaTeX compiler (tectonic) not installed. Please install tectonic or use the LaTeX code directly.",
      logs: `LaTeX code generated successfully (${tex.length} characters).\n\nTo install tectonic:\n- Windows: Download from https://tectonic-typesetting.github.io/\n- macOS: brew install tectonic\n- Linux: cargo install tectonic\n\nAlternatively, you can copy the LaTeX code and compile it with any LaTeX distribution.`,
    }
  }

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

  const tempDir = join(tmpdir(), `latex-${randomUUID()}`)
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
      const tectonicPath = getTectonicPath()
      const proc = spawn(tectonicPath, [texFile], {
        cwd: tempDir,
        stdio: ["pipe", "pipe", "pipe"],
      })

      const chunks: Buffer[] = []
      const errorChunks: Buffer[] = []

      proc.stdout.on("data", (data) => {
        const output = data.toString()
        console.log("[v0] Tectonic stdout:", output)
        chunks.push(Buffer.from(data))
      })
      proc.stderr.on("data", (data) => {
        const output = data.toString()
        console.log("[v0] Tectonic stderr:", output)
        errorChunks.push(Buffer.from(data))
      })

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
