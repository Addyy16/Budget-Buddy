import { Expense, FixedCost, Budget } from '../types';

// Calculate total expenses
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
};

// Calculate total fixed costs
export const calculateTotalFixedCosts = (fixedCosts: FixedCost[]): number => {
  return fixedCosts.reduce((total, cost) => total + cost.amount, 0);
};

// Calculate daily average spending
export const calculateDailyAverage = (expenses: Expense[]): number => {
  if (expenses.length === 0) return 0;
  
  const total = calculateTotalExpenses(expenses);
  const dates = expenses.map(expense => new Date(expense.date).toISOString().split('T')[0]);
  const uniqueDates = [...new Set(dates)];
  
  return uniqueDates.length > 0 ? total / uniqueDates.length : 0;
};

// Calculate remaining days in month
export const calculateRemainingDays = (): number => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  return lastDay.getDate() - today.getDate() + 1;
};

// Calculate remaining budget
export const calculateRemainingBudget = (
  budget: Budget | null, 
  expenses: Expense[], 
  fixedCosts: FixedCost[]
): number => {
  if (!budget) return 0;
  
  const totalExpenses = calculateTotalExpenses(expenses);
  const totalFixedCosts = calculateTotalFixedCosts(fixedCosts);
  
  return budget.amount - totalExpenses - totalFixedCosts;
};

// Forecast if money will run out before month end
export const forecastMoneyRunout = (
  budget: Budget | null, 
  expenses: Expense[], 
  fixedCosts: FixedCost[]
): { willRunOut: boolean; daysLeft: number; runoutDate: Date | null } => {
  if (!budget) {
    return { willRunOut: false, daysLeft: 0, runoutDate: null };
  }
  
  const remainingBudget = calculateRemainingBudget(budget, expenses, fixedCosts);
  const dailyAverage = calculateDailyAverage(expenses);
  const remainingDays = calculateRemainingDays();
  
  if (dailyAverage <= 0) {
    return { willRunOut: false, daysLeft: remainingDays, runoutDate: null };
  }
  
  const daysLeft = Math.floor(remainingBudget / dailyAverage);
  const willRunOut = daysLeft < remainingDays;
  
  let runoutDate = null;
  if (willRunOut) {
    runoutDate = new Date();
    runoutDate.setDate(runoutDate.getDate() + daysLeft);
  }
  
  return { willRunOut, daysLeft, runoutDate };
};

// Calculate suggested daily spending to avoid running out
export const calculateSuggestedDailySpending = (
  budget: Budget | null, 
  expenses: Expense[], 
  fixedCosts: FixedCost[]
): number => {
  if (!budget) return 0;
  
  const remainingBudget = calculateRemainingBudget(budget, expenses, fixedCosts);
  const remainingDays = calculateRemainingDays();
  
  return remainingDays > 0 ? remainingBudget / remainingDays : 0;
};

// Generate spending forecast for the next days
export const generateSpendingForecast = (
  budget: Budget | null,
  expenses: Expense[],
  fixedCosts: FixedCost[],
  days: number = 30
): number[] => {
  if (!budget) return Array(days).fill(0);
  
  const dailyAverage = calculateDailyAverage(expenses);
  const remainingBudget = calculateRemainingBudget(budget, expenses, fixedCosts);
  
  return Array(days).fill(0).map((_, index) => {
    const projectedValue = remainingBudget - (dailyAverage * (index + 1));
    return projectedValue > 0 ? projectedValue : 0;
  });
};