export interface BaseJobProps {
  title: string
  company: string
  daysPosted: number
  location: string
  pay: string
  tags: ReadonlyArray<string>
  description: string
}

export interface DetailedJobProps extends BaseJobProps {
  companyDescription: string
  employeeCount: number
  private: boolean
  valuation: string
  onsite: boolean
}
