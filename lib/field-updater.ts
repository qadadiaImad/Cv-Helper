/**
 * Helper functions for updating nested fields in CV data
 */

import type { UniversalResumeData } from './schemas'

/**
 * Update a nested field in the CV data using dot notation
 * Example: updateNestedField(data, 'personal.fullName', 'John Doe')
 * Example: updateNestedField(data, 'experience.0.company', 'TechCorp')
 */
export function updateNestedField(
  data: UniversalResumeData,
  path: string,
  value: any
): UniversalResumeData {
  const newData = JSON.parse(JSON.stringify(data)) // Deep clone
  
  const parts = path.split('.')
  let current: any = newData
  
  // Navigate to the parent of the target field
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i]
    const isArrayIndex = /^\d+$/.test(parts[i + 1])
    
    if (isArrayIndex) {
      // Ensure array exists
      if (!Array.isArray(current[part])) {
        current[part] = []
      }
    } else {
      // Ensure object exists
      if (!current[part]) {
        current[part] = {}
      }
    }
    
    current = current[part]
  }
  
  // Set the final value
  const lastPart = parts[parts.length - 1]
  current[lastPart] = value
  
  return newData
}

/**
 * Get a nested field value using dot notation
 */
export function getNestedField(data: UniversalResumeData, path: string): any {
  const parts = path.split('.')
  let current: any = data
  
  for (const part of parts) {
    if (current === undefined || current === null) {
      return undefined
    }
    current = current[part]
  }
  
  return current
}
