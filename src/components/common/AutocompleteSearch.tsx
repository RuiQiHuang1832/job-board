'use client'

import { useEffect, useState } from 'react'

import { Input } from '@/components/ui/input'
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

type optionsType = { id: string; label: string; value: string }
interface AutocompleteSearchProps {
  options: optionsType[]
  placeholder?: string
  onInputChange?: (value: string) => void
  onSelect?: (selectedOption: optionsType) => void
  inputClassName?: string
  size: 'sm' | 'md' | 'lg'
  value: string
}

export function AutocompleteSearch({
  options,
  placeholder,
  onInputChange,
  onSelect,
  inputClassName,
  size,
  value,
}: AutocompleteSearchProps) {
  const [inputValue, setInputValue] = useState(value)
  const [open, setOpen] = useState(false)

  const { selectedIndex, handleKeyDown, resetSelection } = useKeyboardNavigation({
    itemCount: options.length,
    onSelect: (index) => {
      selectOption(options[index])
    },
  })

  // Reset selected index when filtered options change
  useEffect(() => {
    resetSelection()
  }, [options.length, resetSelection])


  useEffect(() => {
    setInputValue(value)
  }, [value])

  const selectOption = (option: optionsType) => {
    setInputValue(option.label)
    onSelect?.(option)
    setOpen(false)
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    setOpen(true)
    onInputChange?.(e.target.value)
  }
  // Update input when value prop changes (on re-render)

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
      {options.length > 0 && (
        <PopoverContent align="start" onOpenAutoFocus={(e) => e.preventDefault()}>
          <ul className="space-y-1">
            {options.map((option, index) => (
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
