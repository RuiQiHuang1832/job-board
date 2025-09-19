import { NextResponse } from 'next/server'

import data from '@/../data/jobs.seed.json'
export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ jobs: data, total: data.length })
}
