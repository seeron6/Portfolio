import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Era } from '../types';
import { X, Trophy, Check, Brain, Lock, RefreshCw } from 'lucide-react';
import { playRetroGame } from '../services/geminiService';

interface GameOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentEra: Era;
}

const CHARACTERS = ["Drake", "Vijay", "Neymar"];
const WORDLE_WORDS = ["ORTHO", "ROBOT", "SMART", "TECHY"];

const GameOverlay: React.FC<GameOverlayProps> = ({ isOpen, onClose, currentEra }) => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost' | 'hacked'>('start');
  
  // Retro Game State
  const [retroSecret, setRetroSecret] = useState('');
  const [retroChat, setRetroChat] = useState<{sender: 'user'|'bot', text: string}[]>([]);
  const [retroInput, setRetroInput] = useState('');
  const [retroLoading, setRetroLoading] = useState(false);

  // Modern Game State (Code Breaker)
  const [codeSecret, setCodeSecret] = useState<number[]>([]);
  const [codeAttempts, setCodeAttempts] = useState<{guess: number[], exact: number, partial: number}[]>([]);
  const [currentCodeGuess, setCurrentCodeGuess] = useState<number[]>([]);
  const [codeAttemptCount, setCodeAttemptCount] = useState(0);
  const MAX_ATTEMPTS = 8;

  // Future Game State (Wordle)
  const [targetWord, setTargetWord] = useState('');
  const [wordleGuesses, setWordleGuesses] = useState<string[]>([]);
  const [currentWordleInput, setCurrentWordleInput] = useState('');

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setGameState('start');
      setRetroChat([]);
      setCodeAttempts([]);
      setCurrentCodeGuess([]);
      setCodeAttemptCount(0);
      setWordleGuesses([]);
      setCurrentWordleInput('');
    }
  }, [isOpen, currentEra]);

  // Hacked Effect Timer
  useEffect(() => {
    if (gameState === 'hacked') {
      const timer = setTimeout(() => {
        setGameState('start'); // Go back to start, or show a "just kidding" screen
        alert("JUST KIDDING... but that was close.");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // --- Retro Logic ---
  const startRetroGame = async () => {
    const secret = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    setRetroSecret(secret);
    setGameState('playing');
    setRetroLoading(true);
    const initialAiResponse = await playRetroGame(
      "Start the game! Introduce yourself as a male fairy. Tell me you are thinking of a famous person (a legend). Don't say who it is.", 
      secret, 
      []
    );
    setRetroChat([{ sender: 'bot', text: initialAiResponse }]);
    setRetroLoading(false);
  };

  const handleRetroSend = async () => {
    if (!retroInput.trim() || retroLoading) return;
    const userMsg = retroInput;
    setRetroInput('');
    const newHistory = [...retroChat, { sender: 'user' as const, text: userMsg }];
    setRetroChat(newHistory);
    setRetroLoading(true);

    const botMsg = await playRetroGame(userMsg, retroSecret, newHistory.map(m => `${m.sender}: ${m.text}`));
    setRetroChat([...newHistory, { sender: 'bot', text: botMsg }]);
    setRetroLoading(false);

    if (botMsg.toLowerCase().includes("congrat") || botMsg.toLowerCase().includes("win")) {
      setGameState('won');
    }
  };

  // --- Modern Logic (Code Breaker) ---
  const startModernGame = () => {
    const secret = Array.from({length: 4}, () => Math.floor(Math.random() * 10)); // 0-9
    setCodeSecret(secret);
    setCodeAttempts([]);
    setCurrentCodeGuess([]);
    setCodeAttemptCount(0);
    setGameState('playing');
  };

  const handleCodeInput = (num: number) => {
    if (currentCodeGuess.length < 4) {
      setCurrentCodeGuess([...currentCodeGuess, num]);
    }
  };

  const deleteCodeInput = () => {
    setCurrentCodeGuess(currentCodeGuess.slice(0, -1));
  };

  const submitCodeGuess = () => {
    if (currentCodeGuess.length !== 4) return;

    // Calculate feedback
    let exact = 0;
    let partial = 0;
    const tempSecret = [...codeSecret];
    const tempGuess = [...currentCodeGuess];

    // Check exact matches first
    for (let i = 0; i < 4; i++) {
      if (tempGuess[i] === tempSecret[i]) {
        exact++;
        tempSecret[i] = -1; // Mark as used
        tempGuess[i] = -2; // Mark as processed
      }
    }

    // Check partial matches
    for (let i = 0; i < 4; i++) {
      if (tempGuess[i] >= 0) { // If not processed
        const idx = tempSecret.indexOf(tempGuess[i]);
        if (idx !== -1) {
          partial++;
          tempSecret[idx] = -1; // Mark used
        }
      }
    }

    const newAttempt = { guess: currentCodeGuess, exact, partial };
    const newAttempts = [...codeAttempts, newAttempt];
    setCodeAttempts(newAttempts);
    setCurrentCodeGuess([]);
    setCodeAttemptCount(prev => prev + 1);

    if (exact === 4) {
      setGameState('won');
    } else if (newAttempts.length >= MAX_ATTEMPTS) {
      setGameState('hacked');
    }
  };

  // Keyboard listener for Modern Game
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || currentEra !== Era.MODERN || gameState !== 'playing') return;

      if (e.key >= '0' && e.key <= '9') {
        handleCodeInput(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        deleteCodeInput();
      } else if (e.key === 'Enter') {
        submitCodeGuess();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentEra, gameState, currentCodeGuess, codeSecret, codeAttempts]); // Re-bind when state changes to capture correct closure

  // --- Future Logic (Wordle) ---
  const startFutureGame = () => {
    const word = WORDLE_WORDS[Math.floor(Math.random() * WORDLE_WORDS.length)];
    setTargetWord(word);
    setWordleGuesses([]);
    setCurrentWordleInput('');
    setGameState('playing');
  };

  const handleWordleKey = (key: string) => {
    if (key === 'ENTER') {
      if (currentWordleInput.length !== 5) return;
      if (!WORDLE_WORDS.includes(currentWordleInput) && currentWordleInput !== targetWord) {
         // In a real app we'd validate against a dictionary, but for this mini game assume valid
      }
      const newGuesses = [...wordleGuesses, currentWordleInput];
      setWordleGuesses(newGuesses);
      setCurrentWordleInput('');

      if (currentWordleInput === targetWord) {
        setGameState('won');
      } else if (newGuesses.length >= 6) {
        setGameState('lost');
      }
    } else if (key === 'BACK') {
      setCurrentWordleInput(prev => prev.slice(0, -1));
    } else {
      if (currentWordleInput.length < 5) {
        setCurrentWordleInput(prev => prev + key);
      }
    }
  };

  const getLetterStatus = (letter: string, index: number) => {
    if (targetWord[index] === letter) return 'bg-green-500 border-green-500';
    if (targetWord.includes(letter)) return 'bg-yellow-500 border-yellow-500 text-black';
    return 'bg-zinc-700 border-zinc-700';
  };

  // --- Renderers ---

  const renderRetroContent = () => (
    <div className="flex flex-col h-full font-[VT323] text-xl">
       <div className="bg-pink-600 text-white p-2 text-center border-b-4 border-yellow-400">
         <h2 className="text-2xl">FAIRY GUESSING GAME</h2>
       </div>
       
       {gameState === 'start' && (
         <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#5D4037] text-white">
           <p className="mb-4 text-2xl">I'm thinking of a famous legend.</p>
           <p className="mb-6">Ask me Yes/No questions to guess who!</p>
           <button onClick={startRetroGame} className="px-6 py-2 bg-green-500 border-4 border-green-800 rounded hover:scale-105 transition-transform text-white">Start Game</button>
         </div>
       )}

       {gameState === 'playing' && (
         <div className="flex-1 flex flex-col bg-white overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-purple-100">
              {retroChat.map((msg, i) => (
                <div key={i} className={`p-2 rounded max-w-[80%] ${msg.sender === 'user' ? 'ml-auto bg-blue-200 text-blue-900' : 'bg-pink-200 text-pink-900'}`}>
                  {msg.text}
                </div>
              ))}
              {retroLoading && <div className="text-gray-500 text-sm italic">*Poof* Thinking...</div>}
            </div>
            <div className="p-2 bg-gray-200 flex gap-2">
              <input 
                className="flex-1 p-2 border-2 border-gray-400 rounded font-sans text-base"
                value={retroInput}
                onChange={(e) => setRetroInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleRetroSend()}
                placeholder="Ask a question..."
              />
              <button onClick={handleRetroSend} className="bg-pink-500 text-white px-4 rounded border-2 border-pink-700">Send</button>
            </div>
         </div>
       )}

       {gameState === 'won' && (
         <div className="flex-1 flex flex-col items-center justify-center bg-yellow-200 text-yellow-800 text-center p-8">
            <Trophy size={64} className="mb-4 text-yellow-600" />
            <h2 className="text-4xl mb-2">YOU WIN!</h2>
            <p>The magic word was revealed!</p>
         </div>
       )}
    </div>
  );

  const renderModernContent = () => (
    <div className="flex flex-col h-full font-mono text-slate-200 bg-zinc-900 relative">
      <div className="bg-zinc-800 p-3 border-b border-zinc-700 flex justify-between items-center">
        <h2 className="uppercase tracking-widest font-bold text-emerald-500">CODE BREAKER</h2>
        <div className="text-sm text-red-400">Attempts: {MAX_ATTEMPTS - codeAttemptCount}</div>
      </div>

      {gameState === 'start' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <Lock size={48} className="text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-white">Crack the Code</h3>
          <p className="mb-6 max-w-md text-sm text-zinc-400">Guess the 4-digit code. Green circle means correct number & place. Yellow circle means correct number but wrong place.</p>
          <button onClick={startModernGame} className="px-8 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded transition-colors">START HACK</button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col p-4">
           {/* Attempts History */}
           <div className="flex-1 overflow-y-auto mb-4 bg-black/30 rounded border border-zinc-800 p-2 space-y-2">
              {codeAttempts.map((attempt, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-zinc-800/50 rounded">
                   <div className="flex gap-2 font-bold text-lg tracking-widest">
                     {attempt.guess.join(' ')}
                   </div>
                   <div className="flex gap-1 text-xs">
                     <span className="text-green-500">{attempt.exact} Correct</span>
                     <span className="text-zinc-500">|</span>
                     <span className="text-yellow-500">{attempt.partial} Close</span>
                   </div>
                </div>
              ))}
           </div>

           {/* Input Area */}
           <div className="flex justify-center gap-4 mb-4 text-3xl font-bold text-white tracking-[1em] h-10">
             {currentCodeGuess.join('')}<span className="animate-pulse text-emerald-500">_</span>
           </div>

           <div className="grid grid-cols-5 gap-2">
             {[0,1,2,3,4,5,6,7,8,9].map((num) => (
               <button 
                 key={num}
                 onClick={() => handleCodeInput(num)}
                 className="py-3 bg-zinc-800 hover:bg-zinc-700 rounded text-xl font-bold border border-zinc-700"
               >
                 {num}
               </button>
             ))}
             <button onClick={deleteCodeInput} className="col-span-2 bg-red-900/50 text-red-300 rounded hover:bg-red-900 border border-red-900">DEL</button>
             <button onClick={submitCodeGuess} className="col-span-3 bg-emerald-700 text-white rounded hover:bg-emerald-600 font-bold border border-emerald-500">ENTER</button>
           </div>
        </div>
      )}

      {gameState === 'won' && (
        <div className="flex-1 flex flex-col items-center justify-center bg-emerald-900/20 text-emerald-400">
           <Check size={64} className="mb-4" />
           <h2 className="text-3xl font-bold uppercase">ACCESS GRANTED</h2>
           <div className="mt-4 text-xl tracking-widest text-white">{codeSecret.join(' ')}</div>
        </div>
      )}
    </div>
  );

  const renderFutureContent = () => (
    <div className="flex flex-col h-full font-[Orbitron] text-cyan-400 bg-black border border-cyan-500/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
      
      <div className="p-4 border-b border-cyan-500/50 flex justify-between items-center">
         <span className="flex items-center gap-2"><Brain size={20} /> PASSWORD_DECRYPT</span>
         <span className="text-xs text-cyan-700">ATTEMPTS: {wordleGuesses.length}/6</span>
      </div>

      {gameState === 'start' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center z-10">
          <p className="text-cyan-600 mb-6 text-sm">DECRYPT THE 5-LETTER PASSWORD RELATED TO SEERON'S TECH STACK.</p>
          <button onClick={startFutureGame} className="w-full max-w-xs bg-cyan-900/50 hover:bg-cyan-700/50 border border-cyan-500 p-4 text-cyan-200 tracking-widest transition-colors">
            INITIATE
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col items-center justify-start p-4 z-10">
           <div className="space-y-1 mb-4">
              {/* Previous Guesses */}
              {wordleGuesses.map((guess, i) => (
                <div key={i} className="flex gap-1">
                  {guess.split('').map((char, j) => (
                    <div key={j} className={`w-10 h-10 md:w-12 md:h-12 border flex items-center justify-center font-bold text-lg md:text-xl text-white ${getLetterStatus(char, j)}`}>
                      {char}
                    </div>
                  ))}
                </div>
              ))}
              {/* Current Input */}
              {wordleGuesses.length < 6 && (
                <div className="flex gap-1">
                  {[0,1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 md:w-12 md:h-12 border border-zinc-700 flex items-center justify-center font-bold text-lg md:text-xl text-white bg-black/50">
                      {currentWordleInput[i] || ''}
                    </div>
                  ))}
                </div>
              )}
           </div>

           {/* Keyboard */}
           <div className="mt-auto w-full max-w-lg">
             {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, i) => (
               <div key={i} className="flex justify-center gap-1 mb-1">
                 {row.split('').map((char) => (
                   <button 
                    key={char} 
                    onClick={() => handleWordleKey(char)}
                    className="w-8 h-10 md:w-10 md:h-12 bg-zinc-800 text-white rounded text-xs md:text-sm font-bold hover:bg-cyan-900 border border-zinc-700"
                   >
                     {char}
                   </button>
                 ))}
                 {i === 2 && (
                   <>
                     <button onClick={() => handleWordleKey('BACK')} className="px-2 h-10 md:h-12 bg-zinc-800 text-red-400 border border-red-900 rounded">←</button>
                     <button onClick={() => handleWordleKey('ENTER')} className="px-2 h-10 md:h-12 bg-cyan-800 text-white border border-cyan-600 rounded">↵</button>
                   </>
                 )}
               </div>
             ))}
           </div>
        </div>
      )}

      {gameState === 'won' && (
        <div className="flex-1 flex flex-col items-center justify-center z-10 space-y-4">
           <Trophy size={64} className="text-yellow-400" />
           <h2 className="text-3xl text-white">DECRYPTED</h2>
           <p className="text-cyan-500">PASSWORD: {targetWord}</p>
        </div>
      )}
      
      {gameState === 'lost' && (
        <div className="flex-1 flex flex-col items-center justify-center z-10 space-y-4">
           <X size={64} className="text-red-500" />
           <h2 className="text-2xl text-red-500">FAILED</h2>
           <p className="text-zinc-500">PASSWORD WAS: {targetWord}</p>
           <button onClick={() => setGameState('start')} className="mt-4 p-2 border border-cyan-500 text-cyan-500 rounded hover:bg-cyan-900/20"><RefreshCw/></button>
        </div>
      )}
    </div>
  );

  return (
    // @ts-ignore
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          {/* Hacked Overlay */}
          {gameState === 'hacked' && (
             <div className="fixed inset-0 z-[70] bg-black flex flex-col items-center justify-center overflow-hidden font-mono">
                <div className="text-red-600 text-6xl font-bold animate-pulse mb-4">SYSTEM COMPROMISED</div>
                <div className="text-red-500 text-xl overflow-hidden h-96 w-full text-center opacity-50 break-all">
                  {Array.from({length: 2000}).map(() => String.fromCharCode(33 + Math.floor(Math.random() * 94))).join('')}
                </div>
             </div>
          )}

          <motion.div 
            className="w-full max-w-2xl h-[650px] relative shadow-2xl overflow-hidden rounded-xl bg-gray-900"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
          >
             {/* Close Button */}
             <button 
               onClick={onClose}
               className="absolute top-2 right-2 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-red-500 transition-colors"
             >
               <X size={24} />
             </button>

             {/* Game Content Switcher */}
             <div className="w-full h-full">
                {currentEra === Era.RETRO && renderRetroContent()}
                {currentEra === Era.MODERN && renderModernContent()}
                {currentEra === Era.FUTURE && renderFutureContent()}
             </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GameOverlay;