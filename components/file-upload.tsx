"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, type File, X, CheckCircle, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  onTextExtracted?: (text: string, metadata?: any) => void
  acceptedTypes?: string[]
  maxSize?: number
  className?: string
  extractText?: boolean // New prop to control text extraction
  fileType?: 'cv' | 'jd' // New prop to specify file type for API
}

export function FileUpload({
  onFileUpload,
  onTextExtracted,
  acceptedTypes = [".pdf", ".docx", ".doc", ".txt"],
  maxSize = 10 * 1024 * 1024, // 10MB
  className,
  extractText = true, // Default to true for backward compatibility
  fileType = 'cv', // Default to cv for backward compatibility
}: FileUploadProps) {
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "processing" | "success" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      console.log("[v0] File dropped:", file.name, file.type, file.size)

      setUploadedFile(file)
      setUploadStatus("uploading")
      setErrorMessage(null)
      setUploadProgress(0)

      try {
        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 100)

        // Process the file
        setUploadStatus("processing")
        setUploadProgress(100)

        onFileUpload(file)

        // If text extraction is requested, parse the file
        if (onTextExtracted && extractText) {
          try {
            // Call the parse API instead of importing Node.js modules
            const formData = new FormData()
            formData.append('file', file)
            formData.append('type', fileType) // Use the fileType prop

            const response = await fetch('/api/parse', {
              method: 'POST',
              body: formData,
            })

            if (response.ok) {
              const result = await response.json()
              onTextExtracted(result.text, result.metadata)
            } else {
              throw new Error('Failed to parse file')
            }
          } catch (error) {
            console.error('[v0] Text extraction failed:', error)
            throw error
          }
        }

        setUploadStatus("success")
        console.log("[v0] File processed successfully")
      } catch (error) {
        console.error("[v0] File processing failed:", error)
        setUploadStatus("error")
        setErrorMessage(error instanceof Error ? error.message : "Failed to process file")
      }
    },
    [onFileUpload, onTextExtracted],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "text/plain": [".txt"],
    },
    maxSize,
    multiple: false,
  })

  const resetUpload = () => {
    setUploadStatus("idle")
    setUploadProgress(0)
    setErrorMessage(null)
    setUploadedFile(null)
  }

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case "success":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "error":
        return <AlertCircle className="h-8 w-8 text-red-500" />
      case "uploading":
      case "processing":
        return <Upload className="h-8 w-8 text-blue-500 animate-pulse" />
      default:
        return <Upload className="h-8 w-8 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Uploading file..."
      case "processing":
        return "Processing file..."
      case "success":
        return "File processed successfully!"
      case "error":
        return errorMessage || "Upload failed"
      default:
        return isDragActive ? "Drop your file here" : "Drag & drop your CV here, or click to browse"
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        {...getRootProps()}
        className={cn(
          "cursor-pointer transition-colors border-2 border-dashed",
          isDragActive && "border-primary bg-primary/5",
          uploadStatus === "success" && "border-green-500 bg-green-50",
          uploadStatus === "error" && "border-red-500 bg-red-50",
          uploadStatus === "idle" && "hover:border-primary hover:bg-muted/50",
        )}
      >
        <input {...getInputProps()} />
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          {getStatusIcon()}

          <div className="mt-4 space-y-2">
            <p className="text-lg font-medium">{getStatusText()}</p>

            {uploadStatus === "idle" && (
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  Supports PDF, DOCX, DOC, and TXT files up to {Math.round(maxSize / (1024 * 1024))}MB
                </p>
                <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            )}

            {(uploadStatus === "uploading" || uploadStatus === "processing") && (
              <div className="w-full max-w-xs mx-auto space-y-2">
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-xs text-muted-foreground">{uploadProgress}%</p>
              </div>
            )}

            {uploadedFile && uploadStatus === "success" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{uploadedFile.name}</span>
                <span>({Math.round(uploadedFile.size / 1024)} KB)</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Rejections */}
      {fileRejections.length > 0 && (
        <Card className="border-red-500">
          <CardContent className="py-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Upload Error</span>
            </div>
            <ul className="mt-2 text-sm text-red-600 space-y-1">
              {fileRejections.map(({ file, errors }) => (
                <li key={file.name}>
                  <strong>{file.name}:</strong> {errors.map((error) => error.message).join(", ")}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Reset Button */}
      {(uploadStatus === "success" || uploadStatus === "error") && (
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={resetUpload}>
            <X className="h-4 w-4 mr-2" />
            Upload Another File
          </Button>
        </div>
      )}
    </div>
  )
}
