import React from 'react'

interface IconInputProps {
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
}
export default function IconInput({ children, icon: Icon }: IconInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      {children}
    </div>
  )
}
