'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useMemo } from 'react'

import { useJobOperations } from '@/app/jobs/hooks'
import { JobCard } from '@/app/jobs/job-listing'
import { DetailedJobProps, jobListings } from '@/app/jobs/shared'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Stack } from '@/components/ui/stack'

import useLocalStorageIds from './useLocalStorageIds'

const VALID = ['applied', 'saved', 'hidden'] as const
type Status = (typeof VALID)[number]

export default function MyJobsClient({ status }: { status: Status }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleRouterChange = (value: string) => {
    const target = `/jobs/${value}`
    if (pathname === target) return
    router.push(target)
  }

  const handleActiveJobCard = (jobId: string) => {
    router.push(`/jobs/viewjob?id=${jobId}`)
  }

  const { idsSet } = useLocalStorageIds(status)
  const filtered: DetailedJobProps[] = useMemo(
    () => jobListings.filter((j) => idsSet.has(j.id)),
    [idsSet],
  )
  const { savedJobs, hiddenJobs, appliedJobs, handleJobSave, handleJobHide, handleJobApply } =
    useJobOperations()

  return (
    <div>
      <Stack justify="center" className="mb-10">
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => router.push('/jobs')}
            className="space-y-1 hover:bg-white"
          >
            <h1>My Jobs</h1>
          </Button>
          <Separator className="my-4" />
          <Stack align="center" gap={2} className="h-10 space-x-1 flex-nowrap sm:gap-4">
            {VALID.map((s, i) => (
              <Fragment key={s}>
                {i > 0 && <Separator orientation="vertical" />}
                <Button
                  className={`relative  !bg-transparent !shadow-none !border-0 !rounded-none ${status == s ? 'text-black' : '!text-muted-foreground'} `}
                  onClick={() => handleRouterChange(s)}
                >
                  <Badge className="absolute -top-2 -right-2 bg-transparent text-black">
                    {[appliedJobs.size, savedJobs.size, hiddenJobs.size][i]}
                  </Badge>

                  {s}
                </Button>
              </Fragment>
            ))}
          </Stack>
        </div>
      </Stack>
      <Stack justify="center" className="sm:w-[clamp(576px,50%,900px)] mx-auto">
        {filtered.length === 0 ? (
          <div className="h-[50vh] flex items-center">All clear! Nothing here at the moment.</div>
        ) : (
          filtered.map((jobDetails) => (
            <JobCard
              key={jobDetails.id}
              {...jobDetails}
              onJobHide={handleJobHide}
              onJobSave={handleJobSave}
              onJobApply={handleJobApply}
              saved={savedJobs.has(jobDetails.id)}
              applied={appliedJobs.has(jobDetails.id)}
              hidden={hiddenJobs.has(jobDetails.id)}
              onJobClick={handleActiveJobCard}
            />
          ))
        )}
      </Stack>
    </div>
  )
}
