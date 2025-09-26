"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { ProfileSelector } from "@/components/profile-selector"
import { JobDescriptionSelector } from "@/components/job-description-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { FileText, Briefcase, Sparkles, Copy, Check, User, Zap } from "lucide-react"
import { useCVAdaptation } from "@/hooks/use-cv-adaptation"
import { ProfileService, type UserProfile, type JobDescription } from "@/lib/profile-service"

interface EnhancedCVUploadPanelProps {
  templateId: string
  onAdaptationComplete?: (tex: string) => void
}

export function EnhancedCVUploadPanel({ templateId, onAdaptationComplete }: EnhancedCVUploadPanelProps) {
  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null)
  const [selectedJD, setSelectedJD] = useState<JobDescription | null>(null)
  const [manualCvText, setManualCvText] = useState("")
  const [manualJdText, setManualJdText] = useState("")
  const [language, setLanguage] = useState<"en" | "fr">("en")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<"profiles" | "manual">("profiles")

  const { isAdapting, result, error, adaptCV } = useCVAdaptation({
    onSuccess: (result) => {
      onAdaptationComplete?.(result.tex)
    },
  })

  const handleCVUpload = (text: string, metadata?: any) => {
    setManualCvText(text)
  }

  const handleJDUpload = (text: string, metadata?: any) => {
    setManualJdText(text)
  }

  const handleAdapt = () => {
    let cvText = ""
    let jdText = ""

    // Get CV text from selected profile or manual input
    if (activeTab === "profiles" && selectedProfile) {
      // Convert profile data to text format
      const profile = selectedProfile.data
      cvText = `
${profile.fullName}
${profile.email}
${profile.phone || ""}

EDUCATION:
${profile.education.map(edu => `${edu.degree} - ${edu.school}, ${edu.city} (${edu.dates})`).join("\n")}

EXPERIENCE:
${profile.experience.map(exp => `${exp.title} at ${exp.company}, ${exp.city} (${exp.dates})\n${exp.bullets.join("\n")}`).join("\n\n")}

PROJECTS:
${profile.projects.map(proj => `${proj.name} - ${proj.stack} (${proj.dates})\n${proj.bullets.join("\n")}`).join("\n\n")}

SKILLS:
Languages: ${profile.skills.languages.join(", ")}
Frameworks: ${profile.skills.frameworks.join(", ")}
Tools: ${profile.skills.tools.join(", ")}
      `.trim()
    } else {
      cvText = manualCvText
    }

    // Get JD text from selected JD or manual input
    if (selectedJD) {
      jdText = selectedJD.content
    } else {
      jdText = manualJdText
    }

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

  const canAdapt = () => {
    const hasCvData = (activeTab === "profiles" && selectedProfile) || manualCvText.trim()
    const hasJdData = selectedJD || manualJdText.trim()
    return hasCvData && hasJdData
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Resume Adaptation
          </CardTitle>
          <CardDescription>
            Combine your personal information with a job description to create a tailored resume
          </CardDescription>
        </CardHeader>
      </Card>

      {/* CV Source Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Step 1: Your Information
          </CardTitle>
          <CardDescription>Choose your CV source</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as typeof activeTab)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profiles">Saved Profiles</TabsTrigger>
              <TabsTrigger value="manual">Upload/Paste CV</TabsTrigger>
            </TabsList>

            <TabsContent value="profiles" className="space-y-4">
              <ProfileSelector
                selectedProfile={selectedProfile}
                onProfileSelect={setSelectedProfile}
              />
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div className="space-y-4">
                <FileUpload
                  onTextExtracted={handleCVUpload}
                  acceptedTypes={[".pdf", ".docx", ".doc", ".txt"]}
                  onFileUpload={(file) => console.log("[v0] CV file uploaded:", file.name)}
                  fileType="cv"
                />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Or paste your CV text:</Label>
                    {manualCvText && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(manualCvText, "cv")}
                        className="h-6 px-2"
                      >
                        {copiedText === "cv" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </Button>
                    )}
                  </div>
                  <Textarea
                    value={manualCvText}
                    onChange={(e) => setManualCvText(e.target.value)}
                    placeholder="Paste your current CV text here..."
                    className="min-h-[200px] resize-none"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Job Description Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Step 2: Job Description
          </CardTitle>
          <CardDescription>Select or add the target job description</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <JobDescriptionSelector
            selectedJD={selectedJD}
            onJDSelect={setSelectedJD}
          />

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Or paste job description manually:</Label>
              {manualJdText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(manualJdText, "jd")}
                  className="h-6 px-2"
                >
                  {copiedText === "jd" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              )}
            </div>
            <Textarea
              value={manualJdText}
              onChange={(e) => setManualJdText(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[200px] resize-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Adaptation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Step 3: Generate Adapted Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <Label className="text-sm font-medium">Target Language</Label>
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
              disabled={!canAdapt() || isAdapting}
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

          {/* Status indicators */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={activeTab === "profiles" && selectedProfile ? "default" : "secondary"}>
              CV: {activeTab === "profiles" && selectedProfile ? selectedProfile.name : manualCvText ? "Manual Input" : "Not Selected"}
            </Badge>
            <Badge variant={selectedJD || manualJdText ? "default" : "secondary"}>
              JD: {selectedJD ? `${selectedJD.title} at ${selectedJD.company}` : manualJdText ? "Manual Input" : "Not Selected"}
            </Badge>
            <Badge variant="outline">
              Template: {templateId.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
            </Badge>
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
