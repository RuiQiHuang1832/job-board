import { Card, CardAction, CardContent, CardHeader } from '@/components/ui/card'
import { Stack } from '@/components/ui/stack'

const SkeletonLine = ({ width, height = 'h-5' }: { width: string; height?: string }) => (
  <div className={`${width} ${height} rounded bg-muted`}></div>
)

const SkeletonGroup = ({ lines }: { lines: string[] }) => (
  <div className="space-y-2">
    {lines.map((width, index) => (
      <SkeletonLine key={index} width={width} />
    ))}
  </div>
)

export default function JobSidebarSkeleton() {
  // Defines layout width for skeleton lines by section
  const contentSections = [
    ['w-full', 'w-full', 'w-full', 'w-full', 'w-full'], // 5 lines
    ['w-full', 'w-full'], // 2 lines
    ['w-full', 'w-full', 'w-full', 'w-full', 'w-full'], // 5 lines
    ['w-full', 'w-full', 'w-full', 'w-full'], // 4 lines
  ]
  return (
    <Card className="w-full h-[calc(100vh-calc(1.25rem*2))] sticky top-5 flex-1 animate-pulse">
      <CardHeader>
        <SkeletonLine width="w-1/3" height="h-7" />
        <SkeletonLine width="w-1/2" height="h-4" />
        <SkeletonLine width="w-1/7" height="h-4" />
        <CardAction className="w-[120px] h-[36px]  rounded bg-muted"></CardAction>
      </CardHeader>
      <CardContent className="space-y-5 flex-1 flex flex-col">
        {contentSections.map((lines, index) => (
          <SkeletonGroup key={index} lines={lines} />
        ))}
        <div className="space-y-2 mt-auto">
          <SkeletonLine width="w-1/4" />
          <Stack gap={3}>
            <SkeletonLine width="w-11" height="h-11" />
            <Stack gap={2} align="start" direction="col">
              <SkeletonLine width="w-20" />
              <Stack gap={2}>
                {Array.from({ length: 4 }, (_, index) => (
                  <SkeletonLine key={index} width="w-15" height="h-3" />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <SkeletonGroup lines={['w-full', 'w-full', 'w-full']} />
          <Stack>
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonLine key={index} width="w-1/5" height="h-4" />
            ))}
          </Stack>
        </div>
      </CardContent>
    </Card>
  )
}
