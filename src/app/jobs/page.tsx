'use client'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'

import {
  JobCard,
  JobFilter,
  JobSidebar,
  LocationSearch,
  jobListings,
  useJobFilters,
} from '@/app/jobs'
import IconInput from '@/components/common/IconInput'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Stack } from '@/components/ui/stack'
export default function JobsPage() {
  const { filters, updateFilter } = useJobFilters()

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
            <JobCard key={index} {...job} />
          ))}
        </div>
        <JobSidebar {...jobListings[0]} />
      </Stack>
    </div>
  )
}
