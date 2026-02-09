import React from 'react';
import { HelpCircle, BarChart2, Settings } from 'lucide-react';

const Header = ({ onHelpClick, onStatsClick, onSettingsClick }) => {
  return (
    <header className="w-full border-b border-[#3a3a3c] px-4">
      <div className="flex items-center justify-between h-[50px] max-w-[500px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={onHelpClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Help"
          >
            <HelpCircle size={24} />
          </button>
        </div>
        
        <h1 className="text-[32px] font-bold text-white tracking-[0.1em] font-serif">
          Because One Puzzle a Day Is Never Enough
        </h1>
        
        <div className="flex items-center gap-4">
          <button
            onClick={onStatsClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Statistics"
          >
            <BarChart2 size={24} />
          </button>
          <button
            onClick={onSettingsClick}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Settings"
          >
            <Settings size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
