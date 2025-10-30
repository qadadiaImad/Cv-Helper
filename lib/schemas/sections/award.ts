export interface Award {
  title: string
  issuer: string
  date: string
  description?: string
}

export const defaultAward: Award = {
  title: '',
  issuer: '',
  date: '',
}
