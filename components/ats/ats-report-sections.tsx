'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ATSReport } from '@/lib/ats-types'
import { ParseRateSection } from './sections/parse-rate-section'
import { QuantifyImpactSection } from './sections/quantify-impact-section'
import { RepetitionSection } from './sections/repetition-section'
import { GrammarSection } from './sections/grammar-section'
import { EssentialSectionsSection } from './sections/essential-sections-section'
import { ContactInfoSection } from './sections/contact-info-section'
import { FileFormatSection } from './sections/file-format-section'
import { LengthSection } from './sections/length-section'
import { StyleSection } from './sections/style-section'
import { TemplateSection } from './sections/template-section'
import { KeywordsSection } from './sections/keywords-section'
import { DesignSection } from './sections/design-section'

interface ATSReportSectionsProps {
  report: ATSReport
  pdfFile?: File
  parsedData?: any
}

export function ATSReportSections({ report, pdfFile, parsedData }: ATSReportSectionsProps) {
  return (
    <div className="space-y-8">
      {/* Parse Rate - Top Priority */}
      <ParseRateSection 
        section={report.sections.ats_parse_rate} 
        uiTexts={report.ui_texts}
        pdfFile={pdfFile}
        parsedData={parsedData}
      />

      {/* Reassurance Card */}
      <Card className="border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">✓</span>
            InfiniteCV Templates are ATS-Optimized
          </CardTitle>
          <CardDescription>
            All our resume templates have been tested with major ATS systems and pass with flying colors. 
            Choose any template with confidence knowing recruiters will see your information perfectly formatted.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quantify Impact */}
      <QuantifyImpactSection section={report.sections.quantify_impact} uiTexts={report.ui_texts} />

      {/* Keywords */}
      <KeywordsSection section={report.sections.keywords_relevance} />

      {/* Repetition & Buzzwords */}
      <RepetitionSection section={report.sections.repetition} />

      {/* Grammar & Spelling */}
      <GrammarSection section={report.sections.grammar_spelling} />

      {/* Design & Layout */}
      <DesignSection section={report.sections.design_layout} />

      {/* Essential Sections */}
      <EssentialSectionsSection section={report.sections.essential_sections} />

      {/* Contact Info */}
      <ContactInfoSection section={report.sections.contact_info} />

      {/* File Format & Size */}
      <FileFormatSection section={report.sections.file_format_size} />

      {/* Length & Bullets */}
      <LengthSection section={report.sections.length_and_bullets} wordCount={report.word_count} bulletCount={report.bullet_count} />

      {/* Style & Voice */}
      <StyleSection section={report.sections.style_active_voice} />

      {/* Template Suggestions */}
      <TemplateSection section={report.sections.template_suggestions} uiTexts={report.ui_texts} />
    </div>
  )
}
