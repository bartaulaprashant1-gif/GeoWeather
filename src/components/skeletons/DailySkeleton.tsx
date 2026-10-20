import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

type Props = {}

export default function DailySkeleton({}: Props) {
  return (
    <Card
          title="Daily Forecast"
          childrenClassName="flex flex-col gap-4"
        >
          {Array.from({length:7}).map((day, index) => (
            <div key={index} className="flex justify-between items-center">
              <Skeleton className='w-9'/>
              <Skeleton className='size-8 rounded-full'/>
              <Skeleton className='w-30 h-8'/>
              <Skeleton className='w-30 h-8'/>
              <Skeleton className='w-30 h-8'/>
            </div>
          ))}
        </Card>
  )
}