export interface Language {
  name: string
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic'
}

export const defaultLanguage: Language = {
  name: '',
  proficiency: 'Intermediate',
}
