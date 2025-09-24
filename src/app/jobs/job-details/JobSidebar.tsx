'use client'
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { FaExternalLinkAlt, FaEyeSlash } from 'react-icons/fa'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { GrGroup } from 'react-icons/gr'
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { LiaMoneyBillWaveSolid } from 'react-icons/lia'
import { TbCoins } from 'react-icons/tb'

import { CompanyAvatar as Avatar, DetailedJobWithUIState } from '@/app/jobs/shared'
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

export default function JobSidebar(
  props: DetailedJobWithUIState & {
    hideDueToMobile?: boolean
    hideDetails?: boolean
  },
) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { hideDetails, hideDueToMobile } = props
  
  // Clean up HTML entities and heading tags in job description
  const decoded =
    props.description
      ?.replace(/&lt;/g, '<')
      ?.replace(/&gt;/g, '>')
      ?.replace(/&amp;/g, '&')
      ?.replace(/&quot;/g, '"')
      ?.replace(/&nbsp;/g, ' ')
      ?.replace(/<h[1-4]\b[^>]*>/gi, '<p>')
      ?.replace(/<\/h[1-4]\s*>/gi, '</p>') ?? ''?.replace(/<br>/g, '')
  const companyMetadata: Array<{ icon: React.ComponentType; value: string | number | undefined }> =
    [
      { icon: HiOutlineBuildingOffice2, value: props.location },
      { icon: GrGroup, value: props.employeeCount },
      { icon: IoMdInformationCircleOutline, value: props.private ? 'Private' : 'Public' },
      { icon: TbCoins, value: props.valuation },
    ] as const

  return (
    <Card
      className={`${hideDueToMobile && 'hidden'} ${hideDetails && 'border-0 shadow-none'} w-full h-auto lg:h-[calc(100vh-calc(1.25rem*2))] lg:sticky top-5 flex-1 py-6 `}
    >
      <CardHeader>
        <CardTitle className="text-2xl">{props.title}</CardTitle>
        <CardDescription>
          {props.company} · {props.daysPosted} days ago · {props.location} ·{' '}
          {props.onsite ? 'On-site' : 'Remote'}
        </CardDescription>
        <CardDescription className="text-emerald-600 font-semibold">
          {props.pay && (
            <Stack gap={2} className="text-base">
              <LiaMoneyBillWaveSolid size="20px"></LiaMoneyBillWaveSolid>
              {props.pay}
            </Stack>
          )}
        </CardDescription>
        <CardAction>
          <Button className="px-3">
            {props.isHidden ? (
              <>
                <FaEyeSlash></FaEyeSlash>Hidden
              </>
            ) : (
              <>
                <Link target="_blank" href={props.url}>
                  <Stack gap={2}>
                    <FaExternalLinkAlt></FaExternalLinkAlt>
                    <span className="sm:inline hidden">Apply Now</span>
                  </Stack>
                </Link>
              </>
            )}
          </Button>
        </CardAction>
      </CardHeader>

      {/* flex-1: takes remaining height of PARENT, flex flex-col: vertical layout, justify-between: pushes content to top/bottom ( used for shorter descriptions) */}
      <CardContent className="overflow-y-auto space-y-5 flex-1 flex flex-col justify-between">
        <div className={cn('', !isExpanded && 'line-clamp-[18]')}>
          <div
            className="prose job-description prose-neutral max-w-none default"
            dangerouslySetInnerHTML={{ __html: decoded }}
          />
        </div>
        <div className={cn('relative', !isExpanded && styles['job-gradient'])}>
          <Button
            className="w-full"
            size="lg"
            variant="secondary"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? 'Show less job description' : 'Show more job description'}
          >
            {isExpanded ? <FiMinus /> : <FiPlus />} Show {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
        <Stack className="mb-5" direction="col" align="start" justify="end">
          <h5>Company Details</h5>
          <Stack gap={3}>
            <Avatar name={props.company} />
            <Stack gap={0} align="start" direction="col">
              <h4 className="text-primary">{props.company}</h4>
              <Stack gap={2} className="text-sm text-blue-600 ">
                <Stack gap={1}>
                  <FaExternalLinkAlt />
                  <Link target="_blank" href={props.companyUrl}>
                    Website
                  </Link>
                </Stack>
                {['Overview', 'Salaries', 'Benefits'].map((label) => (
                  <Fragment key={label}>
                    {' · '}
                    <Link target="_blank" href={`${props.companyUrl}careers`}>
                      {label}
                    </Link>
                  </Fragment>
                ))}
              </Stack>
            </Stack>
          </Stack>
          <p>{props.companyDescription}</p>
          <Stack gap={4}>
            {companyMetadata.map((item, index) => (
              <Stack gap={1} key={index}>
                <item.icon />
                {item.value}
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
