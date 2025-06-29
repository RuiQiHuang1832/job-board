import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface FilterOption {
  value: string
  label: string
}

interface FilterGroupProps {
  options: FilterOption[]
  placeholder: string
  onValueChange: (value: string) => void
  value?: string
  className?: string
}

export function FilterGroup({
  options,
  placeholder,
  onValueChange,
  value,
  className,
}: FilterGroupProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
