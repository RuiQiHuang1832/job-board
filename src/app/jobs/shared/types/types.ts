export interface BaseJobProps {
  id: number
  title: string
  company: string
  daysPosted: number
  location: string
  pay: string
  tags: ReadonlyArray<string>
  description: string
  education: string
  jobType: string
}

export interface DetailedJobProps extends BaseJobProps {
  companyDescription: string
  employeeCount?: number
  private?: boolean
  valuation?: string
  onsite: boolean
}

interface JobUIState {
  isHidden: boolean
}

export interface SearchResult {
  id: number
  score: number
  pay: number
  daysPosted: number
}

export type DetailedJobWithUIState = DetailedJobProps & JobUIState
