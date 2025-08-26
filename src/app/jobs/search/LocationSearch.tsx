import { useEffect, useState } from 'react'

import { AutocompleteSearch } from '@/components/common/AutocompleteSearch'

export interface Location {
  id: string
  label: string
  value: string
}
type LocationIQResponse = {
  place_id: string
  address: {
    city: string
    state: string
  }
}

interface LocationSearchProps {
  onLocationSelect: (location: string) => void
  initialValue:string;
}

export function LocationSearch({ onLocationSelect, initialValue }: LocationSearchProps) {
  const [locations, setLocations] = useState<Location[]>([])
  const [inputValue, setInputValue] = useState('')
  const [debouncedInputValue, setDebouncedInputValue] = useState('')

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }

  // Debounce the input value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputValue(inputValue)
    }, 300)

    return () => clearTimeout(timer)
  }, [inputValue])

  useEffect(() => {
    setLocations([]) // Clear previous results

    // Only fetch if the debounced input value is not empty and at least 3 characters long
    if (!debouncedInputValue.trim() || debouncedInputValue.trim().length < 3) return

    // Check if API key exists
    const apiKey = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY
    if (!apiKey) {
      console.error('LocationIQ API key is missing')
      return
    }

    const options = { method: 'GET', headers: { accept: 'application/json' } }

    const params = new URLSearchParams({
      q: debouncedInputValue,
      countrycodes: 'us',
      tag: 'place:city',
      limit: '6',
      bounded: '0',
      'accept-language': 'en',
      key: apiKey || '',
    })

    fetch(`https://us1.locationiq.com/v1/autocomplete?${params}`, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((res) => {
        if (!Array.isArray(res)) {
          throw new Error('Invalid response format')
        }

        const newLocations = res
          .filter((e: LocationIQResponse) => e.address?.city && e.address?.state)
          .map((e: LocationIQResponse) => ({
            id: e.place_id,
            label: `${e.address.city}, ${e.address.state}`,
            value: e.address.city!.toLowerCase(),
          }))
        setLocations(newLocations)
      })
      .catch((err) => {
        console.error('Failed to fetch locations:', err)
        setLocations([])
      })
  }, [debouncedInputValue])

  const handleLocationSelect = (selectedOption: Location) => {
    onLocationSelect(selectedOption.label)
  }

  return (
    <AutocompleteSearch
      options={locations}
      placeholder="Enter location or 'remote'"
      onInputChange={handleInputChange}
      onSelect={handleLocationSelect}
      inputClassName="pl-10"
      size="lg"
      initialValue={initialValue}
    />
  )
}
