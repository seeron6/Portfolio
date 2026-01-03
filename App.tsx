import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Era } from './types';
import { RESUME_DATA } from './constants';
import RetroScene from './components/RetroScene';
import ModernScene from './components/ModernScene';
import FutureScene from './components/FutureScene';
import Navigation from './components/Navigation';
import ChatInterface from './components/ChatInterface';
import GameOverlay from './components/GameOverlay';
import { Gamepad2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentEra, setCurrentEra] = useState<Era>(Era.RETRO);
  const [isGameOpen, setIsGameOpen] = useState(false);

  const handleEraChange = (era: Era) => {
    if (era !== currentEra) {
      setCurrentEra(era);
      setIsGameOpen(false); // Close game on era switch
    }
  };

  const renderScene = () => {
    switch (currentEra) {
      case Era.RETRO:
        return <RetroScene key="retro" />;
      case Era.MODERN:
        return <ModernScene key="modern" />;
      case Era.FUTURE:
        return <FutureScene key="future" />;
      default:
        return null;
    }
  };

  const getGameButtonStyle = () => {
    switch(currentEra) {
      case Era.RETRO: return "bg-pink-500 border-b-4 border-pink-800 font-[VT323] text-xl hover:translate-y-1 hover:border-b-0 shadow-lg";
      case Era.MODERN: return "bg-emerald-700 border border-emerald-500 font-sans tracking-widest hover:bg-emerald-600 shadow-md";
      case Era.FUTURE: return "bg-cyan-900/50 border border-cyan-400 font-[Orbitron] shadow-[0_0_10px_cyan] hover:bg-cyan-800";
    }
  };

  return (
    <div className={`relative w-full h-screen overflow-hidden ${currentEra === Era.RETRO ? 'retro-cursor' : ''}`}>
      {/* Main Scene Container with Slide Transition */}
      {/* @ts-ignore */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentEra}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full absolute inset-0"
        >
          {renderScene()}
        </motion.div>
      </AnimatePresence>

      {/* FIXED UI LAYER */}
      
      {/* 1. Navigation (Bottom Center) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
         <Navigation currentEra={currentEra} onEraChange={handleEraChange} />
      </div>

      {/* 2. Games Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-50">
        <button 
          onClick={() => setIsGameOpen(true)}
          className={`px-4 py-3 rounded-lg text-white transition-all flex items-center gap-2 ${getGameButtonStyle()}`}
        >
          <Gamepad2 size={24} />
          <span className="hidden md:inline">PLAY GAME</span>
        </button>
      </div>

      {/* 3. Chat Interface (Bottom Right - Self Positioned) */}
      <ChatInterface currentEra={currentEra} />

      {/* 4. Contact Footer (Bottom - Full Width Background) */}
      <div className={`fixed bottom-0 w-full p-2 text-center text-[10px] md:text-sm font-bold z-30 tracking-wide pointer-events-none
        ${currentEra === Era.RETRO ? 'text-pink-600 font-[VT323] bg-amber-100/10' : ''}
        ${currentEra === Era.MODERN ? 'text-slate-400 font-sans bg-black/60' : ''}
        ${currentEra === Era.FUTURE ? 'text-cyan-600 font-mono bg-black/80 border-t border-cyan-900/30' : ''}
      `}>
         <div className="pointer-events-auto pb-20 md:pb-0"> {/* Padding bottom on mobile to clear nav */}
           <span className="mr-4 hidden md:inline">📞 {RESUME_DATA.header.contact.phone}</span>
           <span className="mr-4">✉️ {RESUME_DATA.header.contact.email}</span>
           <span className="inline-block">
              <a href={`https://${RESUME_DATA.header.contact.linkedin}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-white mr-4">LinkedIn</a> 
              <a href={`https://${RESUME_DATA.header.contact.github}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-white">GitHub</a>
           </span>
         </div>
      </div>

      {/* Game Overlay Modal */}
      <GameOverlay isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} currentEra={currentEra} />
    </div>
  );
};

export default App;