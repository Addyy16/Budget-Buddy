import React from 'react';
import { DollarSign, Calendar, AlertTriangle, TrendingDown } from 'lucide-react';
import { User } from '../types';
import { 
  calculateRemainingBudget, 
  calculateTotalExpenses, 
  calculateTotalFixedCosts,
  forecastMoneyRunout,
  calculateSuggestedDailySpending
} from '../utils/calculators';

interface BudgetSummaryProps {
  user: User;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ user }) => {
  const { budget, expenses, fixedCosts } = user;
  
  // Calculate budget metrics
  const remainingBudget = calculateRemainingBudget(budget, expenses, fixedCosts);
  const totalExpenses = calculateTotalExpenses(expenses);
  const totalFixedCosts = calculateTotalFixedCosts(fixedCosts);
  const forecast = forecastMoneyRunout(budget, expenses, fixedCosts);
  const suggestedDailySpending = calculateSuggestedDailySpending(budget, expenses, fixedCosts);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  if (!budget) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="text-center py-8">
          <h3 className="text-xl font-semibold text-white mb-4">No Budget Set</h3>
          <p className="text-gray-400">Please set a budget to see your financial summary.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Budget Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-teal-400 mr-2" />
              <span className="text-gray-300">Total Budget</span>
            </div>
            <p className="text-2xl font-bold text-white">{formatCurrency(budget.amount)}</p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <DollarSign className="h-5 w-5 text-purple-400 mr-2" />
              <span className="text-gray-300">Remaining Budget</span>
            </div>
            <p className={`text-2xl font-bold ${remainingBudget > 0 ? 'text-teal-400' : 'text-red-400'}`}>
              {formatCurrency(remainingBudget)}
            </p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-gray-300">Budget Period</span>
            </div>
            <p className="text-sm text-white">
              {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
            </p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <TrendingDown className="h-5 w-5 text-emerald-400 mr-2" />
              <span className="text-gray-300">Suggested Daily</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">
              {formatCurrency(suggestedDailySpending)}
            </p>
          </div>
        </div>
        
        {forecast.willRunOut && (
          <div className="bg-red-900/50 border border-red-800 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-300 font-semibold">Budget Alert</h4>
                <p className="text-red-200 text-sm mt-1">
                  At your current spending rate, you'll run out of money in <strong>{forecast.daysLeft} days</strong> (around {formatDate(forecast.runoutDate?.toISOString() || '')}).
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-gray-300 mb-2">Expenses Breakdown</h4>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Daily Expenses</span>
                <span className="text-white">{formatCurrency(totalExpenses)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Fixed Costs</span>
                <span className="text-white">{formatCurrency(totalFixedCosts)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-600 mt-2">
                <span className="text-gray-200 font-medium">Total Spent</span>
                <span className="text-white font-medium">{formatCurrency(totalExpenses + totalFixedCosts)}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-gray-300 mb-2">Budget Progress</h4>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400 text-sm">
                    {((totalExpenses + totalFixedCosts) / budget.amount * 100).toFixed(0)}% used
                  </span>
                  <span className="text-gray-400 text-sm">
                    {formatCurrency(totalExpenses + totalFixedCosts)} of {formatCurrency(budget.amount)}
                  </span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      (totalExpenses + totalFixedCosts) / budget.amount > 0.8 ? 'bg-red-500' : 'bg-teal-500'
                    }`}
                    style={{ width: `${Math.min(((totalExpenses + totalFixedCosts) / budget.amount) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;