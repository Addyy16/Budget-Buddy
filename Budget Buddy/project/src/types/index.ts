export interface Expense {
  id: string;
  amount: number;
  category: string;
  date: string;
  description: string;
}

export interface FixedCost {
  id: string;
  amount: number;
  category: string;
  description: string;
}

export interface Budget {
  id: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  name: string;
  budget: Budget | null;
  fixedCosts: FixedCost[];
  expenses: Expense[];
}