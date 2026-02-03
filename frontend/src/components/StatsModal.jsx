import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const StatsModal = ({ isOpen, onClose, stats, gameState, targetWord }) => {
  const { gamesPlayed, gamesWon, currentStreak, maxStreak, guessDistribution } = stats;
  
  const winPercentage = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  const maxGuesses = Math.max(...Object.values(guessDistribution), 1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#121213] border-[#3a3a3c] text-white max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[16px] font-bold tracking-wide">STATISTICS</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {/* Stats Row */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="text-center">
              <div className="text-[36px] font-light">{gamesPlayed}</div>
              <div className="text-[12px] text-gray-400">Played</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-light">{winPercentage}</div>
              <div className="text-[12px] text-gray-400">Win %</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-light">{currentStreak}</div>
              <div className="text-[12px] text-gray-400">Current Streak</div>
            </div>
            <div className="text-center">
              <div className="text-[36px] font-light">{maxStreak}</div>
              <div className="text-[12px] text-gray-400">Max Streak</div>
            </div>
          </div>
          
          {/* Guess Distribution */}
          <div className="mb-6">
            <h3 className="text-[14px] font-bold mb-3 tracking-wide">GUESS DISTRIBUTION</h3>
            <div className="space-y-1">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num} className="flex items-center gap-2">
                  <span className="text-[14px] w-3">{num}</span>
                  <div
                    className={`
                      h-5 flex items-center justify-end px-2 text-[14px] font-bold
                      ${guessDistribution[num] > 0 ? 'bg-[#538d4e]' : 'bg-[#3a3a3c]'}
                    `}
                    style={{
                      width: `${Math.max((guessDistribution[num] / maxGuesses) * 100, 7)}%`,
                      minWidth: '20px'
                    }}
                  >
                    {guessDistribution[num]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Game Result Message */}
          {gameState !== 'playing' && (
            <div className="border-t border-[#3a3a3c] pt-4">
              {gameState === 'won' ? (
                <p className="text-center text-[18px] font-bold text-[#538d4e]">
                  🎉 Congratulations!
                </p>
              ) : (
                <p className="text-center text-[16px]">
                  The word was: <span className="font-bold text-[#b59f3b]">{targetWord}</span>
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatsModal;
