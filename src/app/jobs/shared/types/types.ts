export interface BaseJobProps {
  id: string
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
  url: string
  companyUrl: string
}

interface JobUIState {
  isHidden: boolean
}

export interface SearchResult {
  id: string
  score: number
  pay: number
  daysPosted: number
}

export type DetailedJobWithUIState = DetailedJobProps & JobUIState
