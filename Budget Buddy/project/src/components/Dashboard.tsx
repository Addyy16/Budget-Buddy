import React from 'react';
import { User } from '../types';
import BudgetSummary from './BudgetSummary';
import ExpensesList from './ExpensesList';
import FixedCostsList from './FixedCostsList';
import ForecastChart from './ForecastChart';
import ExpenseForm from './ExpenseForm';
import FixedCostsForm from './FixedCostsForm';

interface DashboardProps {
  user: User;
  onDataChange: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onDataChange }) => {
  return (
    <div className="container mx-auto px-4 pb-20">
      <section id="dashboard" className="pt-24 pb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Dashboard</h2>
        <BudgetSummary user={user} />
      </section>
      
      <section id="forecasting" className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Spending Forecast</h2>
        <ForecastChart user={user} />
      </section>
      
      <section id="expenses" className="py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Track Expenses</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <ExpenseForm />
            <div className="mt-6">
              <FixedCostsForm />
            </div>
          </div>
          <div className="lg:col-span-3">
            <ExpensesList expenses={user.expenses} onDataChange={onDataChange} />
            <div className="mt-6">
              <FixedCostsList fixedCosts={user.fixedCosts} onDataChange={onDataChange} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;