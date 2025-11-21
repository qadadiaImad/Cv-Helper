'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { TemplateSuggestionsSection as Section } from '@/lib/ats-types'

interface TemplateSectionProps {
  section: Section
  uiTexts: { [key: string]: string }
}

export function TemplateSection({ section, uiTexts }: TemplateSectionProps) {
  const handleSelectTemplate = (templateName: string) => {
    // Navigate to builder with template selected
    window.location.href = `/dashboard/builder?template=${encodeURIComponent(templateName)}`
  }

  return (
    <Card id="templates">
      <CardHeader>
        <CardTitle className="text-2xl">Recommended Templates</CardTitle>
        <CardDescription className="mt-1">
          {section.generic_call_to_action}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {section.recommended_templates.map((template, idx) => (
            <Card key={idx} className="overflow-hidden bg-gradient-to-br from-secondary/50 to-transparent">
              <div className="aspect-[8.5/11] w-full bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl font-bold text-primary">
                      {template.template_name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold">{template.template_name}</h4>
                </div>
              </div>
              
              <CardContent className="pt-6">
                <p className="mb-4 text-sm text-muted-foreground">{template.reason}</p>
                <Button
                  onClick={() => handleSelectTemplate(template.template_name)}
                  className="w-full"
                  size="sm"
                >
                  {uiTexts.cta_choose_template || 'Choose Template'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
