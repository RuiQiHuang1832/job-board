import { useCallback, useMemo, useRef, useState } from 'react'

import { useURLParams } from '@/app/jobs/hooks'
import { filter, useJobFilters } from '@/app/jobs/job-filter'
import { FilterKey } from '@/app/jobs/job-filter/filterConfig'
import { search } from '@/app/jobs/search'
import { DetailedJobProps, SearchResult, SortOrder, stateAbbreviations } from '@/app/jobs/shared'

const TOP = 6
export const useJobSearch = (allJobs: DetailedJobProps[]) => {
  const { updateURL, getParam } = useURLParams()
  const initialFilterState = {
    jobType: getParam('jobType') || '',
    salary: getParam('salary') || '',
    education: getParam('education') || '',
    daysPosted: getParam('daysPosted') || '',
  }

  const { filters, updateFilter } = useJobFilters(initialFilterState)
  const initialSearchValue = getParam('q') || ''
  const initialLocationValue = getParam('location') || ''
  const initialSortValue = getParam('sort') || ''
  //TODO: Eventually remove this part, and instead do DEFAULT_SEARCH_QUERY + DEFAULT_LOCATION, RIGHT NOW IT TAKES TOP 6, as noted in NOTES.md
  const [searchIDs, setSearchIDs] = useState<SearchResult[]>(() => {
    const query = getParam('q')
    const location = getParam('location')

    // If URL has search params, use them
    if (query || location) {
      return search(allJobs, query, location)
    }
    // Otherwise, default to top jobs
    return allJobs.slice(0, TOP).map((job) => ({
      id: job.id,
      score: 1,
      pay: job.pay ? parseInt(job.pay.split('–')[0].replace(/[$,]/g, '')) : 0,
      daysPosted: job.daysPosted,
    }))
  })
  const [sortOrder, setSortOrder] = useState<SortOrder>(() => {
    return (getParam('sort') as SortOrder) || 'relevance'
  })
  const locationSearchRef = useRef<string>(getParam('location') || '')
  const searchInputRef = useRef<HTMLInputElement>(null)
  // ✅ Single function that syncs ALL current state to URL
  const syncURLWithState = useCallback(
    (overrides = {}) => {
      const query = searchInputRef.current?.value || ''
      const location = abbreviateLocation(locationSearchRef.current)

      updateURL({
        q: query,
        location: location,
        sort: sortOrder,
        ...filters,
        ...overrides, // ✅ Override with new values
      })
    },
    [updateURL, sortOrder, filters],
  )

  const abbreviateLocation = (fullLocation: string) => {
    if (!fullLocation) {
      return ''
    }
    const parts = fullLocation.split(',') // ["Oakland", " California"]
    const city = parts[0].trim()
    const stateFull = parts[1]?.trim()
    const stateShort = stateFull ? stateAbbreviations[stateFull] || stateFull : ''

    return `${city}, ${stateShort}`
  }

  const sort = (rows: SearchResult[], order: SortOrder) => {
    if (order == 'relevance') {
      return [...rows].sort((a, b) => b.score - a.score)
    } else if (order == 'compensation') {
      return [...rows].sort((a, b) => b.pay - a.pay)
    } else if (order == 'date') {
      return [...rows].sort((a, b) => a.daysPosted - b.daysPosted)
    }
    return rows
  }
  const handleSearch = () => {
    const locationValue = locationSearchRef.current || ''

    const query = searchInputRef.current?.value || ''

    if (!query && !locationValue) {
      setSearchIDs([])
      return
    }
    syncURLWithState()
    // Search keyword + Location
    const search_id = search(allJobs, query, abbreviateLocation(locationValue))
    setSearchIDs(search_id)
  }

  // Clean functions without URL side effects
  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order)
    syncURLWithState({ sort: order })
  }

  const handleFilterChange = (key: FilterKey, value: string) => {
    updateFilter(key, value)
    syncURLWithState({ [key]: value })
  }
  // Sort will only trigger when Search is populated
  const displayedJobs = useMemo(() => {
    if (searchIDs.length == 0) {
      return []
    }

    const filter_id = filter(allJobs, searchIDs, filters)
    const sorted_id = sort(filter_id, sortOrder)
    const results = sorted_id.map(({ id }) => allJobs.find((job) => job.id === id))
    return results.filter((job) => job !== undefined)
  }, [allJobs, searchIDs, filters, sortOrder])

  return {
    searchIDs,
    sortOrder,
    searchInputRef,
    locationSearchRef,
    displayedJobs,
    initialSearchValue,
    initialLocationValue,
    initialFilterState,
    initialSortValue,
    handleSearch,
    handleSortChange,
    handleFilterChange,
  }
}
