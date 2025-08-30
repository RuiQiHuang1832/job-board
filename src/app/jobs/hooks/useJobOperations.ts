import { useEffect, useState } from 'react'

import { useURLParams } from '@/app/jobs/hooks'
import { DetailedJobProps } from '@/app/jobs/shared'
export const useJobOperations = (allJobs: readonly DetailedJobProps[]) => {
  const { updateURL, getParam } = useURLParams()
  const [hiddenJobs, setHiddenJobs] = useState<Set<string>>(new Set())
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const [activeJobId, setActiveJobId] = useState<string>(
    allJobs.find((job) => job.id === getParam('id'))?.id || '0',
  )
  const [isLoading] = useState(false)

  const handleJobSave = (id: string) => {
    setSavedJobs((prev) => {
      const savedJobSet = new Set(prev)
      if (savedJobSet.has(id)) {
        savedJobSet.delete(id)
      } else {
        savedJobSet.add(id)
      }
      return savedJobSet
    })
  }
  const handleJobHide = (id: string) => {
    setHiddenJobs((prev) => {
      const hiddenJobSet = new Set(prev)
      if (hiddenJobSet.has(id)) {
        hiddenJobSet.delete(id)
      } else {
        hiddenJobSet.add(id)
      }
      return hiddenJobSet
    })
  }
  const handleActiveJobCard = (id: string) => {
    setActiveJobId(id)
    updateURL({ id })
  }

  // ONLY react to history traversal - optimization
  useEffect(() => {
    const onPopState = () => {
      const id = new URLSearchParams(window.location.search).get('id') || '1'
      setActiveJobId(id)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return {
    savedJobs,
    hiddenJobs,
    activeJobId,
    isLoading,
    handleJobSave,
    handleJobHide,
    handleActiveJobCard,
  }
}
