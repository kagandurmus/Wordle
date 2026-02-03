import React from 'react';
import { X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

const HelpModal = ({ isOpen, onClose }) => {
  const ExampleRow = ({ word, statuses, description }) => (
    <div className="mb-4">
      <div className="flex gap-1 mb-2">
        {word.split('').map((letter, i) => (
          <div
            key={i}
            className={`
              w-10 h-10 flex items-center justify-center
              text-[20px] font-bold uppercase border-2
              ${statuses[i] === 'correct' ? 'bg-[#538d4e] border-[#538d4e] text-white' : ''}
              ${statuses[i] === 'present' ? 'bg-[#b59f3b] border-[#b59f3b] text-white' : ''}
              ${statuses[i] === 'absent' ? 'bg-transparent border-[#3a3a3c] text-white' : ''}
              ${statuses[i] === 'empty' ? 'bg-transparent border-[#3a3a3c] text-white' : ''}
            `}
          >
            {letter}
          </div>
        ))}
      </div>
      <p className="text-[14px] text-gray-300">{description}</p>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#121213] border-[#3a3a3c] text-white max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-[18px] font-bold">HOW TO PLAY</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-[15px] mb-4">Guess the Wordle in 6 tries.</p>
          
          <ul className="list-disc pl-5 mb-6 text-[15px] space-y-2">
            <li>Each guess must be a valid 5-letter word.</li>
            <li>The color of the tiles will change to show how close your guess was to the word.</li>
          </ul>
          
          <div className="border-t border-[#3a3a3c] pt-4 mb-4">
            <p className="font-bold mb-4 text-[14px]">Examples</p>
            
            <ExampleRow
              word="WEARY"
              statuses={['correct', 'empty', 'empty', 'empty', 'empty']}
              description="W is in the word and in the correct spot."
            />
            
            <ExampleRow
              word="PILLS"
              statuses={['empty', 'present', 'empty', 'empty', 'empty']}
              description="I is in the word but in the wrong spot."
            />
            
            <ExampleRow
              word="VAGUE"
              statuses={['empty', 'empty', 'empty', 'absent', 'empty']}
              description="U is not in the word in any spot."
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpModal;
