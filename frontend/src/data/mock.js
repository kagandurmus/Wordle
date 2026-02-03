// Word list imports
import { ANSWERS, ALLOWED_GUESSES } from './wordLists';

// Combine answers and allowed guesses for validation
const ALL_VALID_WORDS = [...new Set([...ANSWERS, ...ALLOWED_GUESSES])];

// Get a random word from the answer list
export const getRandomWord = () => {
  const randomIndex = Math.floor(Math.random() * ANSWERS.length);
  return ANSWERS[randomIndex];
};

// Get today's word (based on date for daily consistency)
export const getTodaysWord = () => {
  const startDate = new Date('2024-01-01');
  const today = new Date();
  const diffTime = Math.abs(today - startDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return ANSWERS[diffDays % ANSWERS.length];
};

// Check if a word is valid (can be guessed)
export const isValidWord = (word) => {
  return ALL_VALID_WORDS.includes(word.toUpperCase());
};

// Export word lists for reference
export { ANSWERS, ALLOWED_GUESSES };
