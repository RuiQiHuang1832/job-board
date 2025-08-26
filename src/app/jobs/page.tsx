'use client'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'
import { BsFillSignpost2Fill } from 'react-icons/bs'
import { FaSortAmountDown } from 'react-icons/fa'

import { JobSidebar, JobSidebarSkeleton } from '@/app/jobs/job-details'
import { JobFilter } from '@/app/jobs/job-filter'
import { JobCard } from '@/app/jobs/job-listing'
import { LocationSearch } from '@/app/jobs/search'
import { DetailedJobProps, SortOrder, jobListings, radioFormOptions } from '@/app/jobs/shared'
import IconInput from '@/components/common/IconInput'
import MenuDropdown from '@/components/common/MenuDropdown'
import { RadioForm } from '@/components/common/RadioForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Stack } from '@/components/ui/stack'

import { useJobOperations, useJobSearch } from './hooks'

export default function JobsPage() {
  const {
    savedJobs,
    hiddenJobs,
    activeJobId,
    isLoading,
    handleJobSave,
    handleJobHide,
    handleActiveJobCard,
  } = useJobOperations([...jobListings])
  const {
    searchIDs,
    sortOrder,
    searchInputRef,
    locationSearchRef,
    displayedJobs,
    initialSearchValue,
    initialLocationValue,
    initialFilterState,
    initialSortValue,
    handleSearch,
    handleSortChange,
    handleFilterChange,
  } = useJobSearch([...jobListings])

  const activeJob =
    displayedJobs.find((job: DetailedJobProps) => job.id === activeJobId) || undefined

  return (
      <div className="max-w-[90rem] mx-auto p-8">
        {/* Search Section */}
        <div className="mb-8">
          <Stack className="mb-6" justify="between" align="center">
            <h1 className="">Find Your Next Job</h1>
            <Button variant="outline">
              <BsFillSignpost2Fill />
              Post or Promote a Job
            </Button>
          </Stack>
          <Stack className="mb-4">
            <div className="flex-1/2">
              <IconInput icon={AiOutlineSearch}>
                <Input
                  className="pl-10"
                  type="text"
                  size="lg"
                  placeholder="Search jobs, keywords, company"
                  ref={searchInputRef}
                  defaultValue={initialSearchValue}
                />
              </IconInput>
            </div>
            <div className="flex-3">
              <IconInput icon={AiOutlineEnvironment}>
                <LocationSearch
                  onLocationSelect={(selectedLocation) => {
                    locationSearchRef.current = selectedLocation
                  }}
                  initialValue={initialLocationValue}
                />
              </IconInput>
            </div>
            <Button onClick={handleSearch} variant="default" size="lg">
              Search
            </Button>
          </Stack>
        </div>
        {/* Filters */}
        <JobFilter updateFilter={handleFilterChange} initialState={initialFilterState} />
        {/* Job Results */}

        <Stack align="start" className="gap-x-6">
          <div className={`grid gap-6 w-xl `}>
            <Stack className="text-gray-500 text-sm" justify="between">
              <div>
                {displayedJobs.length} companies hiring{' '}
                {locationSearchRef.current ? `in ${locationSearchRef.current}` : 'near you'}
              </div>
              <Stack gap={2}>
                <div>73,600 total jobs</div>
                <MenuDropdown
                  disabled={searchIDs.length === 0}
                  trigger={<FaSortAmountDown />}
                  content={
                    <RadioForm
                      onValueChange={(value) => handleSortChange(value as SortOrder)}
                      items={radioFormOptions}
                      defaultValue={initialSortValue}
                      title="Sort by"
                      order={sortOrder}
                    />
                  }
                  align="end"
                ></MenuDropdown>
              </Stack>
            </Stack>
            {displayedJobs.map((jobDetails) =>
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
                  onJobClick={handleActiveJobCard}
                  key={jobDetails.id}
                  {...jobDetails}
                  onJobHide={handleJobHide}
                  onJobSave={handleJobSave}
                  saved={savedJobs.has(jobDetails.id)}
                />
              ),
            )}
          </div>
          {isLoading ? (
            <JobSidebarSkeleton />
          ) : activeJob ? (
            <JobSidebar {...activeJob} isHidden={hiddenJobs.has(activeJob.id)} />
          ) : (
            ''
          )}
        </Stack>
      </div>
  )
}
