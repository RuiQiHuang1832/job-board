import { useState } from 'react'

import { DetailedJobProps } from '@/app/jobs/shared'
export const useJobOperations = (allJobs: DetailedJobProps[]) => {
  const [hiddenJobs, setHiddenJobs] = useState<Set<number>>(new Set())
  const [savedJobs, setSavedJobs] = useState<Set<number>>(new Set())
  const [activeJobId, setActiveJobId] = useState<number>(allJobs[0]?.id || 0)
  const [isLoading, setIsLoading] = useState(false)

  const handleJobSave = (id: number) => {
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

  const handleJobHide = (id: number) => {
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
  const handleActiveJobCard = (id: number) => {
    setActiveJobId(id)
    simulateLoading(1000)
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
