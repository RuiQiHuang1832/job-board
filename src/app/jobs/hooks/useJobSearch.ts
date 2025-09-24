import { useEffect, useMemo, useReducer, useRef, useState } from 'react'

import { useSyncURLWithState, useURLParams } from '@/app/jobs/hooks'
import { abbreviateLocation, sort, topJobs } from '@/app/jobs/hooks/utils'
import { applyFilter, useJobFilters } from '@/app/jobs/job-filter'
import { FilterKey } from '@/app/jobs/job-filter/filterConfig'
import { search } from '@/app/jobs/search'
import { DetailedJobProps, SearchResult, SortOrder } from '@/app/jobs/shared'

type State = {
  searchValue: string
  locationValue: string
  sortOrder: SortOrder
  searchResults: SearchResult[]
}

type Action =
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'SET_LOCATION_VALUE'; payload: string }
  | { type: 'SET_SORT_ORDER'; payload: SortOrder }
  | { type: 'SET_SEARCH_RESULTS'; payload: SearchResult[] }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload }
    case 'SET_LOCATION_VALUE':
      return { ...state, locationValue: action.payload }
    case 'SET_SORT_ORDER':
      return { ...state, sortOrder: action.payload }
    case 'SET_SEARCH_RESULTS':
      return { ...state, searchResults: action.payload }
    default:
      return state
  }
}
// Initial state from URL params for reducer
const init = (args: {
  allJobs: readonly DetailedJobProps[]
  getParam: (k: string) => string | null
}): State => {
  const { allJobs, getParam } = args
  const initialQuery = getParam('q') || ''
  const initialLocation = getParam('location') || ''
  const initialSort = (getParam('sort') as SortOrder) || 'relevance'
  //SWR guarantees allJobs is ready
  const initialSearchIDs =
    initialQuery || initialLocation
      ? search(allJobs, initialQuery, initialLocation)
      : topJobs(allJobs)
  return {
    searchValue: initialQuery,
    locationValue: initialLocation,
    sortOrder: initialSort,
    searchResults: initialSearchIDs,
  }
}

export const useJobSearch = (allJobs: readonly DetailedJobProps[]) => {
  const { updateURL, getParam } = useURLParams()
  const [state, dispatch] = useReducer(reducer, { allJobs, getParam }, init)
  const { filters, updateFilter, updateFilters, clearAll } = useJobFilters(() => ({
    jobType: getParam('jobType') ?? '',
    salary: getParam('salary') ?? '',
    education: getParam('education') ?? '',
    daysPosted: getParam('daysPosted') ?? '',
  }))
  const locationSearchRef = useRef<string>(getParam('location') || '')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isHydrated, setIsHydrated] = useState(false)

  //TODO: Eventually remove this part, and instead do DEFAULT_SEARCH_QUERY + DEFAULT_LOCATION, RIGHT NOW IT TAKES TOP 6, as noted in NOTES.md

  // Single function that syncs ALL current state to URL
  const syncURLWithState = useSyncURLWithState({
    updateURL,
    searchInputRef,
    locationRef: locationSearchRef,
    filters,
    sortOrder: state.sortOrder,
  })

  const handleSearch = () => {
    const locationValue = locationSearchRef.current || ''
    const query = searchInputRef.current?.value || ''
    if (!query && !locationValue) {
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: topJobs(allJobs) })
      return
    }
    syncURLWithState()
    // Search keyword + Location
    const results = search(allJobs, query, abbreviateLocation(locationValue))
    dispatch({ type: 'SET_SEARCH_VALUE', payload: query })
    dispatch({ type: 'SET_LOCATION_VALUE', payload: locationValue })
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: results })
  }
  // Clean functions without URL side effects
  const handleSortChange = (order: SortOrder) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: order })
    syncURLWithState({ sort: order })
  }
  const handleFilterChange = (key: FilterKey, value: string) => {
    updateFilter(key, value)
    syncURLWithState({ [key]: value })
  }
  const handleClearAllFilters = () => {
    clearAll()
    syncURLWithState({
      jobType: '',
      salary: '',
      education: '',
      daysPosted: '',
    })
  }

  // Sort will only trigger when Search is populated
  const displayedJobs = useMemo(() => {
    const ids = state.searchValue || state.locationValue ? state.searchResults : topJobs(allJobs)
    setIsHydrated(true)
    if (ids.length === 0 && (state.searchValue || state.locationValue)) {
      return []
    } else if (ids.length === 0 && !(state.searchValue || state.locationValue)) {
      // On first load + no search, show top jobs
      setIsHydrated(false) // Reset hydration to avoid showing "no results" too early
      return []
    }

    const filter_id = applyFilter(allJobs, ids, filters)
    const sorted_id = sort(filter_id, state.sortOrder)
    const results = sorted_id.map(({ id }) => allJobs.find((job) => job.id === id))
    return results as DetailedJobProps[]
  }, [state, allJobs, filters])

  // ONLY react to history traversal (back and forth) - optimization
  useEffect(() => {
    const onPopState = () => {
      const newFilters = {
        jobType: getParam('jobType') || '',
        salary: getParam('salary') || '',
        education: getParam('education') || '',
        daysPosted: getParam('daysPosted') || '',
      }

      const newSearchValue = getParam('q') || ''
      const newLocationValue = getParam('location') || ''
      const newSortOrder = (getParam('sort') as SortOrder) || 'relevance'

      dispatch({ type: 'SET_SEARCH_VALUE', payload: newSearchValue })
      dispatch({ type: 'SET_LOCATION_VALUE', payload: newLocationValue })
      dispatch({ type: 'SET_SORT_ORDER', payload: newSortOrder })

      // Update state when URL changes
      updateFilters({
        jobType: newFilters.jobType,
        salary: newFilters.salary,
        education: newFilters.education,
        daysPosted: newFilters.daysPosted,
      })

      if (searchInputRef.current) {
        searchInputRef.current.value = newSearchValue
      }
      locationSearchRef.current = newLocationValue

      // Also re-run search when URL changes
      if (newSearchValue || newLocationValue) {
        const search_id = search(allJobs, newSearchValue, newLocationValue)
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: search_id })
      } else {
        // Reset to top jobs if no search params
        dispatch({
          type: 'SET_SEARCH_RESULTS',
          payload: topJobs(allJobs),
        })
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    searchResults: state.searchResults,
    sortOrder: state.sortOrder,
    searchInputRef,
    locationSearchRef,
    displayedJobs,
    searchValue: state.searchValue,
    locationValue: state.locationValue,
    filters,
    handleSearch,
    handleSortChange,
    handleFilterChange,
    isHydrated,
    handleClearAllFilters,
  }
}
