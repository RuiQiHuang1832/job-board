'use client'

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
  onJobClick: (id: number) => void
}

export default function JobCard(props: JobCardProps) {
  const handleClick = () => {
    props.onJobClick?.(props.id)
  }
  return (
    <Card
      onClick={handleClick}
      className={cn(
        'gap-3 transition-all duration-150 ease-in-out cursor-pointer hover:border-blue-500 hover:bg-blue-50',
        props.isSelected && 'border-blue-500 bg-blue-50',
      )}
    >
      <CardHeader>
        <CardTitle>
          <Stack gap={3}>
            <Avatar name={props.company} />
            <div>
              <Stack align="baseline">
                <h4 className="text-primary">{props.title}</h4>
                <div className="text-gray-400 font-light text-sm">{props.daysPosted} days ago</div>
              </Stack>
              <div className="text-muted-foreground text-sm">{props.company}</div>
            </div>
          </Stack>
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2 text-sm">
          {props.location} · {formatRangeToK(props.pay)}
        </CardDescription>
        <CardAction className="space-x-2">
          <Button variant="default">Save</Button>
          <Button variant="secondary">Apply</Button>
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

  return `${start}k-${end}k`
}
