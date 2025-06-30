import { FilterGroup } from '@/components/common/FilterGroup'

interface JobFiltersProps {
  onJobTypeChange: (value: string) => void
  onSalaryChange: (value: string) => void
  onDistanceChange: (value: string) => void
  onDatePostedChange: (value: string) => void
  onEducationChange: (value: string) => void
  jobType?: string
  salary?: string
  distance?: string
  datePosted?: string
  education?: string
}

const jobTypeOptions = [
  { value: 'all', label: 'All Job Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'contract', label: 'Contract' },
]

const salaryOptions = [
  { value: 'all', label: 'All Salaries' },
  { value: '50k+', label: '$50,000+' },
  { value: '80k+', label: '$80,000+' },
  { value: '100k+', label: '$100,000+' },
  { value: '120k+', label: '$120,000+' },
  { value: '150k+', label: '$150,000+' },
]

const distanceOptions = [
  { value: 'all', label: 'Any Distance' },
  { value: '5', label: 'Within 5 miles' },
  { value: '10', label: 'Within 10 miles' },
  { value: '25', label: 'Within 25 miles' },
  { value: '50', label: 'Within 50 miles' },
  { value: 'remote', label: 'Remote' },
]

const datePostedOptions = [
  { value: 'all', label: 'Any Time' },
  { value: 'today', label: 'Today' },
  { value: '7', label: 'Last 7 days' },
  { value: '14', label: 'Last 2 weeks' },
  { value: '30', label: 'Last 30 days' },
]

const educationOptions = [
  { value: 'all', label: 'Any Education' },
  { value: 'high-school', label: 'High School' },
  { value: 'associate', label: 'Associate Degree' },
  { value: 'bachelor', label: "Bachelor's Degree" },
  { value: 'no-degree', label: 'No Degree Required' },
]

//TODO: Map out instead of hardcoding

export function JobFilter({
  onJobTypeChange,
  onSalaryChange,
  onDistanceChange,
  onDatePostedChange,
  onEducationChange,
  jobType,
  salary,
  distance,
  datePosted,
  education,
}: JobFiltersProps) {
  return (
    <div className="flex gap-4 mb-6">
      <FilterGroup
        options={datePostedOptions}
        placeholder="Any Time"
        onValueChange={onDatePostedChange}
        value={datePosted}
      />
      <FilterGroup
        options={jobTypeOptions}
        placeholder="All Job Types"
        onValueChange={onJobTypeChange}
        value={jobType}
      />
      <FilterGroup
        options={salaryOptions}
        placeholder="All Salaries"
        onValueChange={onSalaryChange}
        value={salary}
      />
      <FilterGroup
        options={distanceOptions}
        placeholder="All Distances"
        onValueChange={onDistanceChange}
        value={distance}
      />
      <FilterGroup
        options={educationOptions}
        placeholder="Any Education"
        onValueChange={onEducationChange}
        value={education}
      />
    </div>
  )
}
