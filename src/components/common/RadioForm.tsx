import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioItem {
  value: string
  label: string
  id: string
}

interface RadioFormProps {
  items: readonly RadioItem[]
  value: string
  title?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
}

export function RadioForm({ items, value, title, onValueChange, disabled }: RadioFormProps) {
  return (
    <div className="space-y-3 p-4">
      {title && <Label className="text-base font-medium">{title}</Label>}
      <RadioGroup value={value} onValueChange={onValueChange} disabled={disabled}>
        {items.map((item) => (
          <div className="flex items-center gap-3" key={item.id}>
            <RadioGroupItem value={item.value} id={item.id} />
            <Label className="font-normal" htmlFor={item.id}>
              {item.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
