/**
 * ATS Playground - Main Entry Point
 * InfiniteCV ATS Coach & Dev Helper
 */

import { analyzeResume } from './lib/ats-analyzer'
import type { ATSInput, ATSReport } from './lib/types'

/**
 * Main function to analyze a CV and get ATS report
 */
export async function analyzeCV(input: ATSInput): Promise<ATSReport> {
  return analyzeResume(input)
}

/**
 * Export types for external usage
 */
export type { ATSInput, ATSReport }
export * from './lib/types'

/**
 * Export analyzer for direct use
 */
export { analyzeResume } from './lib/ats-analyzer'

/**
 * Default export
 */
export default analyzeCV
