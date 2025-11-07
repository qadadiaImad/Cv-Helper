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
import { DoubleColumnEditable } from '@/templates/react/template-8-double-column-editable'
import { CreativeOrangeEditable } from '@/templates/react/template-9-creative-orange-editable'
import { TealModernEditable } from '@/templates/react/template-10-teal-modern-editable'
import { BeigeSidebarEditable } from '@/templates/react/template-11-beige-sidebar-editable'
import { DarkBlueOrangeEditable } from '@/templates/react/template-12-dark-blue-orange-editable'
import { GrayMinimalEditable } from '@/templates/react/template-13-gray-minimal-editable'
import { DarkProfessionalEditable } from '@/templates/react/template-14-dark-professional-editable'
import { OrangeSidebarEditable } from '@/templates/react/template-15-orange-sidebar-editable'
import { TealRoundedEditable } from '@/templates/react/template-16-teal-rounded-editable'
import { NavyProfessionalEditable } from '@/templates/react/template-17-navy-professional-editable'
import { BlueCircularEditable } from '@/templates/react/template-18-blue-circular-editable'
import { JackSparrowEditable } from '@/templates/react/template-19-jack-sparrow-editable'
import { CreativeCVEditable } from '@/templates/react/template-20-creative-cv-editable'
import { AcademicCVEditable } from '@/templates/react/template-21-academic-editable'
import { ModernProfessionalEditable } from '@/templates/react/template-22-modern-professional-editable'
import { OrangeAccentEditable } from '@/templates/react/template-23-orange-accent-editable'
import { RedTopBarEditable } from '@/templates/react/template-24-red-topbar-editable'
import { ModernResumeYellowEditable } from '@/templates/react/template-25-modern-resume-yellow-editable'
import { IvyLeagueEditable } from '@/templates/react/template-26-ivy-league-editable'
import { StockholmEditable } from '@/templates/react/template-27-stockholm-editable'
import type { TemplateId } from '@/lib/react-templates'
import type { UniversalResumeData } from '@/lib/schemas'

interface FieldEditableTemplateProps {
  data: UniversalResumeData
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
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
  'double-column': DoubleColumnEditable as any,
  'creative-orange': CreativeOrangeEditable as any,
  'teal-modern': TealModernEditable as any,
  'beige-sidebar': BeigeSidebarEditable as any,
  'dark-blue-orange': DarkBlueOrangeEditable as any,
  'gray-minimal': GrayMinimalEditable as any,
  'dark-professional': DarkProfessionalEditable as any,
  'orange-sidebar': OrangeSidebarEditable as any,
  'teal-rounded': TealRoundedEditable as any,
  'navy-professional': NavyProfessionalEditable as any,
  'blue-circular': BlueCircularEditable as any,
  'jack-sparrow': JackSparrowEditable as any,
  'creative-cv': CreativeCVEditable as any,
  'academic': AcademicCVEditable as any,
  'modern-professional': ModernProfessionalEditable as any,
  'orange-accent': OrangeAccentEditable as any,
  'red-topbar': RedTopBarEditable as any,
  'modern-resume-yellow': ModernResumeYellowEditable as any,
  'ivy-league': IvyLeagueEditable as any,
  'stockholm': StockholmEditable as any,
}

/**
 * Get the field-editable template component for a given template ID
 */
export function getFieldEditableTemplate(templateId: TemplateId): React.FC<FieldEditableTemplateProps> {
  return FIELD_EDITABLE_TEMPLATES[templateId] || AtlanticBlueFieldEditable
}
