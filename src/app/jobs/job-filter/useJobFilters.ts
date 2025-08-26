import { useState } from 'react'

import { FilterKey, FilterState, filterConfig } from './filterConfig'

export function useJobFilters(overrides?: Partial<FilterState>) {
  const initialFilters = filterConfig.reduce(
    (acc, filter) => {
      acc[filter.key] = ''
      return acc
    },
    {} as Record<FilterKey, string>,
  )

  const [filters, setFilters] = useState<FilterState>({ ...initialFilters, ...overrides })

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return { filters, updateFilter }
}
