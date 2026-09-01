import { create } from 'zustand'

type CountStore = {
  count: number;
  Increment: () => void;
  zeroCount: () => void;
  Decrement: () => void; // Fixed spelling to match implementation
}

export const useCounter = create<CountStore>((set) => ({
  count: 0,
  
  Increment: () => set((state) => ({ count: state.count + 1 })),
  
  // Fixed: Wrapped in set() and correctly returns { count: 0 } without mutating state
  zeroCount: () => set({ count: 0 }),
  
  Decrement: () => set((state) => ({ count: state.count - 1 })),
}))
