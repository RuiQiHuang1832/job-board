'use client'

import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import { MdLocationPin } from 'react-icons/md'

import { CompanyAvatar as Avatar, BaseJobProps } from '@/app/jobs/shared'
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
import { Tag } from '@/components/ui/tag'
import { cn } from '@/lib/utils'

interface JobCardProps extends BaseJobProps {
  isSelected: boolean
  saved: boolean
  onJobClick: (id: string) => void
  onJobHide: (id: string) => void
  onJobSave: (id: string) => void
}

export default function JobCard(props: JobCardProps) {
  const handleCardClick = () => {
    props.onJobClick?.(props.id)
  }

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onJobSave?.(props.id)
  }

  const handleCloseClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    props.onJobHide?.(props.id)
  }

  return (
    <Card
      onClick={handleCardClick}
      className={cn(
        'gap-3 transition-shadow hover:shadow-md cursor-pointer group',
        props.isSelected && 'border-blue-500 ',
      )}
    >
      <CardHeader>
        <CardTitle>
          <Stack gap={3}>
            <Avatar name={props.company} />
            <div>
              <Stack align="baseline">
                <h4 className="text-primary font-bold group-hover:underline group-hover:decoration-[1px]">
                  {props.title}
                </h4>
                <div className="text-gray-400 font-light text-sm">{props.daysPosted} days ago</div>
              </Stack>
              <div className="text-muted-foreground text-sm">{props.company}</div>
            </div>
          </Stack>
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2 text-sm">
          <Stack gap={1}>
            <MdLocationPin size="15px" />
            {props.location} · {formatRangeToK(props.pay)}
          </Stack>
        </CardDescription>
        <CardAction className="w-full">
          <Stack direction="col">
            <Button
              onClick={handleBookmarkClick}
              variant="ghost"
              className="!px-2"
              title="Save this job"
              aria-label={props.saved ? 'Remove from saved jobs' : 'Save this job'}
            >
              {props.saved ? (
                <BsBookmarkFill className="size-[1.4rem]" />
              ) : (
                <BsBookmark className="size-[1.4rem]" />
              )}
            </Button>
            <Button
              onClick={handleCloseClick}
              variant="ghost"
              className="!px-2"
              title="Hide this job"
            >
              <IoClose className="size-[1.5rem]" />
            </Button>
          </Stack>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <Stack gap={2} className="flex">
          {props.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Stack>
        <p className="line-clamp-2">{props.description}</p>
      </CardContent>
    </Card>
  )
}

function formatRangeToK(input: string): string {
  const parts = input.match(/\$?([\d,]+)[–-]\$?([\d,]+)/)
  if (!parts) return ''

  const [, startStr, endStr] = parts
  const start = Math.round(parseInt(startStr.replace(/,/g, '')) / 1000)
  const end = Math.round(parseInt(endStr.replace(/,/g, '')) / 1000)

  return `$${start}k-$${end}k`
}
