export interface Volunteer {
  organization: string
  role: string
  startDate: string
  endDate: string
  description?: string
  achievements: string[]
}

export const defaultVolunteer: Volunteer = {
  organization: '',
  role: '',
  startDate: '',
  endDate: '',
  achievements: [],
}
