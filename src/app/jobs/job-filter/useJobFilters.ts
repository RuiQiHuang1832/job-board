
import { useCallback, useState } from 'react'

import { FilterKey, FilterState, filterConfig } from './filterConfig'

type InitArg = Partial<FilterState> | (() => FilterState)

const emptyFilters = filterConfig.reduce(
  (acc, filter) => {
    acc[filter.key] = ''
    return acc
  },
  {} as Record<FilterKey, string>,
)
export function useJobFilters(initialArg: InitArg) {
  const [filters, setFilters] = useState<FilterState>(() => {
    const empty = emptyFilters
    const provided = typeof initialArg === 'function' ? initialArg() : initialArg
    return { ...empty, ...provided }
  })

  const updateFilter = useCallback((key: FilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }, [])

  const updateFilters = useCallback((patch: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...patch }))
  }, [])

  const clearAll = () => {
    setFilters(emptyFilters)
  }

  return { filters, updateFilter, updateFilters, clearAll }
}
