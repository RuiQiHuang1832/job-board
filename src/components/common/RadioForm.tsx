import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface RadioItem {
  value: string
  label: string
  id: string
}

interface RadioFormProps {
  items: readonly RadioItem[]
  defaultValue: string
  title?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  order:string
}

export function RadioForm({ items, defaultValue, title, onValueChange, disabled, order }: RadioFormProps) {
  return (
    <div className="space-y-3 p-4">
      {title && <Label className="text-base font-medium">{title}</Label>}
      <RadioGroup defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} value={order}>
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
