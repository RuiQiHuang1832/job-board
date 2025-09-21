'use client'
import { useMemo } from 'react'
import useSWR from 'swr'

import type { DetailedJobProps as Job } from '@/app/jobs/shared/types/types'

type ApiResp = { jobs: Job[]; total: number }
const fetcher = (url: string) =>
  fetch(url).then((r) => {
    if (!r.ok) throw new Error(`GET ${url} ${r.status}`)
    return r.json() as Promise<ApiResp>
  })

export function useJobs() {
  const { data, error, isLoading } = useSWR<ApiResp>('/api/jobs', fetcher, {  suspense: false,              // <— enable suspense
    revalidateOnFocus: false,
    dedupingInterval: 60_000, // 1 min: any component asking within a minute shares the cache
  })

  const shuffledJobs = useMemo(() => {
    const arr = (data?.jobs ?? []).slice()
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [data?.jobs])

  return {
    jobs: shuffledJobs,
    total: data?.total ?? 0,
    isLoading,
    error,
  }
}
