import React from 'react';

const GameBoard = ({ guesses, currentGuess, targetWord, currentRow }) => {
  const getLetterStatus = (letter, index, word) => {
    if (!targetWord) return '';
    
    const upperLetter = letter.toUpperCase();
    const upperTarget = targetWord.toUpperCase();
    
    if (upperTarget[index] === upperLetter) {
      return 'correct';
    } else if (upperTarget.includes(upperLetter)) {
      // Check if this letter appears more times in guess than in target
      const targetCount = upperTarget.split('').filter(l => l === upperLetter).length;
      const guessCount = word.toUpperCase().slice(0, index + 1).split('').filter(l => l === upperLetter).length;
      const correctCount = word.toUpperCase().split('').filter((l, i) => l === upperLetter && upperTarget[i] === upperLetter).length;
      
      if (guessCount <= targetCount - correctCount + word.toUpperCase().slice(0, index + 1).split('').filter((l, i) => l === upperLetter && upperTarget[i] === upperLetter).length) {
        return 'present';
      }
      return 'absent';
    }
    return 'absent';
  };

  const rows = [];
  
  for (let i = 0; i < 6; i++) {
    const cells = [];
    
    for (let j = 0; j < 5; j++) {
      let letter = '';
      let status = '';
      let isCurrentRow = i === currentRow;
      let hasLetter = false;
      let isRevealing = false;
      
      if (i < guesses.length) {
        // Completed guess
        letter = guesses[i][j] || '';
        status = getLetterStatus(letter, j, guesses[i]);
        isRevealing = true;
        hasLetter = true;
      } else if (i === currentRow && currentGuess) {
        // Current guess being typed
        letter = currentGuess[j] || '';
        hasLetter = !!letter;
      }
      
      cells.push(
        <div
          key={j}
          className={`
            w-[62px] h-[62px] border-2 flex items-center justify-center
            text-[32px] font-bold uppercase select-none
            transition-all duration-100
            ${!hasLetter && !isRevealing ? 'border-[#3a3a3c] bg-transparent' : ''}
            ${hasLetter && !isRevealing ? 'border-[#565758] bg-transparent text-white animate-pop' : ''}
            ${status === 'correct' ? 'bg-[#538d4e] border-[#538d4e] text-white' : ''}
            ${status === 'present' ? 'bg-[#b59f3b] border-[#b59f3b] text-white' : ''}
            ${status === 'absent' ? 'bg-[#3a3a3c] border-[#3a3a3c] text-white' : ''}
          `}
          style={{
            animationDelay: isRevealing ? `${j * 300}ms` : '0ms',
          }}
        >
          {letter}
        </div>
      );
    }
    
    rows.push(
      <div key={i} className="flex gap-[5px]">
        {cells}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[5px] items-center">
      {rows}
    </div>
  );
};

export default GameBoard;
