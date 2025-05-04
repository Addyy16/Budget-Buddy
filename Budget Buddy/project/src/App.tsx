import React, { useState, useEffect } from 'react';
import { getUserData } from './utils/storage';
import { User } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import MobileMenu from './components/MobileMenu';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  useEffect(() => {
    // Load user data from local storage
    const userData = getUserData();
    setUser(userData);
    setLoading(false);
  }, []);
  
  const handleUserSetup = (userData: User) => {
    setUser(userData);
  };
  
  const handleDataChange = () => {
    const userData = getUserData();
    setUser(userData);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-white mt-4">Loading Budget Buddy...</p>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Onboarding onComplete={handleUserSetup} />;
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} />
      
      <main className="flex-grow">
        <Dashboard user={user} onDataChange={handleDataChange} />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;