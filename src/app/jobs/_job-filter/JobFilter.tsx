import { SelectField } from '@/components/common/SelectField'
import { Stack } from '@/components/ui/stack'

import { filterConfig, FilterKey } from './filterConfig'

interface JobFiltersProps {
  filters: Record<FilterKey, string | undefined>
  updateFilter: (key: FilterKey, value: string) => void
}

export function JobFilter({ ...props }: JobFiltersProps) {
  return (
    <Stack className="mb-6">
      {filterConfig.map((filter) => (
        <SelectField
          key={filter.key}
          options={filter.options.slice()}
          placeholder={filter.placeholder}
          onValueChange={(value) => props.updateFilter(filter.key, value)}
          value={props.filters[filter.key]}
        />
      ))}
    </Stack>
  )
}
