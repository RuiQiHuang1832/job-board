import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps {
  options: SelectOption[]
  placeholder: string
  onValueChange: (value: string) => void
  value?: string
  className?: string
}

export function SelectField({
  options,
  placeholder,
  onValueChange,
  value,
  className,
}: SelectFieldProps) {
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
