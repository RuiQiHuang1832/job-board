import { useCallback, useState } from 'react'

interface UseKeyboardNavigationProps {
  itemCount: number
  onSelect: (index: number) => void
}

export function useKeyboardNavigation({ itemCount, onSelect }: UseKeyboardNavigationProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const resetSelection = useCallback(() => {
    setSelectedIndex(-1)
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', 'Escape'].includes(e.key)) {
      e.preventDefault()
    }
    switch (e.key) {
      case 'ArrowDown':
        setSelectedIndex((prev) => (prev < itemCount - 1 ? prev + 1 : 0))
        break
      case 'ArrowUp':
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : itemCount - 1))
        break
      case 'Enter':
        if (selectedIndex >= 0 && selectedIndex < itemCount) {
          onSelect(selectedIndex)
        } else {
          // No option selected → treat Enter as a normal form submit
          e.currentTarget.form?.requestSubmit()
        }
        break
      case 'Escape':
        setSelectedIndex(-1)
        break
    }
  }
  return {
    selectedIndex,
    handleKeyDown,
    resetSelection,
  }
}
