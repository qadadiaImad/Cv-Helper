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
}

/**
 * Get the field-editable template component for a given template ID
 */
export function getFieldEditableTemplate(templateId: TemplateId): React.FC<FieldEditableTemplateProps> {
  return FIELD_EDITABLE_TEMPLATES[templateId] || AtlanticBlueFieldEditable
}
