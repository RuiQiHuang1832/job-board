'use client'
import { useEffect, useState } from 'react'

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
  className?: string
  value?: string
  initialStaticLabel?: string
}

export function SelectField({
  options,
  placeholder,
  onValueChange,
  className,
  value = 'Default Value',
  initialStaticLabel = 'Default Label',
}: SelectFieldProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        {mounted ? (
          <SelectValue placeholder={placeholder} />
        ) : (
          // Static text for the first paint so there’s no placeholder → label swap
          <span suppressHydrationWarning>{initialStaticLabel}</span>
        )}
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
