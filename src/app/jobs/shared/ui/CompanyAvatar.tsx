import Image from 'next/image'

import { cn } from '@/lib/utils'

const colorPairs = {
  primary: {
    background: 'bg-blue-600',
    text: 'text-white',
  },
  secondary: {
    background: 'bg-gray-100',
    text: 'text-gray-800',
  },
  success: {
    background: 'bg-green-500',
    text: 'text-white',
  },
  destructive: {
    background: 'bg-red-600',
    text: 'text-white',
  },
  warning: {
    background: 'bg-yellow-300',
    text: 'text-yellow-900',
  },
  accent: {
    background: 'bg-purple-700',
    text: 'text-white',
  },
} as const

const letterColorMap: Record<string, keyof typeof colorPairs> = {
  A: 'destructive',
  B: 'destructive',
  C: 'destructive',
  D: 'destructive',
  E: 'destructive',
  F: 'destructive',
  G: 'success',
  H: 'success',
  I: 'success',
  J: 'success',
  K: 'success',
  L: 'success',
  M: 'warning',
  N: 'warning',
  O: 'warning',
  P: 'warning',
  Q: 'warning',
  R: 'warning',
  S: 'primary',
  T: 'primary',
  U: 'primary',
  V: 'primary',
  W: 'primary',
  X: 'primary',
  Y: 'accent',
  Z: 'accent',
} as const

interface CompanyAvatarProps {
  name: string
  alt?: string
  src?: string
}

export default function CompanyAvatar({ name, alt, src }: CompanyAvatarProps) {
  if (src) {
    return <Image src={src} alt={alt || name} className="w-11 h-11 object-cover rounded-md" />
  }
  const colorScheme = colorPairs[letterColorMap[name[0]]]
  return (
    <div
      className={cn(
        'w-11 h-11 rounded-md text-1xl font-medium sm:flex items-center justify-center hidden flex-shrink-0',
        colorScheme.background,
        colorScheme.text,
      )}
    >
      {name[0]}
    </div>
  )
}
