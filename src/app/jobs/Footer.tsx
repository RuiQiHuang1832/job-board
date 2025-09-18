import Link from 'next/link'

import { Stack } from '@/components/ui/stack'
export default function Footer() {
  return (
    <footer className="">
      <Stack justify="between" className="p-6 border-t mt-10 text-sm ">
        <Stack>
          <div>© 2025 JobMatch. All rights reserved.</div> <div>|</div>
          <Link href="/terms" className="underline">
            Terms
          </Link>
        </Stack>
        <Stack>
          <Link href="/jobs">Jobs </Link>
          <div>|</div>
          <Link href="/contact">Contact</Link>
          <div>|</div>
          <Link href="/about">About</Link>
        </Stack>
        <p className="mt-2 text-muted-foreground text-sm">Built with care in California. ❤️</p>
      </Stack>
    </footer>
  )
}
