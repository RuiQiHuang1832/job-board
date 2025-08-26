import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useURLParams() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(searchParams.toString())
      // Update or remove params
      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
          current.set(key, value)
        } else {
          current.delete(key)
        }
      })
      router.push(`/jobs?${current.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key) || ''
    },
    [searchParams],
  )

  return { updateURL, getParam }
}
