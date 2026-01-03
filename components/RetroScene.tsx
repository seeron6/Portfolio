import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';

const QUOTES = [
  "It works on my machine.",
  "There is no cloud, just other people's computers.",
  "Weeks of coding can save you hours of planning.",
  "First, solve the problem. Then, write the code.",
  "A good engineer thinks in reverse.",
  "Magic is just science we don't understand yet.",
  "Debugging: Being the detective in a crime movie where you are also the murderer.",
  "The best error message is the one that never shows up.",
  "Keep calm and restart the server.",
  "Measure twice, cut once. Compile zero times.",
  "I wish for clean code!",
  "Semicolons hide like ninjas.",
  "Simplicity is the soul of efficiency.",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Experience is the name everyone gives to their mistakes.",
  "If at first you don't succeed, call it version 1.0.",
  "Real programmers count from 0.",
  "Make it work, make it right, make it fast.",
  "Software and cathedrals are much the same – first we build them, then we pray.",
  "Java is to JavaScript what car is to Carpet."
];

const RetroScene: React.FC = () => {
  const [channel, setChannel] = useState(0); // 0: Profile, 1: Exp, 2: Projects, 3: Skills
  const [rotation, setRotation] = useState(0);
  const [isStatic, setIsStatic] = useState(false);
  const [isRulesFlipped, setIsRulesFlipped] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const rotateKnob = () => {
    const newRotation = rotation + 90;
    setRotation(newRotation);
    setIsStatic(true);
    setTimeout(() => {
      setChannel((prev) => (prev + 1) % 4);
      setIsStatic(false);
    }, 500);
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If we are about to flip to the back (opening the book), pick a new quote
    if (!isRulesFlipped) {
      const randomIndex = Math.floor(Math.random() * QUOTES.length);
      setCurrentQuote(QUOTES[randomIndex]);
    }
    setIsRulesFlipped(!isRulesFlipped);
  };

  const getChannelName = (idx: number) => {
    switch(idx) {
      case 0: return "PROFILE";
      case 1: return "CAREER";
      case 2: return "PROJECTS";
      case 3: return "SKILLS";
      default: return "";
    }
  }

  return (
    <div className="w-full h-full bg-[#5D4037] flex items-center justify-center relative overflow-hidden font-[VT323] perspective-[1500px]">
      {/* Show Title */}
      <div className="absolute top-4 md:top-8 left-0 right-0 text-center z-0 pointer-events-none">
        <h1 className="text-4xl md:text-6xl font-bold text-pink-500 drop-shadow-[4px_4px_0_#000] transform -rotate-2 inline-block">
          The Fairly OddParents
        </h1>
        <div className="absolute -top-6 -right-10 text-6xl opacity-20 text-green-400 transform rotate-12">★</div>
      </div>

      {/* 3D Room Corner Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-[80%] bg-[#4E342E] transform-style-3d origin-top -z-20"></div>
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#251A18] transform origin-bottom rotate-x-[60deg] -z-10 shadow-[inset_0_20px_50px_rgba(0,0,0,0.5)]"></div>

      {/* Wallpaper Pattern */}
      <div className="absolute top-0 w-full h-[80%] opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, #3E2723 40px, #3E2723 42px)' }}>
      </div>

      {/* Retro TV Stand (Cabinet Style) */}
      <div className="absolute bottom-[-10%] md:bottom-[-5%] w-[300px] md:w-[500px] h-[200px] bg-[#3E2723] rounded-t-lg shadow-[0_-10px_30px_rgba(0,0,0,0.6)] border-t-[4px] border-[#2d1b18] flex flex-col items-center justify-start z-0 perspective-500">
          {/* Cabinet Doors */}
          <div className="w-[95%] h-[70%] mt-2 flex gap-1">
             <div className="flex-1 bg-[#2e1d1a] border-r border-[#1a110f] shadow-inner relative group">
                <div className="absolute top-1/2 right-2 w-2 h-2 rounded-full bg-[#8D6E63] shadow-sm"></div>
             </div>
             <div className="flex-1 bg-[#2e1d1a] border-l border-[#1a110f] shadow-inner relative">
                <div className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-[#8D6E63] shadow-sm"></div>
             </div>
          </div>
          {/* Legs */}
          <div className="absolute -bottom-4 left-4 w-4 h-8 bg-[#2d1b18]"></div>
          <div className="absolute -bottom-4 right-4 w-4 h-8 bg-[#2d1b18]"></div>
      </div>

      {/* Da Rules Book - Bigger Size & Faster Flip */}
      <div 
        className="absolute top-[8%] left-[2%] md:left-[5%] w-60 h-80 cursor-pointer group z-20"
        style={{ perspective: '1500px' }}
        onClick={handleBookClick}
      >
        <motion.div 
          className="relative w-full h-full transform-style-3d"
          animate={{ rotateY: isRulesFlipped ? 180 : 10 }}
          whileHover={{ scale: 1.02, rotateY: isRulesFlipped ? 180 : 5 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Front */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-pink-700 border-[6px] border-yellow-400 rounded-r-xl shadow-2xl backface-hidden flex flex-col items-center justify-center overflow-hidden">
             {/* Sparkles */}
             <div className="absolute top-4 right-4 text-yellow-300 animate-pulse text-4xl">✨</div>
             <div className="absolute bottom-4 left-4 text-yellow-300 animate-pulse text-3xl">✨</div>
             
             <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center mb-6 border-[5px] border-black shadow-inner">
                <span className="text-6xl text-black">★</span>
             </div>
             <span className="text-yellow-300 text-6xl font-bold text-center leading-none drop-shadow-[4px_4px_0_#000]">DA<br/>RULES</span>
             <div className="absolute left-0 top-0 bottom-0 w-8 bg-pink-900/50 rounded-l-sm border-r border-pink-900/30"></div>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-purple-800 border-[6px] border-yellow-400 rounded-l-xl shadow-2xl backface-hidden rotate-y-180 flex flex-col items-center p-6 text-center">
            <h3 className="text-yellow-300 font-bold border-b-2 border-yellow-300/50 mb-6 text-xl tracking-widest drop-shadow-md mt-4 uppercase">Engineering Wisdom</h3>
            
            <div className="flex-1 flex items-center justify-center w-full">
               <p className="text-white text-lg md:text-xl leading-relaxed font-bold drop-shadow-md select-none font-[VT323] break-words px-2">
                 "{currentQuote}"
               </p>
            </div>
            
            <div className="mt-4 text-xs text-purple-300/60 font-mono tracking-widest">TAP TO CLOSE</div>
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-purple-900 rounded-r-sm border-l border-purple-950 shadow-inner"></div>
          </div>
        </motion.div>
      </div>

      {/* 3D TV Container */}
      <motion.div 
        className="relative z-10 bg-[#2a2a2a] p-4 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1)] border-b-[12px] border-r-[12px] border-black transform-style-3d mb-10"
        initial={{ scale: 0.8, y: 50, rotateX: 5 }}
        animate={{ scale: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        {/* Antenna */}
        <div className="absolute -top-24 left-1/2 w-1.5 h-32 bg-gray-400 transform -rotate-[25deg] origin-bottom -z-10 border border-gray-600 shadow-lg"></div>
        <div className="absolute -top-24 left-1/2 w-1.5 h-32 bg-gray-400 transform rotate-[25deg] origin-bottom -z-10 border border-gray-600 shadow-lg"></div>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          {/* Screen Area */}
          <div className="relative w-[280px] h-[220px] md:w-[480px] md:h-[360px] bg-black rounded-[50%_/_10%] md:rounded-[2rem] overflow-hidden border-[8px] border-[#1a1a1a] shadow-[inset_0_0_40px_rgba(0,0,0,1)] ring-1 ring-white/5 group">
             
             {/* CRT Glass Reflection & Curve */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_40%)] z-30 pointer-events-none rounded-[inherit]"></div>
             <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_3px,3px_100%] pointer-events-none opacity-60"></div>
             
             {/* Screen Content */}
             <div className="absolute inset-0 flex flex-col items-center z-10 text-shadow-glow overflow-hidden bg-[#111]">
                {/* @ts-ignore */}
                <AnimatePresence mode="wait">
                  {isStatic ? (
                    <motion.div 
                      key="static"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-[#111]"
                    >
                      <div className="w-[200%] h-[200%] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiLz4KPC9zdmc+')] opacity-30 animate-noise"></div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key={channel}
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(2px)' }} 
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      className="w-full h-full flex flex-col p-4"
                    >
                       <div className="text-right text-pink-500 font-bold mb-1 border-b border-pink-500/30 text-lg md:text-xl">CH {String(channel + 1).padStart(2,'0')} - {getChannelName(channel)}</div>
                       
                       <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar" ref={scrollRef}>
                         
                         {/* CH 1: PROFILE & EDUCATION */}
                         {channel === 0 && (
                           <div className="space-y-4 text-center py-2">
                             <h2 className="text-3xl text-white leading-none">{RESUME_DATA.header.name}</h2>
                             <div className="text-green-400 text-lg">{RESUME_DATA.header.contact.email}</div>
                             <div className="text-green-400 text-lg">{RESUME_DATA.header.contact.phone}</div>
                             
                             <div className="border-t-2 border-dashed border-gray-600 my-2 pt-2">
                               <h3 className="text-xl text-yellow-400">EDUCATION</h3>
                               {RESUME_DATA.education.map((edu, i) => (
                                 <div key={i}>
                                   <div className="text-white text-lg">{edu.school}</div>
                                   <div className="text-green-300 leading-tight">{edu.degree}</div>
                                 </div>
                               ))}
                             </div>
                           </div>
                         )}

                         {/* CH 2: EXPERIENCE */}
                         {channel === 1 && (
                           <div className="space-y-6 py-2">
                             {RESUME_DATA.experience.map((exp, i) => (
                               <div key={i} className="text-left border-l-2 border-green-500 pl-3">
                                 <h3 className="text-xl text-yellow-400 leading-none">{exp.role}</h3>
                                 <div className="text-pink-400 text-lg">{exp.company}</div>
                                 <div className="text-gray-400 text-sm mb-1">{exp.period} | {exp.location}</div>
                                 <ul className="list-disc pl-4 space-y-1">
                                   {exp.points.map((pt, j) => (
                                     <li key={j} className="text-white text-sm leading-tight opacity-90">{pt}</li>
                                   ))}
                                 </ul>
                               </div>
                             ))}
                           </div>
                         )}

                         {/* CH 3: PROJECTS */}
                         {channel === 2 && (
                           <div className="space-y-6 py-2">
                             {RESUME_DATA.projects.map((proj, i) => (
                               <div key={i} className="text-left border-2 border-gray-700 bg-black/30 p-2">
                                 <h3 className="text-xl text-green-400 leading-none mb-1">{proj.title}</h3>
                                 <p className="text-white text-sm leading-tight mb-2">{proj.description}</p>
                                 <div className="text-pink-400 text-xs uppercase tracking-wide border-t border-gray-700 pt-1">{proj.tech}</div>
                               </div>
                             ))}
                           </div>
                         )}

                         {/* CH 4: SKILLS */}
                         {channel === 3 && (
                           <div className="space-y-4 py-2 text-left">
                             <div>
                               <h3 className="text-yellow-400 text-lg border-b border-yellow-400/50 mb-1">LANGUAGES</h3>
                               <p className="text-white text-sm leading-tight">{RESUME_DATA.skills.languages}</p>
                             </div>
                             <div>
                               <h3 className="text-yellow-400 text-lg border-b border-yellow-400/50 mb-1">FRAMEWORKS</h3>
                               <p className="text-white text-sm leading-tight">{RESUME_DATA.skills.frameworks}</p>
                             </div>
                             <div>
                               <h3 className="text-yellow-400 text-lg border-b border-yellow-400/50 mb-1">DEV TOOLS</h3>
                               <p className="text-white text-sm leading-tight">{RESUME_DATA.skills.tools}</p>
                             </div>
                             <div>
                               <h3 className="text-yellow-400 text-lg border-b border-yellow-400/50 mb-1">LIBRARIES</h3>
                               <p className="text-white text-sm leading-tight">{RESUME_DATA.skills.libraries}</p>
                             </div>
                           </div>
                         )}

                       </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>
          </div>

          {/* Control Panel */}
          <div className="w-full md:w-32 bg-[#2a2a2a] rounded-xl flex md:flex-col items-center justify-between p-4 md:py-8 gap-4 border-l-0 md:border-l-2 border-[#111] shadow-inner relative">
             <div className="absolute inset-2 bg-[#4E342E] opacity-50 rounded-lg pointer-events-none"></div>
             
             <div className="relative z-10 text-xs text-gray-300 font-bold tracking-widest bg-black/30 px-2 rounded">TUNER</div>
             
             <motion.div 
                className="relative z-10 w-20 h-20 rounded-full bg-[#1a1a1a] border-[3px] border-[#000] shadow-[0_5px_15px_rgba(0,0,0,0.6)] flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
                animate={{ rotate: rotation }}
                onClick={rotateKnob}
             >
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#333] to-[#111] relative shadow-inner flex items-center justify-center">
                   <div className="absolute top-1 w-1.5 h-4 bg-pink-500 rounded-full shadow-[0_0_5px_#ec4899]"></div>
                   <div className="w-10 h-10 rounded-full bg-[#111] shadow-inner"></div>
                </div>
             </motion.div>

             <div className="relative z-10 flex-1 w-full flex flex-col gap-1.5 justify-center px-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-full h-1 bg-black/80 rounded-full border-b border-gray-700/20"></div>
                ))}
             </div>
          </div>
        </div>
      </motion.div>
      
      <style>{`
        .text-shadow-glow { text-shadow: 2px 2px 0px #000, 0 0 8px rgba(74, 222, 128, 0.6); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4ADE80; border-radius: 2px; }
        @keyframes noise { 0% { background-position: 0 0; } 100% { background-position: 100px 100px; } }
        .animate-noise { animation: noise 0.2s steps(4) infinite; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default RetroScene;