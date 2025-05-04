import React, { useState } from 'react';
import { Home, ShoppingBag, TrendingUp } from 'lucide-react';
import { addFixedCost } from '../utils/storage';

const CATEGORIES = [
  'Rent/Mortgage', 'Utilities', 'Groceries', 'Transportation',
  'Insurance', 'Subscriptions', 'Other'
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Rent/Mortgage': <Home className="h-5 w-5" />,
  'Groceries': <ShoppingBag className="h-5 w-5" />,
  'Utilities': <TrendingUp className="h-5 w-5" />
};

const FixedCostsForm: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('Rent/Mortgage');
  const [description, setDescription] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount && parseFloat(amount) > 0) {
      addFixedCost({
        amount: parseFloat(amount),
        category,
        description
      });
      
      // Reset form
      setAmount('');
      setCategory('Rent/Mortgage');
      setDescription('');
      
      // Show success message
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white">Add Fixed Monthly Cost</h3>
      </div>
      
      <div className="px-6 pb-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="fixed-amount" className="block text-gray-300 mb-2">Amount ($)</label>
              <input
                type="number"
                id="fixed-amount"
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
              <label htmlFor="fixed-category" className="block text-gray-300 mb-2">Category</label>
              <select
                id="fixed-category"
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
            
            <div className="md:col-span-2">
              <label htmlFor="fixed-description" className="block text-gray-300 mb-2">Description</label>
              <input
                type="text"
                id="fixed-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:outline-none"
                placeholder="e.g., Monthly rent, Internet bill, etc."
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Add Fixed Cost
          </button>
          
          {isSuccess && (
            <div className="mt-4 py-2 px-4 bg-green-900 text-green-200 rounded-lg text-center">
              Fixed cost added successfully!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FixedCostsForm;