import { create } from "zustand";

interface Expense {
  id: number;
  description: string;
  amount: number;
}

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: number) => void;
}

export const useStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),
  removeExpense: (id: number) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id != id),
    })),
}));
