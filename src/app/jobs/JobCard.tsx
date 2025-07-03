import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tag } from '@/components/ui/tag'

export default function JobCard() {
  return (
    <Card className="gap-3 hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">
          Senior UX Designer{' '}
          <Tag className="text-semibold font-medium text-sm">$46,000–$75,000 Per Year</Tag>
        </CardTitle>
        <CardDescription>Dribble </CardDescription>
        <CardAction className="gap-2">
          <Button variant="default">Save</Button>
          <Button variant="secondary">Apply</Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="text-gray-600 mb-2">📍 San Francisco, CA</span>
          <span className="text-gray-600 mb-2">⏰ 2 days ago</span>
        </div>
        <div className="flex gap-2">
          <Tag>Remote</Tag>
          <Tag>Full Time</Tag>
          <Tag>UX</Tag>
          <Tag>Dental Insurance</Tag>
        </div>
        <p className="line-clamp-2">
          We have an exciting opportunity for a remote, licensed High Net Worth Service Associate in
          the Greater San Francisco, CA Metro area! While you will work from home, you must reside
          near the Greater San Francisco, CA area as occasional in-person participation with your
          peers is an important part of our culture. We offer virtual interviewing and onboarding,
          as well as access to our virtual training and support. You’ll have full access to work
          from home capability to support our clients remotely.
        </p>
      </CardContent>
    </Card>
  )
}
