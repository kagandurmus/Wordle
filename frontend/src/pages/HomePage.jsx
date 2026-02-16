import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import GameBoard from '../components/GameBoard';
import Keyboard from '../components/Keyboard';
import HelpModal from '../components/HelpModal';
import StatsModal from '../components/StatsModal';
import SettingsModal from '../components/SettingsModal';
import Toast from '../components/Toast';
import { getRandomWord, isValidWord } from '../data/mock';


const STATS_KEY = 'wordle-stats';


const getInitialStats = () => {
  const saved = localStorage.getItem(STATS_KEY);
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
  };
};


const HomePage = () => {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [letterStatuses, setLetterStatuses] = useState({});
  const [showHelp, setShowHelp] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [stats, setStats] = useState(getInitialStats);
  const [settings, setSettings] = useState({
    hardMode: false,
    darkTheme: true,
    highContrast: false
  });
  const [toast, setToast] = useState({ message: '', visible: false });
  const [gameNumber, setGameNumber] = useState(1);


  // Initialize game with random word
  const startNewGame = useCallback(() => {
    const word = getRandomWord();
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setLetterStatuses({});
  }, []);


  // Initialize first game
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);


  // Save stats
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);


  const showToast = (message, duration = 1500) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, duration);
  };


  const updateLetterStatuses = (allGuesses, target) => {
    const newStatuses = {};
    
    allGuesses.forEach(guess => {
      guess.split('').forEach((letter, i) => {
        const upperLetter = letter.toUpperCase();
        const upperTarget = target.toUpperCase();
        
        if (upperTarget[i] === upperLetter) {
          newStatuses[upperLetter] = 'correct';
        } else if (upperTarget.includes(upperLetter)) {
          if (newStatuses[upperLetter] !== 'correct') {
            newStatuses[upperLetter] = 'present';
          }
        } else {
          if (!newStatuses[upperLetter]) {
            newStatuses[upperLetter] = 'absent';
          }
        }
      });
    });
    
    setLetterStatuses(newStatuses);
  };


  const handleKeyPress = useCallback((key) => {
    if (gameState !== 'playing') return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        showToast('Not enough letters');
        return;
      }
      
      if (!isValidWord(currentGuess)) {
        showToast('Not in word list');
        return;
      }
      
      const newGuesses = [...guesses, currentGuess.toUpperCase()];
      setGuesses(newGuesses);
      updateLetterStatuses(newGuesses, targetWord);
      setCurrentGuess('');
      
      // Check win/lose
      if (currentGuess.toUpperCase() === targetWord.toUpperCase()) {
        setGameState('won');
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          gamesWon: stats.gamesWon + 1,
          currentStreak: stats.currentStreak + 1,
          maxStreak: Math.max(stats.maxStreak, stats.currentStreak + 1),
          guessDistribution: {
            ...stats.guessDistribution,
            [newGuesses.length]: stats.guessDistribution[newGuesses.length] + 1
          }
        };
        setStats(newStats);
        showToast('🎉 Correct! Starting new game...', 2000);
        // Start new game after a short delay
        setTimeout(() => {
          setGameNumber(prev => prev + 1);
          startNewGame();
        }, 2500);
      } else if (newGuesses.length >= 6) {
        setGameState('lost');
        const newStats = {
          ...stats,
          gamesPlayed: stats.gamesPlayed + 1,
          currentStreak: 0
        };
        setStats(newStats);
        showToast(`The word was: ${targetWord}`, 3000);
        // Start new game after showing the answer
        setTimeout(() => {
          setGameNumber(prev => prev + 1);
          startNewGame();
        }, 3500);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(prev => prev + key);
    }
  }, [currentGuess, guesses, gameState, targetWord, stats, startNewGame]);


  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.metaKey || e.ctrlKey) return;
      
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('BACKSPACE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);


  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className={`min-h-screen bg-[#121213] flex flex-col ${settings.highContrast ? 'high-contrast' : ''}`}>
      <Header
        onHelpClick={() => setShowHelp(true)}
        onStatsClick={() => setShowStats(true)}
        onSettingsClick={() => setShowSettings(true)}
      />
      
      <main className="flex-1 flex flex-col items-center justify-center gap-2 sm:gap-4 px-2 pb-2 sm:pb-4">
        <GameBoard
          guesses={guesses}
          currentGuess={currentGuess}
          targetWord={targetWord}
          currentRow={guesses.length}
        />
        
        <Keyboard
          onKeyPress={handleKeyPress}
          letterStatuses={letterStatuses}
        />
      </main>

      
      <Toast message={toast.message} isVisible={toast.visible} />
      
      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />
      
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        stats={stats}
        gameState={gameState}
        targetWord={targetWord}
      />
      
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default HomePage;
