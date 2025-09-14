
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useURLParams() {
  const router = useRouter()

  // Read once from the real URL (no subscription)
  const getParam = useCallback((key: string) => {
    if (typeof window === 'undefined') return ''
    return new URLSearchParams(window.location.search).get(key) ?? ''
  }, [])

  // Build next URL off the real current URL (not the hook’s searchParams)
  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const current = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
      )

      Object.entries(params).forEach(([key, value]) => {
        if (value && value !== 'all') current.set(key, value)
        else current.delete(key)
      })

      router.push(`/jobs?${current.toString()}`, { scroll: false })
    },
    [router],
  )

  return { updateURL, getParam }
}
