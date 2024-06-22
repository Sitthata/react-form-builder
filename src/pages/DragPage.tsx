import { forwardRef, useState } from 'react'
import Wrapper from '@/components/Wrapper'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { CSS } from '@dnd-kit/utilities'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'

const DragPage = () => {
  const [todo, setTodo] = useState<string>('')
  const [todos, setTodos] = useState([
    { id: 'A1', text: 'Learn React' },
    { id: 'A2', text: 'Learn Vue' },
    { id: 'A3', text: 'Learn Angular' },
  ])

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

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        // console.log(todos, oldIndex, newIndex)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  function handleAddTodo() {
    if (todo.trim() === '') return
    setTodos([
      ...todos,
      {
        id: `A${Math.random().toString(36).substr(2, 9)}`,
        text: todo,
      },
    ])
    setTodo('')
  }
  function handleTodoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTodo(e.target.value)
  }
  return (
    <Wrapper>
      <div>
        <Label>Add Todo</Label>
        <div className="flex space-x-2">
          <Input type="text" value={todo} onChange={handleTodoChange} />
          <Button onClick={handleAddTodo}>Add</Button>
        </div>

        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext items={todos} strategy={rectSortingStrategy}>
            <div className="mt-4 flex flex-col gap-2">
              {todos.map((todo) => (
                <TodoItem key={todo.id} id={todo.id} text={todo.text} />
              ))}
            </div>
          </SortableContext>
          <DragOverlay dropAnimation={null} />
        </DndContext>
      </div>
    </Wrapper>
  )
}

function TodoItem({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
  }
  return (
    <div
      ref={setNodeRef}
      className="flex items-center justify-between rounded-md p-2 outline outline-1 outline-accent"
      style={style}
      {...attributes}
      {...listeners}
    >
      <p>{text}</p>
      <div className="flex space-x-2">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  )
}

export default DragPage
