export interface Publication {
  title: string
  publisher: string
  date: string
  url?: string
  description?: string
}

export const defaultPublication: Publication = {
  title: '',
  publisher: '',
  date: '',
}
