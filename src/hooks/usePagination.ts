import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export function usePagination<T>(items: T[], options?: { size?: number; pageParam?: string }) {
  const size = options?.size ?? 10
  const pageParam = options?.pageParam ?? 'page'

  const router = useRouter()
  const params = useSearchParams()

  const page = useMemo(() => {
    const v = Number(params.get(pageParam))
    return Number.isFinite(v) && v > 0 ? Math.floor(v) : 1
  }, [params, pageParam])

  const pageIndex = page - 1
  const totalPages = Math.max(1, Math.ceil(items.length / size))

  const setPage = (p: number) => {
    const qs = new URLSearchParams(Array.from(params.entries()))
    qs.set('page', String(p))
    router.push(`?${qs.toString()}`, { scroll: true })
  }

  const current = useMemo(() => {
    const start = pageIndex * size
    return items.slice(start, start + size)
  }, [items, pageIndex, size])

  const goNext = () => setPage(page + 1)
  const goPrev = () => setPage(page - 1)

  return { page, pageIndex, size, totalPages, current, setPage, goNext, goPrev }
}
