'use client'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Suspense, useState, useTransition } from 'react'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'
import { BsBookmark, BsFillSignpost2Fill } from 'react-icons/bs'
import { FaSortAmountDown } from 'react-icons/fa'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { FiCheckCircle } from 'react-icons/fi'
import { GoTrash } from 'react-icons/go'

import { JobSidebar, JobSidebarSkeleton } from '@/app/jobs/job-details'
import { JobFilter } from '@/app/jobs/job-filter'
import { EmptyState, JobCard } from '@/app/jobs/job-listing'
import { JobsPager } from '@/app/jobs/Pagination'
import { LocationSearch } from '@/app/jobs/search'
import { DetailedJobProps, SortOrder, radioFormOptions } from '@/app/jobs/shared'
import Skeleton from '@/app/jobs/Skeleton'
import IconInput from '@/components/common/IconInput'
import MenuDropdown from '@/components/common/MenuDropdown'
import { RadioForm } from '@/components/common/RadioForm'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Stack } from '@/components/ui/stack'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useIsMobile from '@/hooks/useIsMobile'
import { useJobs } from '@/hooks/useJobs'
import { usePagination } from '@/hooks/usePagination'

import { useJobOperations, useJobSearch } from './hooks'

export default function JobsPage() {
  const { jobs, isLoading, total } = useJobs()

  return (
    <Suspense>
      {/* <— show a loader while SWR suspends */}
      <JobsPageContent
        key={jobs.length > 0 ? 'ready' : 'boot'} // ← remount once when data arrives
        jobs={jobs}
        isLoading={isLoading}
        total={total}
      />
    </Suspense>
  )
}
function JobsPageContent({
  jobs,
  isLoading,
  total,
}: {
  jobs: DetailedJobProps[]
  isLoading: boolean
  total: number
}) {
  const {
    savedJobs,
    hiddenJobs,
    activeJobId,
    appliedJobs,
    handleJobSave,
    handleJobHide,
    handleActiveJobCard,
    handleJobApply,
  } = useJobOperations()
  const {
    sortOrder,
    searchInputRef,
    locationSearchRef,
    displayedJobs,
    searchValue,
    locationValue,
    filters,
    handleClearAllFilters,
    handleSearch,
    handleSortChange,
    handleFilterChange,
    isHydrated,
  } = useJobSearch(jobs)
  const [isPaginating, startTransition] = useTransition()

  const { pageIndex, totalPages, current, setPage } = usePagination(displayedJobs, {
    size: 15,
  })

  const activeJob =
    displayedJobs.find((job: DetailedJobProps) => job.id === activeJobId) || undefined

  const isMobile = useIsMobile()
  const [showMobileDetail, setShowMobileDetail] = useState(false)
  // Give search a transition
  const [isSearching, startSearch] = useTransition()

  if (isMobile && showMobileDetail && activeJob) {
    return (
      <Stack
        gap={0}
        direction="col"
        align="start"
        className="fixed inset-0 z-50 bg-white overflow-auto "
      >
        <Button className="!px-6 mt-5" variant="link" onClick={() => setShowMobileDetail(false)}>
          <FaArrowLeftLong color="black" className="size-[1.4rem]" />
        </Button>
        <JobSidebar
          hideDueToMobile={false}
          {...activeJob}
          isHidden={hiddenJobs.has(activeJob.id)}
          hideDetails={true}
        />
      </Stack>
    )
  }
  return (
    <div className="max-w-[90rem] mx-auto p-5">
      {/* Search Section */}
      <div>
        <Stack className="mb-8" justify="between" align="center">
          <h1>
            <Stack align="start" direction="row">
              <div>📋</div>
              <div className=" sm:block hidden">JobMatch</div>
            </Stack>
          </h1>
          <Stack>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="relative p-5" variant="outline" size="icon" asChild>
                  <Link href="/jobs/applied">
                    <FiCheckCircle className="size-[1.1rem]" />
                    <Badge className="absolute -top-2 -right-2">{appliedJobs.size}</Badge>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Applied Jobs</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="relative p-5" variant="outline" size="icon">
                  <Link href="/jobs/saved">
                    <BsBookmark className="size-[1.1rem]" />
                    <Badge className="absolute -top-2 -right-2">{savedJobs.size}</Badge>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Saved Jobs</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button className="relative p-5" variant="outline" size="icon">
                  <Link href="/jobs/hidden">
                    <GoTrash className="size-[1.3rem]" />
                    <Badge className="absolute -top-2 -right-2">{hiddenJobs.size}</Badge>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Hidden Jobs</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" className="bg-blue-500 p-5" variant="link">
                  <Link href="/contact?subject=post" className="">
                    <BsFillSignpost2Fill className="size-[1.2rem]" color="white" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Post a Job</p>
              </TooltipContent>
            </Tooltip>
          </Stack>
        </Stack>
        <div className="mb-5">
          <h3>Work With Purpose. Grow With Opportunity.</h3>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault() // stop page reload
            startSearch(() => handleSearch())
          }}
        >
          <Stack gap={4} className="mb-4 lg:flex-row flex-col">
            <div className="lg:flex-1/2 w-full">
              <IconInput icon={AiOutlineSearch}>
                <Input
                  className="pl-10"
                  type="text"
                  size="lg"
                  placeholder="Search jobs, keywords, company"
                  ref={searchInputRef}
                  defaultValue={searchValue}
                />
              </IconInput>
            </div>
            <div className="lg:flex-3 w-full">
              <IconInput icon={AiOutlineEnvironment}>
                <LocationSearch
                  onLocationSelect={(selectedLocation) => {
                    locationSearchRef.current = selectedLocation
                  }}
                  onLocationInputChange={(input) => {
                    locationSearchRef.current = input
                  }}
                  value={locationValue}
                />
              </IconInput>
            </div>

            <Button
              type="submit"
              disabled={isSearching}
              className="lg:w-auto w-full disabled:opacity-50"
              variant="default"
              size="lg"
            >
              {isSearching && <Loader2 className=" animate-spin" />}
              {isSearching ? 'Searching…' : 'Search'}
            </Button>
          </Stack>
        </form>
      </div>
      {/* Filters */}
      <JobFilter
        updateFilter={handleFilterChange}
        filterState={filters}
        clearAll={handleClearAllFilters}
      />
      {/* Job Results */}
      {!isHydrated || isPaginating ? (
        <Skeleton />
      ) : (
        <Stack align="start" className="gap-x-6">
          <div className={`grid gap-6 lg:w-xl w-full `}>
            <Stack className="text-gray-500 sm:text-sm text-xs" justify="between">
              <div>
                {displayedJobs.length} companies hiring{' '}
                {locationSearchRef.current ? `in ${locationSearchRef.current}` : 'near you'}
              </div>
              <Stack gap={2}>
                <div>{total} total jobs</div>
                <MenuDropdown
                  title="Sort by"
                  disabled={displayedJobs.length === 0}
                  trigger={<FaSortAmountDown />}
                  content={
                    <RadioForm
                      onValueChange={(value) => handleSortChange(value as SortOrder)}
                      items={radioFormOptions}
                      value={sortOrder}
                    />
                  }
                  align="end"
                ></MenuDropdown>
              </Stack>
            </Stack>
            {current.length === 0 && !isLoading ? (
              <EmptyState keyword={searchInputRef.current?.value} />
            ) : (
              current.map((jobDetails) =>
                hiddenJobs.has(jobDetails.id) ? (
                  <Stack
                    key={jobDetails.id}
                    className="p-4 bg-gray-100 border border-gray-200 rounded-lg"
                    direction="col"
                    gap={0}
                  >
                    <p>Job hidden</p>
                    <p className="text-sm">
                      {jobDetails.title} at {jobDetails.company}
                    </p>
                    <Button
                      variant="link"
                      className="ms-auto"
                      onClick={() => handleJobHide(jobDetails.id)}
                    >
                      Undo
                    </Button>
                  </Stack>
                ) : (
                  <JobCard
                    isSelected={activeJobId === jobDetails.id}
                    onJobClick={(id) => {
                      handleActiveJobCard(id)
                      if (isMobile) setShowMobileDetail(true)
                    }}
                    key={jobDetails.id}
                    {...jobDetails}
                    onJobHide={handleJobHide}
                    onJobSave={handleJobSave}
                    onJobApply={handleJobApply}
                    saved={savedJobs.has(jobDetails.id)}
                    hidden={hiddenJobs.has(jobDetails.id)}
                    applied={appliedJobs.has(jobDetails.id)}
                  />
                ),
              )
            )}
            <JobsPager
              page={pageIndex}
              totalPages={totalPages}
              onPageChange={(p) => startTransition(() => setPage(p))} // <-- wrap in transition
            />
          </div>
          {isLoading ? (
            <JobSidebarSkeleton />
          ) : activeJob ? (
            <JobSidebar
              hideDueToMobile={isMobile}
              {...activeJob}
              isHidden={hiddenJobs.has(activeJob.id)}
            />
          ) : (
            ''
          )}
        </Stack>
      )}
    </div>
  )
}
