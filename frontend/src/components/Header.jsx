import React from 'react';
import { HelpCircle, BarChart2, Settings } from 'lucide-react';

const Header = ({ onHelpClick, onStatsClick, onSettingsClick }) => {
  return (
    <header className="w-full border-b border-[#3a3a3c] px-4">
      <div className="flex items-center justify-between h-[44px] sm:h-[60px] max-w-[400px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onHelpClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Help"
          >
            <HelpCircle size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>
        
        <h1 className="text-[14px] sm:text-[16px] font-bold text-white tracking-[0.1em] font-serif">
          Free Wordle Training Mode
        </h1>
      
        <div className="flex items-center gap-4">
          <button
            onClick={onStatsClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Statistics"
          >
            <BarChart2 size={22} className="sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={onSettingsClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Settings"
          >
            <Settings size={22} className="sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
