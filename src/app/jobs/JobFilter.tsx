import { FilterGroup } from '@/components/common/FilterGroup'

interface JobFiltersProps {
  onJobTypeChange: (value: string) => void
  onSalaryChange: (value: string) => void
  jobType?: string
  salary?: string
}

export function JobFilter({ onJobTypeChange, onSalaryChange, jobType, salary }: JobFiltersProps) {
  const jobTypeOptions = [
    { value: 'all', label: 'All Job Types' },
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
  ]

  const salaryOptions = [
    { value: 'all', label: 'All Salaries' },
    { value: '50-80', label: '$50k - $80k' },
    { value: '80-120', label: '$80k - $120k' },
    { value: '120+', label: '$120k+' },
  ]

  return (
    <div className="flex gap-4 mb-6">
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
    </div>
  )
}
