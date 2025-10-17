"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Eye, ExternalLink, Printer } from "lucide-react"
import { htmlTemplates, generateHTMLDocument, type HTMLTemplate } from "@/lib/html-templates"
import type { ResumeData } from "@/lib/react-templates"

interface HTMLTemplatePreviewProps {
  resumeData: ResumeData
}

export function HTMLTemplatePreview({ resumeData }: HTMLTemplatePreviewProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<HTMLTemplate | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const handlePreview = (template: HTMLTemplate) => {
    setSelectedTemplate(template)
    setPreviewOpen(true)
  }

  const handleDownload = (template: HTMLTemplate) => {
    const htmlDocument = generateHTMLDocument(template, resumeData)
    const blob = new Blob([htmlDocument], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${resumeData.name?.replace(/\s+/g, '_') || 'resume'}_${template.id}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = (template: HTMLTemplate) => {
    const htmlDocument = generateHTMLDocument(template, resumeData)
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlDocument)
      printWindow.document.close()
      printWindow.focus()
      setTimeout(() => {
        printWindow.print()
        printWindow.close()
      }, 250)
    }
  }

  const categories = Array.from(new Set(htmlTemplates.map(t => t.category)))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">HTML Templates</h3>
          <p className="text-sm text-muted-foreground">
            Export your resume as print-ready HTML with professional styling
          </p>
        </div>
        <Badge variant="outline" className="text-xs">
          {htmlTemplates.length} templates
        </Badge>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {category} Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {htmlTemplates
              .filter(template => template.category === category)
              .map(template => (
                <Card key={template.id} className="card-modern group hover:shadow-md transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {template.name}
                          {template.isNew && (
                            <Badge variant="default" className="text-xs bg-green-500 hover:bg-green-600">
                              New
                            </Badge>
                          )}
                          {template.isPro && (
                            <Badge variant="default" className="text-xs bg-orange-500 hover:bg-orange-600">
                              Pro
                            </Badge>
                          )}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {template.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.features.slice(0, 3).map(feature => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                      {template.features.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{template.features.length - 3}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePreview(template)}
                        className="flex-1"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Preview
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePrint(template)}
                      >
                        <Printer className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(template)}
                        className="btn-primary"
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        License: {template.license}
                        {template.author && ` • by ${template.author}`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {selectedTemplate?.name} Preview
            </DialogTitle>
          </DialogHeader>
          
          {selectedTemplate && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="text-sm">
                  <p className="font-medium">{selectedTemplate.name}</p>
                  <p className="text-muted-foreground text-xs">{selectedTemplate.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handlePrint(selectedTemplate)}
                  >
                    <Printer className="h-3 w-3 mr-1" />
                    Print
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleDownload(selectedTemplate)}
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden bg-white">
                <div 
                  className="p-4 overflow-y-auto max-h-[60vh] text-sm"
                  dangerouslySetInnerHTML={{ 
                    __html: generateHTMLDocument(selectedTemplate, resumeData)
                      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '') // Remove scripts for security
                      .replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/, '') // Remove head
                      .replace(/<\/body>[\s\S]*?<\/html>/, '') // Remove closing tags
                  }}
                />
              </div>
              
              <div className="text-xs text-muted-foreground p-3 bg-secondary/10 rounded-lg">
                <p><strong>Note:</strong> This is a simplified preview. The downloaded HTML file will include full styling and print optimization.</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
