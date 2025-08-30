import { useCallback } from 'react'

import { abbreviateLocation } from '@/app/jobs/hooks/utils'
import { SortOrder } from '@/app/jobs/shared'

type UpdateURLFn = (params: Record<string, string>) => void
type URLOverrides = Partial<Record<string, string | undefined>>

export function useSyncURLWithState(args: {
  updateURL: UpdateURLFn
  searchInputRef: React.RefObject<HTMLInputElement | null>
  locationRef: React.RefObject<string>
  filters: Record<string, string>
  sortOrder: SortOrder
}) {
  const { updateURL, searchInputRef, locationRef, filters, sortOrder } = args

  return useCallback(
    (overrides: URLOverrides = {}) => {
      const query = searchInputRef.current?.value || ''
      const location = abbreviateLocation(locationRef.current || '')

      // base params -> filters -> overrides (overrides win)
      const params: Record<string, string> = {
        q: query || '',
        location: location || '',
        sort: sortOrder || '',
        ...filters,
        ...overrides,
      }

      updateURL(params)
    },
    [updateURL, searchInputRef, locationRef, filters, sortOrder],
  )
}
