import { create } from 'zustand';

export interface Recipie {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string;
}

interface RecipieStore {
    recipies: Recipie[];
    addRecipie: (recipie: Recipie) => void;
    removeRecipie: (id: number) => void;
    // Fixed typo: changed parameter from id to the actual recipe object
    editRecipie: (recipie: Recipie) => void; 
}

export const useRecipie = create<RecipieStore>((set) => ({
  recipies: [],
  
  addRecipie: (recipe) => 
    set((state) => ({ recipies: [...state.recipies, recipe] })),
    
  removeRecipie: (id) => 
    set((state) => ({ recipies: state.recipies.filter((r) => r.id !== id) })),
    
  // Fixed syntax and used .map() to update the correct item
  editRecipie: (updatedRecipe) => 
    set((state) => ({
      recipies: state.recipies.map((r) => 
        r.id === updatedRecipe.id ? updatedRecipe : r
      )
    }))
}));
