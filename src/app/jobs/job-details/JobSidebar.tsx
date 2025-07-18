'use client'
import Link from 'next/link'
import { useState } from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { TbCoins } from 'react-icons/tb'

import { CompanyAvatar as Avatar, DetailedJobProps } from '@/app/jobs'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Stack } from '@/components/ui/stack'
import { cn } from '@/lib/utils'

import styles from './JobSidebar.module.css'

export default function JobSidebar(props: DetailedJobProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full h-[calc(100vh-calc(1.25rem*2))] sticky top-5 flex-1 ">
      <CardHeader>
        <CardTitle className="text-2xl">{props.title}</CardTitle>
        <CardDescription>
          {props.company} · {props.daysPosted} days ago · {props.location} ·{' '}
          {props.onsite ? 'On-site' : 'Remote'}
        </CardDescription>
        <CardDescription className="text-emerald-600 font-semibold">
          <Stack gap={2} className="text-base">
            <LiaMoneyBillWaveSolid size="20px"></LiaMoneyBillWaveSolid>$46,000 - $75,000
          </Stack>
        </CardDescription>

        <CardAction>
          <Button variant="default">
            <FaExternalLinkAlt></FaExternalLinkAlt>Apply Now
          </Button>
        </CardAction>
      </CardHeader>
      {/* flex-1: takes remaining height of PARENT, flex flex-col: vertical layout, justify-between: pushes content to top/bottom ( used for shorter descriptions) */}
      <CardContent className="overflow-y-auto space-y-5 flex-1 flex flex-col justify-between">
        <div className={cn('whitespace-pre-wrap', !isExpanded && 'line-clamp-[18]')}>
          {props.description}
        </div>
        <div className={cn('relative', !isExpanded && styles['job-gradient'])}>
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <FiMinus /> : <FiPlus />} Show {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
        <Stack direction="col" align="start" justify="end">
          <h5>Company Details</h5>
          <Stack gap={3}>
            <Avatar name={props.company} />
            <Stack gap={0} align="start" direction="col">
              <div className="text-xl text-primary font-semibold">{props.company}</div>
              <Stack gap={2} className="text-sm text-blue-600 ">
                <Stack gap={1}>
                  <FaExternalLinkAlt />
                  <Link href="/">Website</Link>
                </Stack>{' '}
                · <Link href="/">Overview</Link> · <Link href="/">Salaries</Link> ·{' '}
                <Link href="/">Benefits</Link>
              </Stack>
            </Stack>
          </Stack>
          <p>{props.companyDescription}</p>
          <Stack gap={4}>
            <Stack gap={1}>
              <HiOutlineBuildingOffice2></HiOutlineBuildingOffice2>
              {props.location}
            </Stack>
            <Stack gap={1}>
              <GrGroup></GrGroup>
              {props.employeeCount}
            </Stack>
            <Stack gap={1}>
              <IoMdInformationCircleOutline></IoMdInformationCircleOutline>
              {props.private ? 'Private' : 'Public'}
            </Stack>
            <Stack gap={1}>
              <TbCoins></TbCoins>
              {props.valuation}
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
