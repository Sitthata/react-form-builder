import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type DragAndDropContainerProps = {
  items: any[]
  children: React.ReactNode
  onDragEnd?: (event: any) => void
  onDragStart?: (event: any) => void
}

const DragAndDropContainer = ({
  items,
  children,
  onDragEnd: handleDragEnd,
  onDragStart: handleDragStart,
}: DragAndDropContainerProps) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor)
  )
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      collisionDetection={closestCenter}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
      {/* <DragOverlay dropAnimation={null} /> */}
    </DndContext>
  )
}

export default DragAndDropContainer
