import Avatar from '@/app/jobs/CompanyAvatar'
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

interface JobCardProps {
  title: string
  company: string
  daysPosted: number
  location: string
  pay: string
  tags: ReadonlyArray<string>
  description: string
}

export default function JobCard({
  title,
  company,
  daysPosted,
  location,
  pay,
  tags,
  description,
}: JobCardProps) {
  return (
    <Card className="gap-3 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>
          <Stack gap={3}>
            <Avatar name={company} />
            <div>
              <Stack align="baseline">
                <div className="text-2xl text-primary">{title}</div>
                <div className="text-gray-400 font-light text-sm">{daysPosted} days ago</div>
              </Stack>
              <div className="text-muted-foreground text-sm">{company}</div>
            </div>
          </Stack>
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2 text-sm">
          {location} · {pay}
        </CardDescription>
        <CardAction className="space-x-2">
          <Button variant="default">Save</Button>
          <Button variant="secondary">Apply</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <Stack gap={2} className="flex">
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </Stack>
        <p className="line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  )
}
