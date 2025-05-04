import React, { useState } from 'react';
import { Trash2, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import { Expense } from '../types';
import { deleteExpense } from '../utils/storage';

interface ExpensesListProps {
  expenses: Expense[];
  onDataChange: () => void;
}

const ExpensesList: React.FC<ExpensesListProps> = ({ expenses, onDataChange }) => {
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Get unique categories
  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Handle expense deletion
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id);
      onDataChange();
    }
  };
  
  // Handle sort
  const handleSort = (field: 'date' | 'amount') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };
  
  // Filter and sort expenses
  const filteredAndSortedExpenses = [...expenses]
    .filter(expense => !filterCategory || filterCategory === 'All' || expense.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
      }
    });
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Recent Expenses</h3>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-gray-300 hover:text-teal-400 transition-colors"
          >
            <Filter className="h-4 w-4 mr-1" />
            Filters
            {showFilters ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
          </button>
        </div>
        
        {showFilters && (
          <div className="mb-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="category-filter" className="block text-gray-300 mb-2 text-sm">Filter by Category</label>
                <select
                  id="category-filter"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex-1">
                <label className="block text-gray-300 mb-2 text-sm">Sort By</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSort('date')}
                    className={`flex items-center px-3 py-2 rounded-lg border ${
                      sortBy === 'date' ? 'border-teal-500 text-teal-400' : 'border-gray-600 text-gray-300'
                    } hover:border-teal-500 hover:text-teal-400 transition-colors text-sm`}
                  >
                    Date
                    {sortBy === 'date' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleSort('amount')}
                    className={`flex items-center px-3 py-2 rounded-lg border ${
                      sortBy === 'amount' ? 'border-teal-500 text-teal-400' : 'border-gray-600 text-gray-300'
                    } hover:border-teal-500 hover:text-teal-400 transition-colors text-sm`}
                  >
                    Amount
                    {sortBy === 'amount' && (
                      sortOrder === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {filteredAndSortedExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 rounded-tl-lg">Date</th>
                  <th scope="col" className="px-4 py-3">Description</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAndSortedExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-4 py-3">{formatDate(expense.date)}</td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {expense.description || <span className="text-gray-500 italic">No description</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{formatCurrency(expense.amount)}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDelete(expense.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete expense"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">No expenses found. Add some expenses to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensesList;