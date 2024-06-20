import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  }
}
