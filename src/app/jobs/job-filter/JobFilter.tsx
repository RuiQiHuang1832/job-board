'use client'
import { SelectField } from '@/components/common/SelectField'
import { Stack } from '@/components/ui/stack'

import { filterConfig, FilterKey } from './filterConfig'

interface JobFiltersProps {
  updateFilter: (key: FilterKey, value: string) => void
  filterState: Record<FilterKey, string>
}

export function JobFilter({ ...props }: JobFiltersProps) {
  return (
    <Stack className="mb-6">
      {filterConfig.map((filter) => (
        <SelectField
          key={filter.key}
          options={[...filter.options]}
          placeholder={filter.placeholder}
          onValueChange={(value) => props.updateFilter(filter.key, value)}
          value={props.filterState[filter.key]}
          initialStaticLabel={
            filter.options.find((option) => option.value === props.filterState[filter.key])
              ?.label || filter.placeholder
          }
        />
      ))}
    </Stack>
  )
}
