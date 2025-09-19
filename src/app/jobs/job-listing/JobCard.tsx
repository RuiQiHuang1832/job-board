'use client'

import { useRef } from 'react'
import { BiSolidDownArrow } from 'react-icons/bi'
import { MdLocationPin } from 'react-icons/md'
import { toast } from 'sonner'

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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Stack } from '@/components/ui/stack'
import { Tag } from '@/components/ui/tag'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface JobCardProps extends BaseJobProps {
  isSelected?: boolean
  saved?: boolean
  applied?: boolean
  hidden?: boolean
  onJobClick?: (id: string) => void
  onJobHide?: (id: string) => void
  onJobSave?: (id: string) => void
  onJobApply?: (id: string) => void
}

const removed = [
  'About Flexport:',
  'Who we are',
  'We’re helping businesses become more sustainable. Join us!',
]

export default function JobCard(props: JobCardProps) {
  const applied = props.applied
  const saved = props.saved
  const hidden = props.hidden

  const triggerRef = useRef<HTMLButtonElement>(null)
  const handleCardClick = () => {
    props.onJobClick?.(props.id)
  }
  const handleSaveClick = () => {
    const next = !saved
    if (next) toast.success('Added to Saved Jobs', { position: 'top-center' })
    else toast.info('Removed from Saved Jobs', { position: 'top-center' })
    props.onJobSave?.(props.id)
  }

  const handleHideClick = () => {
    const next = !hidden
    if (next) {
      toast.info('Job Hidden', { position: 'top-center' })
    }
    props.onJobHide?.(props.id)
  }
  const handleJobApply = () => {
    const next = !applied
    if (next) toast.info('Job Applied', { position: 'top-center' })
    props.onJobApply?.(props.id)
  }
  const decoded =
    stripPhrases(props.description ?? '', removed)
      ?.replace(/&lt;/g, '<')
      ?.replace(/&gt;/g, '>')
      ?.replace(/&amp;/g, '&')
      ?.replace(/&quot;/g, '"')
      ?.replace(/&nbsp;/g, ' ')
      ?.replace(/<h[1-4]\b[^>]*>/gi, '<p>')
      ?.replace(/<\/h[1-4]\s*>/gi, '</p>') ?? ''?.replace(/<br>/g, '')
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
          <Stack gap={3} className="flex-nowrap" align="start">
            <Avatar name={props.company} />
            <div>
              <Stack align="baseline">
                <h4 className="text-primary font-bold group-hover:underline group-hover:decoration-[1px]">
                  {props.title}
                </h4>
                <div className="text-gray-400 font-light text-sm hidden">
                  {props.daysPosted} days ago
                </div>
              </Stack>
              <div className="text-muted-foreground text-sm">{props.company}</div>
            </div>
          </Stack>
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2 text-sm">
          <Stack gap={1}>
            <MdLocationPin size="15px" />
            {props.location} {props.pay && ` · ${formatRangeToK(props.pay)}`}
          </Stack>
        </CardDescription>
        <CardAction className="w-full">
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={(e) => e.stopPropagation()}
                    ref={triggerRef}
                    size="icon"
                    variant="outline"
                    aria-label="Job actions"
                  >
                    <BiSolidDownArrow className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="top">Job Actions</TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onCloseAutoFocus={(e) => {
                e.preventDefault() // don't refocus the trigger
                triggerRef.current?.blur() // drop focus so tooltip won't open
              }}
              className="w-56"
              align="start"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuCheckboxItem checked={applied} onCheckedChange={handleJobApply}>
                  Mark as Applied
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={saved} onCheckedChange={handleSaveClick}>
                  Save Job
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={hidden} onCheckedChange={handleHideClick}>
                  Hide Job
                </DropdownMenuCheckboxItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <Stack gap={2} className="flex-wrap">
          {props.tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Stack>
        <div
          className="prose max-w-none line-clamp-2"
          dangerouslySetInnerHTML={{ __html: decoded }}
        />
      </CardContent>
    </Card>
  )
}

function stripPhrases(text: string, phrases: string[]): string {
  return phrases.reduce((acc, phrase) => acc.replace(new RegExp(phrase, 'gi'), ''), text).trim()
}
function formatRangeToK(input: string): string {
  // capture "$181-$290K", "$120,000 - $135,000", etc.
  const parts = input.match(/\$?([\d,.]+)\s*[–-]\s*\$?([\d,.]+)\s*(k|K)?/)

  if (!parts) return input

  const [, startStr, endStr, suffix] = parts

  // normalize to numbers
  let start = parseFloat(startStr.replace(/,/g, ''))
  let end = parseFloat(endStr.replace(/,/g, ''))

  // if they wrote "K" explicitly, scale up
  if (suffix) {
    start *= 1000
    end *= 1000
  }

  // convert to K units
  const startK = Math.round(start / 1000)
  const endK = Math.round(end / 1000)

  if (startK <= 0) {
    return `Up to $${endK}k`
  }

  return `$${startK}k-$${endK}k`
}
