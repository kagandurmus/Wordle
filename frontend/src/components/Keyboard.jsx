import React from 'react';
import { Delete } from 'lucide-react';

const Keyboard = ({ onKeyPress, letterStatuses }) => {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];

  const getKeyStyle = (key) => {
    const status = letterStatuses[key];
    
    if (status === 'correct') {
      return 'bg-[#538d4e] text-white hover:bg-[#538d4e]';
    } else if (status === 'present') {
      return 'bg-[#b59f3b] text-white hover:bg-[#b59f3b]';
    } else if (status === 'absent') {
      return 'bg-[#3a3a3c] text-white hover:bg-[#3a3a3c]';
    }
    return 'bg-[#818384] text-white hover:bg-[#a0a1a2]';
  };


  return (
    <div className="flex flex-col gap-2 items-center w-full max-w-[500px] px-2">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[6px] justify-center w-full">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`
                ${key === 'ENTER' || key === 'BACKSPACE' 
                  ? 'flex-[1.5] min-w-0 max-w-[65px] px-1 text-[11px] xs:text-[13px]' 
                  : 'flex-1 min-w-0 max-w-[43px]'
                }
                h-[58px] sm:h-[58px] xs:h-[52px] rounded-[4px] font-bold text-[13px] xs:text-[12px]
                flex items-center justify-center
                transition-colors duration-100
                select-none cursor-pointer
                ${getKeyStyle(key)}
              `}
            >
              {key === 'BACKSPACE' ? <Delete size={20} className="xs:w-[18px] xs:h-[18px]" /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
