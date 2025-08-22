import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface MenuDropdownProps {
  trigger: string | React.ReactNode
  content: React.ReactNode
  align: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  disabled?: boolean
}

export default function MenuDropdown({
  trigger,
  content,
  align,
  side = 'bottom',
  disabled = false,
}: MenuDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          {trigger}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align} side={side} className="p-0">
        {content}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
