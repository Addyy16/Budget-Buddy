import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center justify-center md:justify-start">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" /> by Aditya Prajapati
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 text-sm text-center md:text-left">
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-teal-400 transition-colors duration-200">Contact</a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Budget Buddy. All rights reserved.</p>
          <p className="mt-1 text-gray-500">Your financial future, simplified.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;