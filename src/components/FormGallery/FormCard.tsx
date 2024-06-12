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

const FormCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 justify-between md:flex-row">
          <div>
            <CardTitle>React Senior Survey</CardTitle>
            <CardDescription>8 hours agos</CardDescription>
          </div>
          <div>
            <Badge className="p-1">Published</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-light italic text-accent-foreground">
          No Description Provided
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Survey</Button>
      </CardFooter>
    </Card>
  )
}

export default FormCard
