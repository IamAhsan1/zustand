import {create} from 'zustand';

export interface Expense {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string;
}

interface ExpenseStore {
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
    removeExpense: (id: number) => void;
    // 1. Fixed typo: changed parameter from id to the actual expense object
    editExpense: (expense: Expense) => void; 
}

export const useExpense = create<ExpenseStore>((set) => ({
  expenses: [],

  addExpense: (expense) => 
    set((state) => ({ expenses: [...state.expenses, expense] })),
    
  removeExpense: (id) => 
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) })),
    
  // 2. Fixed syntax and used .map() to update the correct item
  editExpense: (updatedExpense) => 
    set((state) => ({
      expenses: state.expenses.map((e) => 
        e.id === updatedExpense.id ? updatedExpense : e
      )
    }))
}));
