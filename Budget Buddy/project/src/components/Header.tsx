import React from 'react';
import { TrendingUp, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-4 px-6 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-8 w-8 text-teal-400" />
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-300">
            Budget Buddy
          </h1>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="#dashboard">Dashboard</NavLink>
          <NavLink href="#expenses">Expenses</NavLink>
          <NavLink href="#budget">Budget</NavLink>
          <NavLink href="#forecasting">Forecasting</NavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <a 
      href={href}
      className="text-gray-200 hover:text-teal-400 transition-colors duration-200 font-medium"
    >
      {children}
    </a>
  );
};

export default Header;