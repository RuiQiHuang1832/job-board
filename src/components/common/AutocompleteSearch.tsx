'use client'

import { useEffect, useState } from 'react'

import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
interface AutocompleteSearchProps {
  options: { id: string; label: string; value: string }[]
  placeholder?: string
  onInputChange?: (value: string) => void
  inputClassName?: string
  size: 'sm' | 'md' | 'lg'
}

export function AutocompleteSearch({
  options,
  placeholder,
  onInputChange,
  inputClassName,
  size,
}: AutocompleteSearchProps) {
  const [inputValue, setInputValue] = useState('')
  const [open, setOpen] = useState(false)

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.toLowerCase()),
  )

  const { selectedIndex, handleKeyDown, resetSelection } = useKeyboardNavigation({
    itemCount: filteredOptions.length,
    onSelect: (index) => {
      selectOption(filteredOptions[index])
    },
  })

  // Reset selected index when filtered options change
  useEffect(() => {
    resetSelection()
    console.log('Input value changed, resetting selection')
  }, [filteredOptions.length, resetSelection])

  const selectOption = (option: { label: string; value: string }) => {
    setInputValue(option.label)
    setOpen(false)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setOpen(true)
    onInputChange?.(e.target.value)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          placeholder={placeholder}
          value={inputValue}
          type="text"
          size={size}
          className={inputClassName}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </PopoverTrigger>
      {filteredOptions.length > 0 && (
        <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
          <ul className="space-y-1">
            {filteredOptions.map((option, index) => (
              <li key={option.id}>
                <button
                  type="button"
                  className={`cursor-pointer p-2 hover:bg-accent rounded w-full text-left ${
                    selectedIndex === index ? 'bg-accent' : ''
                  }`}
                  onMouseDown={(e) => e.preventDefault()} // Prevent input blur
                  onClick={() => selectOption(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      )}
    </Popover>
  )
}
