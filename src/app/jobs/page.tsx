'use client'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import IconInput from '../../components/common/IconInput'
import { Stack } from '../../components/ui/stack'
import { useJobFilters } from './_job-filter/useJobFilters'
import JobCard from './JobCard'
import { JobFilter } from './_job-filter/JobFilter'
import { LocationSearch } from './LocationSearch'

export default function JobsPage() {
  // Mock data for now - you'll replace this later
  const jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      salary: '$80k - $120k',
      type: 'Full-time',
      posted: '2 days ago',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      salary: '$90k - $140k',
      type: 'Full-time',
      posted: '1 week ago',
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Digital Agency',
      location: 'New York, NY',
      salary: '$75k - $110k',
      type: 'Contract',
      posted: '3 days ago',
    },
  ]


  const { filters, updateFilter } = useJobFilters()

  return (
    <div className="container mx-auto px-4 py-8">
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
                placeholder="Search jobs, keywords, companies..."
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
      <h3 className="mb-6">Now Hiring</h3>
      {/* Job Results */}
      <div className="grid gap-6">
        <JobCard></JobCard>
        <JobCard></JobCard>
        <JobCard></JobCard>
        <JobCard></JobCard>
      </div>
      {/* Results Info */}
      <div className="mt-8 text-center text-gray-600">Showing {jobs.length} jobs</div>
    </div>
  )
}
