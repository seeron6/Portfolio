import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';
import { ChevronRight, User, Briefcase, Code, Cpu } from 'lucide-react';

interface AnimateTransitionProps {
  children: React.ReactNode;
  keyProp: string;
}

const AnimateTransition: React.FC<AnimateTransitionProps> = ({ children, keyProp }) => (
  <motion.div
    key={keyProp}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.4 }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const ModernScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'work' | 'projects' | 'skills'>('profile');

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Cpu },
  ];

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center relative overflow-hidden font-sans text-slate-200 perspective-[1200px]">
      
      {/* Title - Fixed at Top Absolute */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none select-none">
        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-200 to-gray-600 tracking-[0.2em] uppercase drop-shadow-2xl">
          THE 100
        </h1>
        <div className="text-xs md:text-sm tracking-[1em] text-emerald-500 uppercase mt-2 font-bold">
           Survival of the Fittest
        </div>
      </div>

      {/* 3D Environment: Dark Concrete Room */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-black z-0"></div>
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] z-0"></div>
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-black to-transparent opacity-80 z-0"></div>

      {/* "The 100" Symbol Background */}
      <div className="absolute top-[10%] right-[10%] opacity-5 pointer-events-none transform rotate-12 blur-[1px] z-0">
        <svg width="400" height="400" viewBox="0 0 100 100">
           <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="1" fill="none" />
           <path d="M50 5 L50 95 M5 50 L95 50" stroke="white" strokeWidth="1" />
           <circle cx="50" cy="50" r="15" stroke="white" strokeWidth="4" fill="none" />
        </svg>
      </div>

      {/* Modern TV Setup */}
      <motion.div 
        className="relative z-10 flex flex-col items-center transform-style-3d mt-20"
        initial={{ rotateY: 10, y: 0 }}
        animate={{ 
          rotateY: [10, -5, 5, 0], 
          y: [0, -10, 0] 
        }}
        transition={{ 
          rotateY: { duration: 20, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          y: { duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
        }}
      >
        <div className="absolute -z-10 top-[20%] left-[5%] right-[5%] h-[60%] bg-black blur-2xl opacity-80 transform translate-z-[-50px]"></div>

        <div className="w-[90vw] md:w-[850px] h-[60vh] md:h-[550px] bg-[#0a0a0a] border-[1px] border-zinc-700/50 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_15px_rgba(255,255,255,0.05)] flex flex-col relative overflow-hidden group backdrop-blur-sm">
          
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-30 pointer-events-none z-30"></div>
          <div className="absolute bottom-4 right-8 w-1 h-1 bg-white/50 rounded-full shadow-[0_0_5px_white] z-30"></div>

          {/* Header UI */}
          <div className="h-10 bg-[#050505] flex items-center justify-between px-6 border-b border-zinc-800 z-20 shrink-0">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_#dc2626]"></div>
               <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-bold">SOURCE: THE_100_DEV</span>
            </div>
            <div className="text-[10px] text-zinc-600 font-mono flex gap-4">
              <span>HDR10+</span>
              <span>4K 120HZ</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row relative z-10 bg-black overflow-hidden h-full">
            {/* Navigation Sidebar */}
            <div className="w-full md:w-48 bg-zinc-900/40 border-r border-zinc-800/50 flex flex-col pt-4 backdrop-blur-md shrink-0">
              <div className="px-6 mb-4 text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Navigation</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-6 py-4 flex items-center gap-3 transition-all relative group ${
                    activeTab === item.id 
                    ? 'text-emerald-400 bg-white/5' 
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${activeTab === item.id ? 'bg-emerald-500 h-full shadow-[0_0_10px_#10b981]' : 'bg-transparent h-0 group-hover:h-full'}`}></div>
                  <item.icon size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={14} className="ml-auto animate-pulse" />}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 relative overflow-y-auto custom-scrollbar">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
               <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

               {/* @ts-ignore */}
               <AnimatePresence mode="wait">
                 <AnimateTransition keyProp={activeTab}>
                  {activeTab === 'profile' && (
                    <div className="space-y-8">
                       <div>
                         <h2 className="text-4xl md:text-5xl font-thin text-white mb-2 uppercase tracking-tight">{RESUME_DATA.header.name}</h2>
                         <div className="text-emerald-500 font-mono tracking-widest text-sm mb-4">CONFIDENTIAL PERSONNEL FILE</div>
                         <div className="grid gap-2 text-zinc-400 text-sm">
                           <div className="flex gap-2"><span className="text-zinc-600 uppercase w-20">Email:</span> {RESUME_DATA.header.contact.email}</div>
                           <div className="flex gap-2"><span className="text-zinc-600 uppercase w-20">Phone:</span> {RESUME_DATA.header.contact.phone}</div>
                           <div className="flex gap-2"><span className="text-zinc-600 uppercase w-20">GitHub:</span> {RESUME_DATA.header.contact.github}</div>
                           <div className="flex gap-2"><span className="text-zinc-600 uppercase w-20">LinkedIn:</span> {RESUME_DATA.header.contact.linkedin}</div>
                         </div>
                       </div>
                       
                       <div className="border-t border-zinc-800 pt-6">
                         <h3 className="text-xl text-white mb-4 flex items-center gap-2"><span className="w-1 h-6 bg-emerald-500"></span> EDUCATION</h3>
                         {RESUME_DATA.education.map((edu, i) => (
                           <div key={i} className="bg-white/5 p-4 border border-zinc-700/50 rounded-sm">
                             <div className="text-lg text-emerald-400 font-bold">{edu.school}</div>
                             <div className="text-zinc-300">{edu.degree}</div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {activeTab === 'work' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-thin text-white border-b border-zinc-800 pb-2">OPERATIONAL HISTORY</h2>
                       {RESUME_DATA.experience.map((exp, i) => (
                         <div key={i} className="group">
                           <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                             <h3 className="text-xl text-emerald-400 font-bold">{exp.role}</h3>
                             <span className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">{exp.period}</span>
                           </div>
                           <div className="text-zinc-300 text-sm mb-2">{exp.company} | {exp.location}</div>
                           <ul className="space-y-2 border-l-2 border-zinc-800 pl-4 ml-1 group-hover:border-emerald-500 transition-colors">
                             {exp.points.map((pt, j) => (
                               <li key={j} className="text-zinc-400 text-sm font-light leading-relaxed">{pt}</li>
                             ))}
                           </ul>
                         </div>
                       ))}
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-thin text-white border-b border-zinc-800 pb-2">PROJECT ARCHIVES</h2>
                       <div className="grid grid-cols-1 gap-4">
                         {RESUME_DATA.projects.map((proj, i) => (
                           <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-5 hover:border-emerald-500/50 transition-colors">
                             <h3 className="text-lg text-white font-bold mb-1">{proj.title}</h3>
                             <p className="text-zinc-400 text-sm mb-3 font-light">{proj.description}</p>
                             <div className="text-xs font-mono text-emerald-500">{proj.tech}</div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-thin text-white border-b border-zinc-800 pb-2">TECHNICAL ARSENAL</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-white/5 p-4 rounded-sm">
                            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Languages</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.languages}</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-sm">
                            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Frameworks</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.frameworks}</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-sm">
                            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Tools</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.tools}</p>
                          </div>
                          <div className="bg-white/5 p-4 rounded-sm">
                            <h3 className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">Libraries</h3>
                            <p className="text-zinc-300 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.libraries}</p>
                          </div>
                       </div>
                    </div>
                  )}
                 </AnimateTransition>
               </AnimatePresence>
            </div>
          </div>
        </div>
        <div className="absolute -inset-10 bg-emerald-500/10 blur-[100px] -z-20 rounded-full opacity-30"></div>
        <div className="absolute top-[105%] w-[90%] h-[200px] bg-gradient-to-b from-white/10 to-transparent blur-md transform scale-y-[-1] mask-image-b opacity-20"></div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #18181b; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #10b981; border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default ModernScene;