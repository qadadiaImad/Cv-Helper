"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Briefcase, Sparkles, Copy, Check } from "lucide-react"
import { useCVAdaptation } from "@/hooks/use-cv-adaptation"

interface CVUploadPanelProps {
  templateId: string
  onAdaptationComplete?: (tex: string) => void
}

export function CVUploadPanel({ templateId, onAdaptationComplete }: CVUploadPanelProps) {
  const [cvText, setCvText] = useState("")
  const [jdText, setJdText] = useState("")
  const [cvMetadata, setCvMetadata] = useState<any>(null)
  const [jdMetadata, setJdMetadata] = useState<any>(null)
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const { isAdapting, result, error, adaptCV } = useCVAdaptation({
    onSuccess: (result) => {
      onAdaptationComplete?.(result.tex)
    },
  })

  const handleCVUpload = (text: string, metadata?: any) => {
    setCvText(text)
    setCvMetadata(metadata)
  }

  const handleJDUpload = (text: string, metadata?: any) => {
    setJdText(text)
    setJdMetadata(metadata)
  }

  const handleAdapt = () => {
    if (cvText.trim() && jdText.trim()) {
      adaptCV({
        cv_text: cvText,
        jd_text: jdText,
        template_id: templateId,
        language,
      })
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error("Failed to copy text:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <Sparkles className="h-8 w-8 mx-auto text-primary" />
        <h3 className="text-lg font-semibold">AI-Powered Resume Adaptation</h3>
        <p className="text-sm text-muted-foreground">
          Upload your existing CV and a job description to automatically tailor your resume
        </p>
      </div>

      <Separator />

      <Tabs defaultValue="cv" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cv" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Your CV
          </TabsTrigger>
          <TabsTrigger value="jd" className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Job Description
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cv" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Upload Your Current CV</CardTitle>
              <CardDescription>Upload a PDF, DOCX, or paste your CV text directly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                onTextExtracted={handleCVUpload}
                acceptedTypes={[".pdf", ".docx", ".doc", ".txt"]}
                onFileUpload={(file) => console.log("[v0] CV file uploaded:", file.name)}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Or paste your CV text:</label>
                  {cvText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(cvText, "cv")}
                      className="h-6 px-2"
                    >
                      {copiedText === "cv" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  )}
                </div>
                <Textarea
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  placeholder="Paste your current CV text here..."
                  className="min-h-[200px] resize-none"
                />
              </div>

              {cvMetadata && (
                <div className="flex flex-wrap gap-2">
                  {cvMetadata.pages && <Badge variant="secondary">Pages: {cvMetadata.pages}</Badge>}
                  {cvMetadata.wordCount && <Badge variant="secondary">Words: {cvMetadata.wordCount}</Badge>}
                  {cvMetadata.author && <Badge variant="outline">Author: {cvMetadata.author}</Badge>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jd" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Job Description</CardTitle>
              <CardDescription>Upload or paste the job description you want to apply for</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUpload
                onTextExtracted={handleJDUpload}
                acceptedTypes={[".pdf", ".docx", ".doc", ".txt"]}
                onFileUpload={(file) => console.log("[v0] JD file uploaded:", file.name)}
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Or paste job description:</label>
                  {jdText && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(jdText, "jd")}
                      className="h-6 px-2"
                    >
                      {copiedText === "jd" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </Button>
                  )}
                </div>
                <Textarea
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="min-h-[200px] resize-none"
                />
              </div>

              {jdMetadata && (
                <div className="flex flex-wrap gap-2">
                  {jdMetadata.title && <Badge variant="secondary">Title: {jdMetadata.title}</Badge>}
                  {jdMetadata.company && <Badge variant="secondary">Company: {jdMetadata.company}</Badge>}
                  {jdMetadata.location && <Badge variant="outline">Location: {jdMetadata.location}</Badge>}
                  {jdMetadata.wordCount && <Badge variant="outline">Words: {jdMetadata.wordCount}</Badge>}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Language Selection and Adapt Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Target Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as "en" | "fr")}
                className="border rounded-md px-3 py-2 text-sm bg-background"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>

            <Button
              onClick={handleAdapt}
              disabled={!cvText.trim() || !jdText.trim() || isAdapting}
              size="lg"
              className="flex-1 max-w-xs"
            >
              {isAdapting ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Adapting Resume...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Adapt Resume with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <Card className="border-green-500">
          <CardHeader>
            <CardTitle className="text-green-600 text-base flex items-center gap-2">
              <Check className="h-4 w-4" />
              Resume Adapted Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Your resume has been tailored to match the job description. Switch to the LaTeX Editor tab to review and
              edit the generated code.
            </p>
            {result.warnings && result.warnings.length > 0 && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-sm font-medium text-yellow-800 mb-1">Warnings:</p>
                <ul className="text-sm text-yellow-700 space-y-1">
                  {result.warnings.map((warning, index) => (
                    <li key={index}>• {warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-500">
          <CardHeader>
            <CardTitle className="text-red-600 text-base">Adaptation Failed</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
