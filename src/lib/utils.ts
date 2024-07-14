import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatDistanceToNow } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function mergeRefs<T>(...refs: React.Ref<T>[]): React.Ref<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

export function createArrayManager<T>(initialArray: T[] = []) {
  let array = [...initialArray]

  return {
    getArray: () => array,
    setArray: (newArray: T[]) => {
      array = [...newArray]
    },
    push: (element: T) => {
      array = [...array, element]
    },
    filter: (callback: (value: T, index: number, array: T[]) => boolean) => {
      array = array.filter(callback)
    },
    update: (index: number, newElement: T) => {
      array = [...array.slice(0, index), newElement, ...array.slice(index + 1)]
    },
    remove: (index: number) => {
      array = [...array.slice(0, index), ...array.slice(index + 1)]
    },
    clear: () => {
      array = []
    },
    getIndexFromId: (id: number) => {
      return array.findIndex((element) => (element as any).id === id)
    },
  }
}

export function showDefault(defaultWord: string, value: string | undefined) {
  return value ? value : defaultWord
}

export function formatDateToNow(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function mapToType(value: string) {
  const map: Record<string, string> = {
    TEXT: 'text',
    MULTIPLE_CHOICE: 'multipleChoice',
  }
  return map[value]
}

export function mapToEnum(value: string) {
  const map: Record<string, string> = {
    text: 'TEXT',
    multipleChoice: 'MULTIPLE_CHOICE',
  }
  return map[value]
}
