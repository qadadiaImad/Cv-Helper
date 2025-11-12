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
import { CreativeOrangeFieldEditable } from '@/templates/react/template-9-creative-orange-field-editable'
import { TealModernEditable } from '@/templates/react/template-10-teal-modern-editable'
import { TealModernFieldEditable } from '@/templates/react/template-10-teal-modern-field-editable'
import { BeigeSidebarEditable } from '@/templates/react/template-11-beige-sidebar-editable'
import { BeigeSidebarFieldEditable } from '@/templates/react/template-11-beige-sidebar-field-editable'
import { DarkBlueOrangeEditable } from '@/templates/react/template-12-dark-blue-orange-editable'
import { DarkBlueOrangeFieldEditable } from '@/templates/react/template-12-dark-blue-orange-field-editable'
import { GrayMinimalEditable } from '@/templates/react/template-13-gray-minimal-editable'
import { GrayMinimalFieldEditable } from '@/templates/react/template-13-gray-minimal-field-editable'
import { DarkProfessionalEditable } from '@/templates/react/template-14-dark-professional-editable'
import { DarkProfessionalFieldEditable } from '@/templates/react/template-14-dark-professional-field-editable'
import { DoubleColumnFieldEditable } from '@/templates/react/template-8-double-column-field-editable'
import { OrangeSidebarEditable } from '@/templates/react/template-15-orange-sidebar-editable'
import { OrangeSidebarFieldEditable } from '@/templates/react/template-15-orange-sidebar-field-editable'
import { TealRoundedEditable } from '@/templates/react/template-16-teal-rounded-editable'
import { TealRoundedFieldEditable } from '@/templates/react/template-16-teal-rounded-field-editable'
import { NavyProfessionalEditable } from '@/templates/react/template-17-navy-professional-editable'
import { NavyProfessionalFieldEditable } from '@/templates/react/template-17-navy-professional-field-editable'
import { BlueCircularEditable } from '@/templates/react/template-18-blue-circular-editable'
import { BlueCircularFieldEditable } from '@/templates/react/template-18-blue-circular-field-editable'
import { JackSparrowEditable } from '@/templates/react/template-19-jack-sparrow-editable'
import { JackSparrowFieldEditable } from '@/templates/react/template-19-jack-sparrow-field-editable'
import { CreativeCVEditable } from '@/templates/react/template-20-creative-cv-editable'
import { CreativeCVFieldEditable } from '@/templates/react/template-20-creative-cv-field-editable'
import { AcademicCVEditable } from '@/templates/react/template-21-academic-editable'
import { AcademicCVFieldEditable } from '@/templates/react/template-21-academic-field-editable'
import { ModernProfessionalEditable } from '@/templates/react/template-22-modern-professional-editable'
import { ModernProfessionalFieldEditable } from '@/templates/react/template-22-modern-professional-field-editable'
import { OrangeAccentEditable } from '@/templates/react/template-23-orange-accent-editable'
import { OrangeAccentFieldEditable } from '@/templates/react/template-23-orange-accent-field-editable'
import { RedTopBarEditable } from '@/templates/react/template-24-red-topbar-editable'
import { RedTopBarFieldEditable } from '@/templates/react/template-24-red-topbar-field-editable'
import { ModernResumeYellowEditable } from '@/templates/react/template-25-modern-resume-yellow-editable'
import { ModernResumeYellowFieldEditable } from '@/templates/react/template-25-modern-resume-yellow-field-editable'
import { IvyLeagueEditable } from '@/templates/react/template-26-ivy-league-editable'
import { IvyLeagueFieldEditable } from '@/templates/react/template-26-ivy-league-field-editable'
import { StockholmEditable } from '@/templates/react/template-27-stockholm-editable'
import { StockholmFieldEditable } from '@/templates/react/template-27-stockholm-field-editable'
import { GeometricCoralFieldEditable } from '@/templates/react/template-28-geometric-coral-field-editable'
import { ModernBlueBlackFieldEditable } from '@/templates/react/template-29-modern-blue-black-field-editable'
import { AcademicBurgundyFieldEditable } from '@/templates/react/template-30-academic-burgundy-field-editable'
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
  'creative-cv': CreativeCVFieldEditable as any,
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
