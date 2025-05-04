import React from 'react';

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 top-16 z-40 bg-gray-900 bg-opacity-95 backdrop-blur-sm md:hidden">
      <nav className="flex flex-col p-6 space-y-6 text-center">
        <a 
          href="#dashboard" 
          className="text-white text-xl font-medium py-3 border-b border-gray-800 hover:text-teal-400 transition-colors duration-200"
        >
          Dashboard
        </a>
        <a 
          href="#expenses" 
          className="text-white text-xl font-medium py-3 border-b border-gray-800 hover:text-teal-400 transition-colors duration-200"
        >
          Expenses
        </a>
        <a 
          href="#budget" 
          className="text-white text-xl font-medium py-3 border-b border-gray-800 hover:text-teal-400 transition-colors duration-200"
        >
          Budget
        </a>
        <a 
          href="#forecasting" 
          className="text-white text-xl font-medium py-3 border-b border-gray-800 hover:text-teal-400 transition-colors duration-200"
        >
          Forecasting
        </a>
      </nav>
    </div>
  );
};

export default MobileMenu;