import { Card, CardContent } from '@/components/ui/card'
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

export default function JobCardSkeleton() {
  return (
    <Card className="w-full h-[230px] sticky flex-1 animate-pulse">
      <CardContent className="space-y-5 flex-1 flex flex-col ">
        <div className="space-y-2 my-auto">
          <Stack gap={3}>
            <SkeletonLine width="w-12" height="h-11" />
            <Stack gap={2} align="start" direction="col">
              <SkeletonLine width="w-50" />
              <Stack gap={2}>
                {Array.from({ length: 1 }, (_, index) => (
                  <SkeletonLine key={index} width="w-15" height="h-3" />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <SkeletonLine width="w-1/4" height="h-4" />

          <Stack>
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonLine key={index} width="w-12" height="h-3" />
            ))}
          </Stack>
          <SkeletonGroup lines={['w-full', 'w-full', 'w-full']} />
        </div>
      </CardContent>
    </Card>
  )
}
