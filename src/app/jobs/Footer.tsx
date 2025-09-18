import Link from 'next/link'

import { Stack } from '@/components/ui/stack'
export default function Footer() {
  return (
    <footer className="">
      <Stack className="p-6 border-t mt-10 text-sm justify-center sm:justify-between sm:items-center gap-4">
        <Stack>
          <div>© 2025 JobMatch. All rights reserved.</div> <div>·</div>
          <Link href="/terms">Privacy</Link>
        </Stack>
        <Stack className="sm:ps-0 ps-5">
          <Link href="/jobs">Jobs </Link>
          <div>|</div>
          <Link href="/contact">Contact</Link>
          <div>|</div>
          <Link href="/about">About</Link>
        </Stack>
        <p className="text-muted-foreground text-sm">Built with care in California. ❤️</p>
      </Stack>
    </footer>
  )
}
