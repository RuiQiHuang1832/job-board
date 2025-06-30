'use client'
import { useState } from 'react'
import { AiOutlineEnvironment, AiOutlineSearch } from 'react-icons/ai'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import IconInput from '../../components/common/IconInput'
import { JobFilter } from './JobFilter'
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

  const [jobType, setJobType] = useState<string>()
  const [salary, setSalary] = useState<string>()

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <div className="mb-8">
        <h1 className="mb-6">Find Your Next Job</h1>

        <div className="flex gap-4 mb-4">
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
          <Button variant="default" size="lg">
            Search
          </Button>
        </div>
      </div>

      {/* Filters */}
      <JobFilter
        onJobTypeChange={setJobType}
        onSalaryChange={setSalary}
        jobType={jobType}
        salary={salary}
      />
      <h3 className="mb-6">Now Hiring</h3>
      {/* Job Results */}
      <div className="grid gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h2>
                <p className="text-gray-600 mb-2">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span>📍 {job.location}</span>
                  <span>💼 {job.type}</span>
                  <span>⏰ {job.posted}</span>
                </div>
                <div className="text-lg font-medium text-green-600">{job.salary}</div>
              </div>

              <div className="flex gap-2">
                <Button variant="default">Save</Button>
                <Button variant="secondary">Apply</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Info */}
      <div className="mt-8 text-center text-gray-600">Showing {jobs.length} jobs</div>
    </div>
  )
}
