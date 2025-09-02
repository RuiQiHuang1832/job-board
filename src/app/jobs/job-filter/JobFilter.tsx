'use client'
import { IoClose } from 'react-icons/io5'

import { SelectField } from '@/components/common/SelectField'
import { Button } from '@/components/ui/button'
import { Stack } from '@/components/ui/stack'

import { filterConfig, FilterKey } from './filterConfig'

interface JobFiltersProps {
  updateFilter: (key: FilterKey, value: string) => void
  filterState: Record<FilterKey, string>
  clearAll: () => void
}

export function JobFilter({ ...props }: JobFiltersProps) {
  const hasActiveFilters = Object.values(props.filterState).some((v) => v !== '' && v !== 'all')

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
      {hasActiveFilters && (
        <Button variant="ghost" onClick={props.clearAll} asChild>
          <Stack className=" text-gray-500" gap={1}>
            <IoClose size="15px" /> Clear Filters
          </Stack>
        </Button>
      )}
    </Stack>
  )
}
