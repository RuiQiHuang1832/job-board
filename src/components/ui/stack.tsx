import * as React from 'react'

import { cn } from '@/lib/utils'

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'col'
  gap?: keyof typeof gapMap
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
}

const gapMap = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
}

function Stack({
  direction = 'row',
  gap = 4,
  align,
  justify,
  className,
  children,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'col' ? 'flex-col' : 'flex-row',
        gapMap[gap],
        align && `items-${align}`,
        justify && `justify-${justify}`,
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Stack }
