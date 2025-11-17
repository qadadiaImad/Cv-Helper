/**
 * FIELD-EDITABLE TEMPLATES MAPPER
 * Maps template IDs to their field-editable versions
 */

import { AtlanticBlueFieldEditable } from '@/templates/react/template-1-atlantic-blue-field-editable'
import { ExecutiveFieldEditable } from '@/templates/react/template-2-executive-field-editable'
import { MercuryFieldEditable } from '@/templates/react/template-3-mercury-field-editable'
import { ClassicFieldEditable } from '@/templates/react/template-4-classic-field-editable'
import { HarvardFieldEditable } from '@/templates/react/template-5-harvard-field-editable'
import { EvergreenFieldEditable } from '@/templates/react/template-6-evergreen-field-editable'
import { YoungCurveFieldEditable } from '@/templates/react/template-7-youngcurve-field-editable'
import { DoubleColumnFieldEditable } from '@/templates/react/template-8-double-column-field-editable'
import { CreativeOrangeFieldEditable } from '@/templates/react/template-9-creative-orange-field-editable'
import { TealModernFieldEditable } from '@/templates/react/template-10-teal-modern-field-editable'
import { BeigeSidebarFieldEditable } from '@/templates/react/template-11-beige-sidebar-field-editable'
import { DarkBlueOrangeFieldEditable } from '@/templates/react/template-12-dark-blue-orange-field-editable'
import { GrayMinimalFieldEditable } from '@/templates/react/template-13-gray-minimal-field-editable'
import { DarkProfessionalFieldEditable } from '@/templates/react/template-14-dark-professional-field-editable'
import { OrangeSidebarFieldEditable } from '@/templates/react/template-15-orange-sidebar-field-editable'
import { TealRoundedFieldEditable } from '@/templates/react/template-16-teal-rounded-field-editable'
import { NavyProfessionalFieldEditable } from '@/templates/react/template-17-navy-professional-field-editable'
import { BlueCircularFieldEditable } from '@/templates/react/template-18-blue-circular-field-editable'
import { JackSparrowFieldEditable } from '@/templates/react/template-19-jack-sparrow-field-editable'
import { CreativeCVFieldEditable } from '@/templates/react/template-20-creative-cv-field-editable'
import { AcademicCVFieldEditable } from '@/templates/react/template-21-academic-field-editable'
import { ModernProfessionalFieldEditable } from '@/templates/react/template-22-modern-professional-field-editable'
import { OrangeAccentFieldEditable } from '@/templates/react/template-23-orange-accent-field-editable'
import { RedTopBarFieldEditable } from '@/templates/react/template-24-red-topbar-field-editable'
import { ModernResumeYellowFieldEditable } from '@/templates/react/template-25-modern-resume-yellow-field-editable'
import { IvyLeagueFieldEditable } from '@/templates/react/template-26-ivy-league-field-editable'
import { StockholmFieldEditable } from '@/templates/react/template-27-stockholm-field-editable'
import { GeometricCoralFieldEditable } from '@/templates/react/template-28-geometric-coral-field-editable'
import { ModernBlueBlackFieldEditable } from '@/templates/react/template-29-modern-blue-black-field-editable'
import { AcademicBurgundyFieldEditable } from '@/templates/react/template-30-academic-burgundy-field-editable'
import type { TemplateId } from '@/lib/react-templates'
import type { UniversalResumeData } from '@/lib/schemas'

export interface FieldEditableTemplateProps {
  data: UniversalResumeData
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
  onFieldEditStart?: (path: string, type: 'text' | 'richtext' | 'list' | 'skills', position?: { top: number; left: number }) => void
  onFieldEditEnd?: () => void
}

// Map of template IDs to their field-editable components
export const FIELD_EDITABLE_TEMPLATES: Record<TemplateId, React.FC<FieldEditableTemplateProps>> = {
  atlantic_blue: AtlanticBlueFieldEditable,
  executive: ExecutiveFieldEditable,
  mercury: MercuryFieldEditable,
  classic: ClassicFieldEditable,
  harvard: HarvardFieldEditable,
  evergreen: EvergreenFieldEditable,
  youngcurve: YoungCurveFieldEditable,
  'double-column': DoubleColumnFieldEditable as any,
  'creative-orange': CreativeOrangeFieldEditable as any,
  'teal-modern': TealModernFieldEditable as any,
  'beige-sidebar': BeigeSidebarFieldEditable as any,
  'dark-blue-orange': DarkBlueOrangeFieldEditable as any,
  'gray-minimal': GrayMinimalFieldEditable as any,
  'dark-professional': DarkProfessionalFieldEditable as any,
  'orange-sidebar': OrangeSidebarFieldEditable as any,
  'teal-rounded': TealRoundedFieldEditable as any,
  'navy-professional': NavyProfessionalFieldEditable as any,
  'blue-circular': BlueCircularFieldEditable as any,
  'jack-sparrow': JackSparrowFieldEditable as any,
  'creative-cv': CreativeCVFieldEditable,
  'academic': AcademicCVFieldEditable as any,
  'modern-professional': ModernProfessionalFieldEditable as any,
  'orange-accent': OrangeAccentFieldEditable as any,
  'red-topbar': RedTopBarFieldEditable as any,
  'modern-resume-yellow': ModernResumeYellowFieldEditable as any,
  'ivy-league': IvyLeagueFieldEditable as any,
  'stockholm': StockholmFieldEditable as any,
  'geometric-coral': GeometricCoralFieldEditable as any,
  'modern-blue-black': ModernBlueBlackFieldEditable as any,
  'academic-burgundy': AcademicBurgundyFieldEditable as any,
}

/**
 * Get the field-editable template component for a given template ID
 */
export function getFieldEditableTemplate(templateId: TemplateId): React.FC<FieldEditableTemplateProps> {
  return FIELD_EDITABLE_TEMPLATES[templateId] || AtlanticBlueFieldEditable
}
