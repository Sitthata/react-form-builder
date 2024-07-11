import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { cn } from '@/lib/utils'

type FormCardProps = {
  title: string
  time: string
  status: 'Draft' | 'Published'
  description: string
}

const FormCard = ({ title, time, status, description }: FormCardProps) => {
  return (
    <Card className="flex h-full flex-col rounded-lg">
      <CardHeader>
        <div className="flex flex-col justify-between gap-2 md:flex-row">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{time}</CardDescription>
          </div>
          <div>
            <Badge className="p-1">{status}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p
          className={cn('text-sm font-light text-accent-foreground', {
            italic: !description,
          })}
        >
          {description ? description : 'No description provided'}
        </p>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button className="w-full">View Survey</Button>
      </CardFooter>
    </Card>
  )
}

export default FormCard
