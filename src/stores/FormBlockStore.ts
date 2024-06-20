import { create } from "zustand";

interface FormBlockState {
    blocks: Block[];
    addBlock: (block: Block) => void;
    updateBlock: (id: string, block: Block) => void;
    removeBlock: (id: string) => void;
}
const useFormBlockStore = create<FormBlockState>((set) => ({
    // State
    blocks: [],

    // Actions
    addBlock: (block) => set((state) => ({ blocks: [...state.blocks, block] })),

    updateBlock: (id, updatedBlock) =>
        set((state) => ({
          blocks: state.blocks.map((block) =>
            block.id === id ? { ...block, ...updatedBlock } : block
          ),
        })),

    removeBlock: (id) => set((state) => ({
        blocks: state.blocks.filter((block) => block.id !== id),
    }))
}))

export default useFormBlockStore;