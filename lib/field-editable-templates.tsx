/**
 * FIELD-EDITABLE TEMPLATES MAPPER
 * Maps template IDs to their field-editable versions
 */

import { AtlanticBlueFieldEditable } from '@/templates/react/template-1-atlantic-blue-field-editable'
import { ExecutiveFieldEditable } from '@/templates/react/template-2-executive-field-editable'
import { HarvardFieldEditable } from '@/templates/react/template-5-harvard-field-editable'
import { EvergreenFieldEditable } from '@/templates/react/template-6-evergreen-field-editable'
import { YoungCurveFieldEditable } from '@/templates/react/template-7-youngcurve-field-editable'
import { TealModernFieldEditable } from '@/templates/react/template-10-teal-modern-field-editable'
import { OrangeSidebarFieldEditable } from '@/templates/react/template-15-orange-sidebar-field-editable'
import { TealRoundedFieldEditable } from '@/templates/react/template-16-teal-rounded-field-editable'
import { NavyProfessionalFieldEditable } from '@/templates/react/template-17-navy-professional-field-editable'
import { BlueCircularFieldEditable } from '@/templates/react/template-18-blue-circular-field-editable'
import { CreativeCVFieldEditable } from '@/templates/react/template-20-creative-cv-field-editable'
import { AcademicCVFieldEditable } from '@/templates/react/template-21-academic-field-editable'
import { ModernProfessionalFieldEditable } from '@/templates/react/template-22-modern-professional-field-editable'
import { OrangeAccentFieldEditable } from '@/templates/react/template-23-orange-accent-field-editable'
import { RedTopBarFieldEditable } from '@/templates/react/template-24-red-topbar-field-editable'
import { ModernResumeYellowFieldEditable } from '@/templates/react/template-25-modern-resume-yellow-field-editable'
import { StockholmFieldEditable } from '@/templates/react/template-27-stockholm-field-editable'
import { GeometricCoralFieldEditable } from '@/templates/react/template-28-geometric-coral-field-editable'
import { AcademicBurgundyFieldEditable } from '@/templates/react/template-30-academic-burgundy-field-editable'
import { Template31FieldEditable } from '@/templates/react/template-31-lauren-chen-field-editable'
import { Template32FieldEditable } from '@/templates/react/template-32-orange-sidebar-left-field-editable'
import { Template33FieldEditable } from '@/templates/react/template-33-slate-yellow-field-editable'
import { Template34FieldEditable } from '@/templates/react/template-34-bold-yellow-field-editable'
import { Template35FieldEditable } from '@/templates/react/template-35-two-column-yellow-field-editable'
import { Template37FieldEditable } from '@/templates/react/template-37-premium-green-field-editable'
import { Template38FieldEditable } from '@/templates/react/template-38-pastel-orange-field-editable'
import { Template39FieldEditable } from '@/templates/react/template-39-hybrid-green-field-editable'
import { Template40FieldEditable } from '@/templates/react/template-40-professional-purple-field-editable'
import { Template41FieldEditable } from '@/templates/react/template-41-unique-orange-field-editable'
import { Template42FieldEditable } from '@/templates/react/template-42-aesthetic-green-field-editable'
import { Template43FieldEditable } from '@/templates/react/template-43-modern-blue-hub-field-editable'
import { Template44FieldEditable } from '@/templates/react/template-44-dark-yellow-split-field-editable'
import { ProductManagerFieldEditable } from '@/templates/react/template-31-product-manager-field-editable'
import type { TemplateId } from '@/lib/react-templates'
import type { UniversalResumeData } from '@/lib/schemas'

export interface FieldEditableTemplateProps {
  data: UniversalResumeData
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
  onFieldEditStart?: (path: string, type: 'text' | 'richtext' | 'list' | 'skills', position?: { top: number; left: number }) => void
  onFieldEditEnd?: () => void
  onAddArrayItem?: (arrayPath: string, index: number, position: 'before' | 'after') => void
  onRemoveArrayItem?: (arrayPath: string, index: number) => void
}

// Map of template IDs to their field-editable components
export const FIELD_EDITABLE_TEMPLATES: Record<TemplateId, React.FC<FieldEditableTemplateProps>> = {
  atlantic_blue: AtlanticBlueFieldEditable,
  executive: ExecutiveFieldEditable,
  harvard: HarvardFieldEditable,
  evergreen: EvergreenFieldEditable,
  youngcurve: YoungCurveFieldEditable,
  'teal-modern': TealModernFieldEditable as any,
  'orange-sidebar': OrangeSidebarFieldEditable as any,
  'teal-rounded': TealRoundedFieldEditable as any,
  'navy-professional': NavyProfessionalFieldEditable as any,
  'blue-circular': BlueCircularFieldEditable as any,
  'creative-cv': CreativeCVFieldEditable,
  'academic': AcademicCVFieldEditable as any,
  'modern-professional': ModernProfessionalFieldEditable as any,
  'orange-accent': OrangeAccentFieldEditable as any,
  'red-topbar': RedTopBarFieldEditable as any,
  'modern-resume-yellow': ModernResumeYellowFieldEditable as any,
  'geometric-coral': GeometricCoralFieldEditable as any,
  'academic-burgundy': AcademicBurgundyFieldEditable as any,
  'lauren-chen': Template31FieldEditable as any,
  'orange-sidebar-left': Template32FieldEditable as any,
  'slate-yellow': Template33FieldEditable as any,
  'bold-yellow': Template34FieldEditable as any,
  'two-column-yellow': Template35FieldEditable as any,
  'premium-green': Template37FieldEditable as any,
  'pastel-orange': Template38FieldEditable as any,
  'hybrid-green': Template39FieldEditable as any,
  'professional-purple': Template40FieldEditable as any,
  'unique-orange': Template41FieldEditable as any,
  'aesthetic-green': Template42FieldEditable as any,
  'modern-blue-hub': Template43FieldEditable as any,
  'dark-yellow-split': Template44FieldEditable as any,
  'product-manager': ProductManagerFieldEditable as any,
}

/**
 * Get the field-editable template component for a given template ID
 */
export function getFieldEditableTemplate(templateId: TemplateId): React.FC<FieldEditableTemplateProps> {
  return FIELD_EDITABLE_TEMPLATES[templateId] || AtlanticBlueFieldEditable
}
