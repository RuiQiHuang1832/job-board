'use client'
import { notFound, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'

import { JobSidebar } from '@/app/jobs/job-details'
import { jobListingsMap } from '@/app/jobs/shared'
import { Button } from '@/components/ui/button'
import { Stack } from '@/components/ui/stack'

export default function ViewPage() {
  return (
    <Suspense>
      <Page />
    </Suspense>
  )
}

function Page() {
  const searchParams = useSearchParams()
  const activeJobId = searchParams.get('id') || ''
  const activeJob = jobListingsMap.get(activeJobId)

  const handleBack = () => {
    window.history.back()
  }

  if (!activeJob) return notFound()

  return (
    <Stack
      gap={0}
      direction="col"
      align="start"
      className=" inset-0  bg-white overflow-auto max-w-[60rem] mx-auto "
    >
      <Button className="!px-6 mt-5" variant="link" onClick={handleBack}>
        <FaArrowLeftLong color="black" className="size-[1.4rem]" />
      </Button>
      <JobSidebar hideDueToMobile={false} {...activeJob} hideDetails={true} isHidden={false} />
    </Stack>
  )
}
