import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { addExpense } from '../utils/storage';

const CATEGORIES = [
  'Food', 'Transportation', 'Entertainment', 'Shopping', 
  'Health', 'Education', 'Bills', 'Other'
];

const ExpenseForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Food');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount && parseFloat(amount) > 0) {
      addExpense({
        amount: parseFloat(amount),
        category,
        description,
        date
      });
      
      // Reset form
      setAmount('');
      setCategory('Food');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      
      // Show success message
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      
      // Collapse form on mobile
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300">
      <div 
        className="p-6 cursor-pointer md:cursor-default" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-white">Add New Expense</h3>
          <button
            type="button"
            className="md:hidden text-teal-400 focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            <PlusCircle className={`h-6 w-6 transition-transform duration-300 ${isExpanded ? 'rotate-45' : 'rotate-0'}`} />
          </button>
        </div>
      </div>
      
      <div className={`px-6 pb-6 ${isExpanded || window.innerWidth >= 768 ? 'block' : 'hidden'}`}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="amount" className="block text-gray-300 mb-2">Amount ($)</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"
                placeholder="0.00"
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-gray-300 mb-2">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"
                required
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-gray-300 mb-2">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"
                required
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-gray-300 mb-2">Description</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"
                placeholder="What did you spend on?"
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Expense
          </button>
          
          {isSuccess && (
            <div className="mt-4 py-2 px-4 bg-green-900 text-green-200 rounded-lg text-center">
              Expense added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;