import { useState } from 'react'

import { useURLParams } from '@/app/jobs/hooks'
import { DetailedJobProps } from '@/app/jobs/shared'
export const useJobOperations = (allJobs: DetailedJobProps[]) => {
  const { updateURL, getParam } = useURLParams()
  const [hiddenJobs, setHiddenJobs] = useState<Set<string>>(new Set())
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set())
  const initialActiveJob = getParam('id')
  const [activeJobId, setActiveJobId] = useState<string>(
    allJobs.find((job) => job.id === initialActiveJob)?.id || '1',
  )
  const [isLoading, setIsLoading] = useState(false)

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
    simulateLoading(500)
  }

  const simulateLoading = (duration: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, duration)
  }

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
