import React from 'react';
import { Era } from '../types';
import { Tv, Monitor, Cpu } from 'lucide-react';

interface NavigationProps {
  currentEra: Era;
  onEraChange: (era: Era) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentEra, onEraChange }) => {
  return (
    <div className="flex gap-4 bg-black/60 backdrop-blur-md p-3 rounded-full border border-white/10 shadow-xl transform transition-all hover:scale-105">
      <button
        onClick={() => onEraChange(Era.RETRO)}
        className={`p-3 rounded-full transition-all duration-300 ${
          currentEra === Era.RETRO ? 'bg-pink-500 text-white shadow-[0_0_15px_#ec4899]' : 'text-gray-400 hover:text-white'
        }`}
        title="Retro Era"
      >
        <Tv size={20} />
      </button>
      <button
        onClick={() => onEraChange(Era.MODERN)}
        className={`p-3 rounded-full transition-all duration-300 ${
          currentEra === Era.MODERN ? 'bg-emerald-600 text-white shadow-[0_0_15px_#059669]' : 'text-gray-400 hover:text-white'
        }`}
        title="Modern Era"
      >
        <Monitor size={20} />
      </button>
      <button
        onClick={() => onEraChange(Era.FUTURE)}
        className={`p-3 rounded-full transition-all duration-300 ${
          currentEra === Era.FUTURE ? 'bg-cyan-600 text-white shadow-[0_0_15px_#0891b2]' : 'text-gray-400 hover:text-white'
        }`}
        title="Future Era"
      >
        <Cpu size={20} />
      </button>
    </div>
  );
};

export default Navigation;