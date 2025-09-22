import { DetailedJobProps, SearchResult } from '@/app/jobs/shared'

const normalize = (query: string) =>
  query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const weight = {
  title: 3,
  company: 2,
  tags: 2,
  description: 1,
} as const

export function search(
  jobs: readonly DetailedJobProps[],
  query: string,
  location: string,
): SearchResult[] {
  // Normalize query
  const q = normalize(query || '')
  // Tokenize query
  const tokens = q.split(' ').filter(Boolean)
  const rows: SearchResult[] = []
  // Loop through all jobs
  for (const job of jobs) {
    // Create a "fingerprint" of the job
    const f = {
      title: normalize(job.title),
      company: normalize(job.company),
      tags: normalize(job.tags.join(' ')),
      // cap description for speed; adjust later if needed
      description: normalize(job.description.slice(0, 100)),
    }
    // AND match: every token must be found somewhere to continue, else we stop checking
    let matches = true
    for (const t of tokens) {
      if (
        !(
          f.title.includes(t) ||
          f.company.includes(t) ||
          f.tags.includes(t) ||
          f.description.includes(t)
        )
      ) {
        matches = false
        break // stop checking this job
      }
    }
    // If all tokens matched, calculate score
    if (matches) {
      let score = 0
      for (const t of tokens) {
        if (f.title.includes(t)) score += weight.title
        if (f.company.includes(t)) score += weight.company
        if (f.tags.includes(t)) score += weight.tags
        if (f.description.includes(t)) score += weight.description
      }
      // Only add to results if location matches (or no location filter)
      const locationMatches =
        !location || job.location.toLowerCase().includes(location.toLowerCase())

      if (locationMatches) {
        rows.push({
          id: job.id,
          score,
          pay: job.pay ? parseInt(job.pay.split('–')[0].replace(/[$,]/g, '')) : 0,
          daysPosted: job.daysPosted,
        })
      }
    }
  }
  return rows
}
