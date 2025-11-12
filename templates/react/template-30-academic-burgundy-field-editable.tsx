/**
 * TEMPLATE 30 - ACADEMIC BURGUNDY - FIELD-LEVEL EDITABLE VERSION
 * Clean academic CV with burgundy accents and numbered publications
 */

import React from 'react'
import type { UniversalTemplateProps } from './universal-schema'
import { AcademicBurgundyTemplate } from './template-30-academic-burgundy'

interface FieldEditableTemplateProps extends UniversalTemplateProps {
  editMode?: boolean
  onFieldChange?: (path: string, value: any) => void
}

export const AcademicBurgundyFieldEditable: React.FC<FieldEditableTemplateProps> = ({ 
  data, 
  editMode = false,
  onFieldChange = () => {}
}) => {
  // For now, use the base template
  // TODO: Add inline editing capabilities
  return <AcademicBurgundyTemplate data={data} />
}
