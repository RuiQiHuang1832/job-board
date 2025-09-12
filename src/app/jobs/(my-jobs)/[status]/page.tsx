import { notFound } from 'next/navigation'

import MyJobsClient from './MyJobsClient'

const VALID = ['saved', 'applied', 'hidden'] as const
type Status = (typeof VALID)[number]

export default async function Page({
  params,
}: {
  // Next 15 passes params as a Promise with PPR
  params: Promise<{ status: string }>
}) {
  const { status } = await params
  if (!VALID.includes(status as Status)) notFound()
  return <MyJobsClient status={status as Status} />
}
