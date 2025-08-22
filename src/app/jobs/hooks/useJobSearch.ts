import { useMemo, useRef, useState } from 'react'

import { filter, useJobFilters } from '@/app/jobs/job-filter'
import { search } from '@/app/jobs/search'
import { DetailedJobProps, SearchResult, SortOrder } from '@/app/jobs/shared'

export const useJobSearch = (allJobs: DetailedJobProps[]) => {
  const { filters, updateFilter } = useJobFilters()
  const [searchIDs, setSearchIDs] = useState<SearchResult[]>([])
  const [sortOrder, setSortOrder] = useState<SortOrder>('relevance')
  const searchInputRef = useRef<HTMLInputElement>(null)

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
    const query = searchInputRef.current?.value || ''
    if (query == '') {
      setSearchIDs([])
      return
    }
    // Search
    const search_id = search(allJobs, query)
    setSearchIDs(search_id)
  }
  // Sort will only trigger when Search is populated
  const displayedJobs = useMemo(() => {
    // Filter
    const filter_id = filter(allJobs, searchIDs, filters)
    // Sort
    const sorted_id = sort(filter_id, sortOrder)
    const results = sorted_id.map(({ id }) => allJobs.find((job) => job.id === id))
    return results.filter((job) => job !== undefined)
  }, [allJobs, searchIDs, filters, sortOrder]) // Trigger if Search/ Filter / Sort changes
  return {
    searchIDs,
    sortOrder,
    searchInputRef,
    displayedJobs,
    handleSearch,
    updateFilter,
    setSortOrder,
  }
}
