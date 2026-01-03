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

const FutureScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'work' | 'projects' | 'skills'>('profile');

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Cpu },
  ];

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden font-mono text-cyan-400 perspective-[1200px]">
      
      {/* Title - Fixed at Top Absolute */}
      <div className="absolute top-8 left-0 right-0 text-center z-20 pointer-events-none select-none">
        <h1 className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-[0.2em] uppercase drop-shadow-[0_0_15px_rgba(6,182,212,0.8)] font-[Orbitron]">
          STARTUP
        </h1>
        <div className="text-xs md:text-sm tracking-[1em] text-cyan-700 uppercase mt-2 font-bold animate-pulse">
           Disrupt. Decentralize. Deploy.
        </div>
      </div>

      {/* 3D Environment: Cyber Grid */}
      <div className="absolute inset-0 bg-black"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] perspective-[500px] transform rotate-x-12 opacity-30"></div>
      <div className="absolute bottom-0 w-full h-[40%] bg-gradient-to-t from-cyan-900/20 to-transparent opacity-80 z-0"></div>

      {/* Future Terminal Setup */}
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
        <div className="absolute -z-10 top-[20%] left-[5%] right-[5%] h-[60%] bg-cyan-500 blur-3xl opacity-10 transform translate-z-[-50px]"></div>

        <div className="w-[90vw] md:w-[850px] h-[60vh] md:h-[550px] bg-black/90 border border-cyan-500/50 rounded-lg shadow-[0_0_50px_rgba(6,182,212,0.2)] flex flex-col relative overflow-hidden group backdrop-blur-md">
          
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyan-500/5 to-transparent opacity-30 pointer-events-none z-30"></div>
          
          {/* Header UI */}
          <div className="h-10 bg-black/80 flex items-center justify-between px-6 border-b border-cyan-900 z-20 shrink-0">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></div>
               <span className="text-[10px] uppercase tracking-[0.25em] text-cyan-600 font-bold">SYSTEM_READY</span>
            </div>
            <div className="text-[10px] text-cyan-800 font-mono flex gap-4">
              <span>GENCOIN_OS v2.0</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col md:flex-row relative z-10 bg-black/80 overflow-hidden h-full">
            {/* Navigation Sidebar */}
            <div className="w-full md:w-48 bg-black/60 border-r border-cyan-900/50 flex flex-col pt-4 backdrop-blur-md shrink-0">
              <div className="px-6 mb-4 text-[10px] text-cyan-700 uppercase tracking-widest font-bold">Protocol</div>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`px-6 py-4 flex items-center gap-3 transition-all relative group ${
                    activeTab === item.id 
                    ? 'text-cyan-400 bg-cyan-900/30' 
                    : 'text-cyan-800 hover:text-cyan-500 hover:bg-cyan-900/10'
                  }`}
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 transition-all ${activeTab === item.id ? 'bg-cyan-500 h-full shadow-[0_0_10px_#22d3ee]' : 'bg-transparent h-0 group-hover:h-full'}`}></div>
                  <item.icon size={16} />
                  <span className="font-bold text-xs uppercase tracking-wider">{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={14} className="ml-auto animate-pulse" />}
                </button>
              ))}
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 relative overflow-y-auto custom-scrollbar">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
               <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

               {/* @ts-ignore */}
               <AnimatePresence mode="wait">
                 <AnimateTransition keyProp={activeTab}>
                  {activeTab === 'profile' && (
                    <div className="space-y-8">
                       <div>
                         <h2 className="text-4xl md:text-5xl font-bold text-cyan-100 mb-2 uppercase tracking-tight drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]">{RESUME_DATA.header.name}</h2>
                         <div className="text-cyan-600 font-mono tracking-widest text-sm mb-4">NEURAL LINK ESTABLISHED</div>
                         <div className="grid gap-2 text-cyan-400/80 text-sm font-mono">
                           <div className="flex gap-2"><span className="text-cyan-700 uppercase w-20">Email:</span> {RESUME_DATA.header.contact.email}</div>
                           <div className="flex gap-2"><span className="text-cyan-700 uppercase w-20">Comm:</span> {RESUME_DATA.header.contact.phone}</div>
                           <div className="flex gap-2"><span className="text-cyan-700 uppercase w-20">Repo:</span> {RESUME_DATA.header.contact.github}</div>
                           <div className="flex gap-2"><span className="text-cyan-700 uppercase w-20">Net:</span> {RESUME_DATA.header.contact.linkedin}</div>
                         </div>
                       </div>
                       
                       <div className="border-t border-cyan-900 pt-6">
                         <h3 className="text-xl text-cyan-300 mb-4 flex items-center gap-2"><span className="w-1 h-6 bg-cyan-500"></span> DATA: EDUCATION</h3>
                         {RESUME_DATA.education.map((edu, i) => (
                           <div key={i} className="bg-cyan-950/30 p-4 border border-cyan-800 rounded-sm">
                             <div className="text-lg text-cyan-400 font-bold">{edu.school}</div>
                             <div className="text-cyan-500/80">{edu.degree}</div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {activeTab === 'work' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-bold text-white border-b border-cyan-900 pb-2">EXECUTION LOGS</h2>
                       {RESUME_DATA.experience.map((exp, i) => (
                         <div key={i} className="group">
                           <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                             <h3 className="text-xl text-cyan-400 font-bold">{exp.role}</h3>
                             <span className="text-xs font-mono text-cyan-600 border border-cyan-900 px-2 py-1 rounded">{exp.period}</span>
                           </div>
                           <div className="text-cyan-300/60 text-sm mb-2 font-mono">{exp.company} | {exp.location}</div>
                           <ul className="space-y-2 border-l-2 border-cyan-900 pl-4 ml-1 group-hover:border-cyan-500 transition-colors">
                             {exp.points.map((pt, j) => (
                               <li key={j} className="text-cyan-100/80 text-sm font-light leading-relaxed font-mono">{pt}</li>
                             ))}
                           </ul>
                         </div>
                       ))}
                    </div>
                  )}

                  {activeTab === 'projects' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-bold text-white border-b border-cyan-900 pb-2">PROJECT MODULES</h2>
                       <div className="grid grid-cols-1 gap-4">
                         {RESUME_DATA.projects.map((proj, i) => (
                           <div key={i} className="bg-cyan-950/30 border border-cyan-900 p-5 hover:border-cyan-500/50 transition-colors hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                             <h3 className="text-lg text-cyan-200 font-bold mb-1">{proj.title}</h3>
                             <p className="text-cyan-400/60 text-sm mb-3 font-mono">{proj.description}</p>
                             <div className="text-xs font-mono text-cyan-500">{proj.tech}</div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {activeTab === 'skills' && (
                    <div className="space-y-6">
                       <h2 className="text-3xl font-bold text-white border-b border-cyan-900 pb-2">CAPABILITIES</h2>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-cyan-950/30 p-4 rounded-sm border border-cyan-900/50">
                            <h3 className="text-cyan-500 text-sm font-bold uppercase tracking-widest mb-2">Languages</h3>
                            <p className="text-cyan-100/80 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.languages}</p>
                          </div>
                          <div className="bg-cyan-950/30 p-4 rounded-sm border border-cyan-900/50">
                            <h3 className="text-cyan-500 text-sm font-bold uppercase tracking-widest mb-2">Frameworks</h3>
                            <p className="text-cyan-100/80 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.frameworks}</p>
                          </div>
                          <div className="bg-cyan-950/30 p-4 rounded-sm border border-cyan-900/50">
                            <h3 className="text-cyan-500 text-sm font-bold uppercase tracking-widest mb-2">Tools</h3>
                            <p className="text-cyan-100/80 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.tools}</p>
                          </div>
                          <div className="bg-cyan-950/30 p-4 rounded-sm border border-cyan-900/50">
                            <h3 className="text-cyan-500 text-sm font-bold uppercase tracking-widest mb-2">Libraries</h3>
                            <p className="text-cyan-100/80 text-sm leading-relaxed font-mono">{RESUME_DATA.skills.libraries}</p>
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
        .custom-scrollbar::-webkit-scrollbar-track { background: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default FutureScene;