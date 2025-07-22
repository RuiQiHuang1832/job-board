'use client'
import { useState } from 'react'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'

import { JobSidebar } from '@/app/jobs/job-details'
import { JobFilter, useJobFilters } from '@/app/jobs/job-filter'
import { JobCard } from '@/app/jobs/job-listing'
import { LocationSearch, jobListings } from '@/app/jobs/shared'
import IconInput from '@/components/common/IconInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Stack } from '@/components/ui/stack'

export default function JobsPage() {
  const { filters, updateFilter } = useJobFilters()
  const [activeJobId, setActiveJobId] = useState<number>(jobListings[0]?.id || 0)
  const activeJob = jobListings.find((job) => job.id === activeJobId) || jobListings[0]

  const handleActiveJobCard = (id: number) => {
    setActiveJobId(id)
  }

  return (
    <div className="max-w-[90rem] mx-auto p-8">
      {/* Search Section */}
      <div className="mb-8">
        <h1 className="mb-6">Find Your Next Job</h1>

        <Stack className="mb-4">
          <div className="flex-1/2">
            <IconInput icon={AiOutlineSearch}>
              <Input
                className="pl-10"
                type="text"
                size="lg"
                placeholder="Search jobs, keywords, company"
              />
            </IconInput>
          </div>
          <div className="flex-3">
            <IconInput icon={AiOutlineEnvironment}>
              <LocationSearch />
            </IconInput>
          </div>
          <Button className="" variant="default" size="lg">
            Search
          </Button>
        </Stack>
      </div>
      {/* Filters */}
      <JobFilter updateFilter={updateFilter} filters={filters} />
      <h3 className="mb-8">Now Hiring</h3>
      {/* Job Results */}
      <Stack align="start" className="gap-x-6">
        <div className={`grid gap-6 w-xl `}>
          {jobListings.map((job, index) => (
            <JobCard isSelected={activeJobId === job.id} onJobClick={handleActiveJobCard} key={index} {...job} />
          ))}
        </div>
        <JobSidebar {...activeJob} />
      </Stack>
    </div>
  )
}
