import { useState } from 'react'

import { filterConfig, FilterKey } from './filterConfig'

export function useJobFilters() {
  const initialFilters = filterConfig.reduce(
    (acc, filter) => {
      acc[filter.key] = ''
      return acc
    },
    {} as Record<FilterKey, string>,
  )

  const [filters, setFilters] = useState(initialFilters)

  const updateFilter = (key: FilterKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return { filters, updateFilter }
}
