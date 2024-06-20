import { createArrayManager } from '@/lib/utils'
import { create } from 'zustand'

interface FormBlockState {
  blocks: Block[]
  addBlock: (block: Block) => void
  updateBlock: (id: string, block: Block) => void
  removeBlock: (id: string) => void
}
const useFormBlockStore = create<FormBlockState>((set) => {
  const arrayManager = createArrayManager<Block>([])
  function refresh() {
    set({ blocks: arrayManager.getArray() })
  }
  return {
    // State
    blocks: arrayManager.getArray(),

    // Actions
    addBlock: (block) => {
      arrayManager.push(block)
      refresh()
    },

    updateBlock: (id: string, updatedBlock: Partial<Block>) => {
      const index = arrayManager
        .getArray()
        .findIndex((block) => block.id === id)
      if (index !== -1) {
        arrayManager.update(index, {
          ...arrayManager.getArray()[index],
          ...updatedBlock,
        })
        refresh()
      }
    },

    removeBlock: (id) => {
      const index = arrayManager.getArray().findIndex((b) => b.id === id)
      if (index !== -1) {
        arrayManager.remove(index)
        refresh()
      }
    },
  }
})

export default useFormBlockStore
