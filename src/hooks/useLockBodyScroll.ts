'use client'
import { useEffect } from 'react'
// Not used anymore
export default function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return
    const doc = document.documentElement
    const body = document.body
    const scrollBarWidth = window.innerWidth - doc.clientWidth

    if (locked) {
      // lock scroll
      body.style.overflow = 'hidden'
      // avoid layout shift when scrollbar disappears
      if (scrollBarWidth > 0) body.style.paddingRight = `${scrollBarWidth}px`
    } else {
      // restore
      body.style.overflow = ''
      body.style.paddingRight = ''
    }

    return () => {
      body.style.overflow = ''
      body.style.paddingRight = ''
    }
  }, [locked])
}
