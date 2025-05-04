import { User, Expense, FixedCost, Budget } from '../types';

// Local storage keys
const USER_KEY = 'budget-buddy-user';

// Get user data from local storage
export const getUserData = (): User | null => {
  const userData = localStorage.getItem(USER_KEY);
  
  if (!userData) {
    return null;
  }
  
  try {
    return JSON.parse(userData);
  } catch (error) {
    console.error('Failed to parse user data:', error);
    return null;
  }
};

// Save user data to local storage
export const saveUserData = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Initialize user data if it doesn't exist
export const initializeUserData = (name: string): User => {
  const newUser: User = {
    id: generateId(),
    name,
    budget: null,
    fixedCosts: [],
    expenses: []
  };
  
  saveUserData(newUser);
  return newUser;
};

// Generate a unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Add an expense
export const addExpense = (expense: Omit<Expense, 'id'>): void => {
  const user = getUserData();
  
  if (!user) return;
  
  const newExpense: Expense = {
    ...expense,
    id: generateId()
  };
  
  user.expenses.push(newExpense);
  saveUserData(user);
};

// Delete an expense
export const deleteExpense = (id: string): void => {
  const user = getUserData();
  
  if (!user) return;
  
  user.expenses = user.expenses.filter(expense => expense.id !== id);
  saveUserData(user);
};

// Add a fixed cost
export const addFixedCost = (fixedCost: Omit<FixedCost, 'id'>): void => {
  const user = getUserData();
  
  if (!user) return;
  
  const newFixedCost: FixedCost = {
    ...fixedCost,
    id: generateId()
  };
  
  user.fixedCosts.push(newFixedCost);
  saveUserData(user);
};

// Delete a fixed cost
export const deleteFixedCost = (id: string): void => {
  const user = getUserData();
  
  if (!user) return;
  
  user.fixedCosts = user.fixedCosts.filter(cost => cost.id !== id);
  saveUserData(user);
};

// Set budget
export const setBudget = (budget: Omit<Budget, 'id'>): void => {
  const user = getUserData();
  
  if (!user) return;
  
  user.budget = {
    ...budget,
    id: generateId()
  };
  
  saveUserData(user);
};