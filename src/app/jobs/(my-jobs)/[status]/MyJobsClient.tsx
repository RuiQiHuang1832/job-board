/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useCallback, useMemo } from 'react'

import { useJobOperations } from '@/app/jobs/hooks'
import { JobCard } from '@/app/jobs/job-listing'
import { jobListings } from '@/app/jobs/shared'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Stack } from '@/components/ui/stack'

import useLocalStorageIds from './useLocalStorageIds'

const VALID = ['saved', 'applied', 'hidden'] as const
type Status = (typeof VALID)[number]

export default function MyJobsClient({ status }: { status: Status }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleRouterChange = useCallback(
    (value: string) => {
      const target = `/jobs/${value}`
      if (pathname === target) return
      router.push(target)
    },
    [router, pathname],
  )

  const { idsSet } = useLocalStorageIds(status)
  const filtered = useMemo(() => jobListings.filter((j) => idsSet.has(j.id)), [idsSet])
  const {
    savedJobs,
    hiddenJobs,
    activeJobId,
    appliedJobs,
    isLoading,
    handleJobSave,
    handleJobHide,
    handleActiveJobCard,
    handleJobApply,
  } = useJobOperations(jobListings)
  console.log(filtered)

  return (
    <div className="container mx-auto px-5">
      <Stack justify="center" className="my-5">
        <div>
          <div className="space-y-1">
            <h1>My Jobs</h1>
          </div>
          <Separator className="my-4" />
          <Stack align="center" className="h-7 space-x-1">
            {VALID.map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <Separator orientation="vertical" />}
                <Button
                  className="!bg-transparent !shadow-none !border-0 !rounded-none !text-inherit text-xl"
                  onClick={() => handleRouterChange(s)}
                >
                  {s}
                </Button>
              </Fragment>
            ))}
          </Stack>
        </div>
      </Stack>
      <Stack>
        {filtered.map((jobDetails) => (
          <JobCard
            key={jobDetails.id}
            {...jobDetails}
            onJobHide={handleJobHide}
            onJobSave={handleJobSave}
            onJobApply={handleJobApply}
            saved={savedJobs.has(jobDetails.id)}
            applied={appliedJobs.has(jobDetails.id)}
          />
        ))}
      </Stack>
    </div>
  )
}
