"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ArrowLeft, Download, Eye, Sparkles } from "lucide-react"
import { getTemplate } from "@/lib/templates"

const templates = [
  {
    id: "jake_gutierrez",
    name: "Jake Gutierrez",
    description: "Modern design with FontAwesome icons and clean typography",
    author: "Jake Gutierrez",
    features: ["FontAwesome Icons", "Modern Layout", "ATS-Friendly"],
    preview: "/templates/jake_gutierrez/preview.png" // We'll need to add preview images
  },
  {
    id: "sb2nov",
    name: "SB2nov",
    description: "Classic academic/professional layout with traditional styling",
    author: "Sourabh Bajaj",
    features: ["Classic Design", "Academic Focus", "Professional"],
    preview: "/templates/sb2nov/preview.png"
  }
]

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-semibold">Template Gallery</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Template</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select from our professionally designed LaTeX templates. Each template is ATS-friendly
            and optimized for modern resume standards.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-4xl mx-auto">
          {templates.map((template) => (
            <Card key={template.id} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    <CardDescription className="mt-1">
                      by {template.author}
                    </CardDescription>
                  </div>
                  {selectedTemplate === template.id && (
                    <Badge variant="secondary" className="ml-2">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Selected
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Template Preview Placeholder */}
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25">
                  <div className="text-center text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Preview coming soon</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant={selectedTemplate === template.id ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    {selectedTemplate === template.id ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Select Template
                      </>
                    )}
                  </Button>

                  <Link href={`/dashboard/builder?template=${template.id}`}>
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Use Template
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTemplate && (
          <div className="text-center mt-12">
            <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold mb-2">
                Ready to build with {templates.find(t => t.id === selectedTemplate)?.name}?
              </h3>
              <p className="text-muted-foreground mb-4">
                Start creating your professional resume with this template.
              </p>
              <Link href={`/dashboard/builder?template=${selectedTemplate}`}>
                <Button size="lg">
                  Start Building
                  <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Want More Templates?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're constantly adding new templates. Have a specific style in mind?
              Let us know and we'll consider adding it to our collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard/builder">
                <Button variant="outline">
                  Build with Current Templates
                </Button>
              </Link>
              <Button variant="outline" disabled>
                Request New Template
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
