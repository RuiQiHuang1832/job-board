import { CompanyAvatar as Avatar, BaseJobProps } from '@/app/jobs'
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

export default function JobCard(props: BaseJobProps) {
  return (
    <Card className="gap-3 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>
          <Stack gap={3}>
            <Avatar name={props.company} />
            <div>
              <Stack align="baseline">
                <div className="text-xl text-primary">{props.title}</div>
                <div className="text-gray-400 font-light text-sm">{props.daysPosted} days ago</div>
              </Stack>
              <div className="text-muted-foreground text-sm">{props.company}</div>
            </div>
          </Stack>
        </CardTitle>
        <CardDescription className="text-gray-500 mt-2 text-sm">
          {props.location} · {props.pay}
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
