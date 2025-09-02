import { JobCardSkeleton } from '@/app/jobs/job-listing'
import { Stack } from '@/components/ui/stack'

import { JobSidebarSkeleton } from './job-details'

export default function Skeleton() {
  return (
    <Stack align="start" className="gap-x-6">
      <div className={`grid gap-6 lg:w-xl w-full `}>
        <Stack justify="between" className="animate-pulse   w-full">
          <div className={`w-1/4 h-4 rounded bg-muted`}></div>
          <div className={`w-1/4 h-4 rounded bg-muted`}></div>
        </Stack>
        {Array.from({ length: 5 }, (_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
      <JobSidebarSkeleton />
    </Stack>
  )
}
