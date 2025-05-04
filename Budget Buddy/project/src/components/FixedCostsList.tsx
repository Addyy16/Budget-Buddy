import React from 'react';
import { Trash2 } from 'lucide-react';
import { FixedCost } from '../types';
import { deleteFixedCost } from '../utils/storage';

interface FixedCostsListProps {
  fixedCosts: FixedCost[];
  onDataChange: () => void;
}

const FixedCostsList: React.FC<FixedCostsListProps> = ({ fixedCosts, onDataChange }) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  // Handle fixed cost deletion
  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this fixed cost?')) {
      deleteFixedCost(id);
      onDataChange();
    }
  };
  
  // Get total of fixed costs
  const totalFixedCosts = fixedCosts.reduce((sum, cost) => sum + cost.amount, 0);
  
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Fixed Monthly Costs</h3>
          <div className="text-right">
            <p className="text-sm text-gray-400">Total Fixed Costs</p>
            <p className="text-lg font-semibold text-white">{formatCurrency(totalFixedCosts)}</p>
          </div>
        </div>
        
        {fixedCosts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3 rounded-tl-lg">Category</th>
                  <th scope="col" className="px-4 py-3">Description</th>
                  <th scope="col" className="px-4 py-3">Amount</th>
                  <th scope="col" className="px-4 py-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {fixedCosts.map((cost) => (
                  <tr key={cost.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300">
                        {cost.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-[200px] truncate">
                      {cost.description || <span className="text-gray-500 italic">No description</span>}
                    </td>
                    <td className="px-4 py-3 font-medium text-white">{formatCurrency(cost.amount)}</td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleDelete(cost.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        aria-label="Delete fixed cost"
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
            <p className="text-gray-400">No fixed costs found. Add your monthly bills to get better forecasts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FixedCostsList;