export interface Reference {
  name: string
  title: string
  company: string
  email: string
  phone: string
  relationship: string
}

export const defaultReference: Reference = {
  name: '',
  title: '',
  company: '',
  email: '',
  phone: '',
  relationship: '',
}
