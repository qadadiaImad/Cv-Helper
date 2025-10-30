/**
 * CERTIFICATION SECTION SCHEMA
 */

export interface Certification {
  name: string
  issuer: string
  date: string
  expiryDate?: string
  credentialId?: string
  url?: string
}

export const defaultCertification: Certification = {
  name: '',
  issuer: '',
  date: '',
}
