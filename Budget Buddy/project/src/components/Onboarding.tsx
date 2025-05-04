import React, { useState } from 'react';
import { User, Budget } from '../types';
import { initializeUserData, setBudget } from '../utils/storage';

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [budgetAmount, setBudgetAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Calculate end date as last day of current month
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const endDate = lastDay.toISOString().split('T')[0];
  
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep(2);
    }
  };
  
  const handleBudgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (budgetAmount && parseFloat(budgetAmount) > 0) {
      const user = initializeUserData(name);
      
      const budget: Omit<Budget, 'id'> = {
        amount: parseFloat(budgetAmount),
        startDate,
        endDate
      };
      
      setBudget(budget);
      onComplete(user);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Budget Buddy</h2>
            <p className="text-gray-400">Let's set up your account in just a few steps</p>
          </div>
          
          {step === 1 ? (
            <form onSubmit={handleNameSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-300 mb-2">What's your name?</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </form>
          ) : (
            <form onSubmit={handleBudgetSubmit}>
              <div className="mb-6">
                <label htmlFor="budget" className="block text-gray-300 mb-2">How much money do you have for this month?</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-400">$</span>
                  <input
                    type="number"
                    id="budget"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
                    placeholder="Enter your monthly budget"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 px-4 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
                >
                  Get Started
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;