import { DetailedJobProps, SearchResult } from '@/app/jobs/shared'

export function applyFilter(
  jobs: readonly DetailedJobProps[],
  searchResults: SearchResult[],
  filters: {
    daysPosted?: string
    jobType?: string
    salary?: string
    distance?: string
    education?: string
  },
) {
  const rows: SearchResult[] = []

  for (const job of jobs) {
    // If we have search results, only consider jobs in search results
    if (searchResults.length > 0 && !searchResults.map((e) => e.id).includes(job.id)) {
      continue // otherwise skip this job iteration
    }
    // Apply filters
    let passesFilters = true

    // Date Posted filter - May need to change this depending on Date Format in the future
    if (filters.daysPosted && filters.daysPosted !== 'all') {
      const dayLimit = parseInt(filters.daysPosted)
      if (job.daysPosted > dayLimit) {
        passesFilters = false
        continue
      }
    }

    // Job Type filter
    if (filters.jobType && filters.jobType !== 'all') {
      if (job.jobType.toLowerCase() !== filters.jobType.toLowerCase()) {
        passesFilters = false
        continue
      }
    }

    // Salary filter
    if (filters.salary && filters.salary !== 'all') {
      const salaryMinFilter = parseInt(filters.salary) * 1000
      const jobSalaryMin = parseInt(job.pay.split('–')[0].replace(/[$,]/g, ''))

      if (jobSalaryMin < salaryMinFilter || isNaN(jobSalaryMin)) {
        passesFilters = false
        continue
      }
    }

    // Education filter
    if (filters.education && filters.education !== 'all') {
      if (job.education.toLowerCase() !== filters.education.toLowerCase()) {
        passesFilters = false
        continue
      }
    }

    if (passesFilters) {
      rows.push({
        id: job.id,
        score: searchResults.find((e) => e.id === job.id)?.score || 0,
        pay: parseInt(job.pay.split('–')[0].replace(/[$,]/g, '')),
        daysPosted: job.daysPosted,
      })
    }
  }

  return rows
}
