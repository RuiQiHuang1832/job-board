import { SearchResult, SortOrder, stateAbbreviations, DetailedJobProps } from '@/app/jobs/shared'

export const abbreviateLocation = (fullLocation: string) => {
  if (!fullLocation) {
    return ''
  }
  const parts = fullLocation.split(',') // ["Oakland", " California"]
  const city = parts[0].trim()
  const stateFull = parts[1]?.trim()
  const stateShort = stateFull ? stateAbbreviations[stateFull] || stateFull : ''

  return `${city}, ${stateShort}`
}

export const sort = (rows: SearchResult[], order: SortOrder) => {
  if (order == 'relevance') {
    return [...rows].sort((a, b) => b.score - a.score)
  } else if (order == 'compensation') {
    return [...rows].sort((a, b) => b.pay - a.pay)
  } else if (order == 'date') {
    return [...rows].sort((a, b) => a.daysPosted - b.daysPosted)
  }
  return rows
}


export const topJobs = (allJobs: readonly DetailedJobProps[]) =>
  allJobs.slice(0, 6).map((job) => ({
    id: job.id,
    score: 1,
    pay: job.pay ? parseInt(job.pay.split('–')[0].replace(/[$,]/g, '')) : 0,
    daysPosted: job.daysPosted,
  }))
