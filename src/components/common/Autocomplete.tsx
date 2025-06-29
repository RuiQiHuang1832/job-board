'use client'

import { useEffect, useState } from 'react'

import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation'

import { Input } from '../ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface AutocompleteProps {
  options: { id: string; label: string; value: string }[]
  placeholder?: string
  onInputChange?: (value: string) => void
}

export function Autocomplete({ options, placeholder, onInputChange }: AutocompleteProps) {
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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          placeholder={placeholder}
          value={inputValue}
          type="text"
          onChange={(e) => {
            setInputValue(e.target.value)
            setOpen(true)
            onInputChange?.(e.target.value)
          }}
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
