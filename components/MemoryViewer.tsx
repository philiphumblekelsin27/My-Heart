
import React from 'react';
import { Memory } from '../types';
import { Terminal, Clock, Fingerprint, Utensils, Hash, Code, ChefHat, Database } from 'lucide-react';

interface MemoryViewerProps {
  memory: Memory;
  index: number;
}

const MemoryViewer: React.FC<MemoryViewerProps> = ({ memory, index }) => {
  return (
    <div className="glass rounded-[40px] md:rounded-[70px] overflow-hidden border border-white/10 shadow-3xl group hover:border-[#00e5ff]/40 transition-all duration-1000">
      <div className="flex flex-col lg:flex-row min-h-[500px] md:min-h-[700px]">
        {/* Media Block */}
        <div className="w-full lg:w-[50%] relative h-[350px] md:h-[500px] lg:h-auto overflow-hidden bg-black">
          <img 
            src={memory.imageUrl} 
            alt={memory.title}
            className="w-full h-full object-cover transition-transform duration-[6000ms] group-hover:scale-110 opacity-80"
          />
          {/* Cyber/Culinary Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02060a] via-transparent to-transparent"></div>
          
          <div className="absolute top-6 md:top-12 left-6 md:left-12 flex flex-col gap-2 md:gap-4">
             <div className="mono text-[8px] md:text-[10px] font-black text-[#00e5ff] tracking-widest bg-black/90 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-2xl uppercase flex items-center gap-2 md:gap-3 shadow-2xl">
                <Code size={10} className="md:hidden" />
                <Code size={12} className="hidden md:block" />
                <span>ID: 0{index + 1}_{memory.id.toUpperCase()}</span>
             </div>
             <div className="mono text-[8px] md:text-[10px] font-black text-[#ff2d55] tracking-widest bg-black/90 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl border border-white/10 backdrop-blur-2xl uppercase flex items-center gap-2 md:gap-3 shadow-2xl">
                <ChefHat size={10} className="md:hidden" />
                <ChefHat size={12} className="hidden md:block" />
                <span>NODE: {memory.emotion.toUpperCase()}</span>
             </div>
          </div>

          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 flex justify-between items-end">
             <div className="space-y-1 md:space-y-2">
                <div className="mono text-[7px] md:text-[10px] text-white/50 uppercase tracking-[0.3em] md:tracking-[0.5em] font-black typewriter">SYNCHRONIZING...</div>
                <div className="flex gap-3 md:gap-5">
                   <Fingerprint size={18} className="text-[#00e5ff] opacity-40 group-hover:opacity-100 transition-opacity md:hidden" />
                   <Fingerprint size={24} className="text-[#00e5ff] opacity-40 group-hover:opacity-100 transition-opacity hidden md:block" />
                   <Utensils size={18} className="text-[#ff2d55] opacity-40 group-hover:opacity-100 transition-opacity md:hidden" />
                   <Utensils size={24} className="text-[#ff2d55] opacity-40 group-hover:opacity-100 transition-opacity hidden md:block" />
                </div>
             </div>
             <div className="text-right space-y-0.5 md:space-y-1">
                <div className="mono text-[7px] md:text-[9px] text-white/30 uppercase font-black tracking-widest">End_To_End</div>
                <div className="mono text-[8px] md:text-[11px] text-[#00e5ff] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase">LUCIAN_LINK</div>
             </div>
          </div>
        </div>
        
        {/* Content Block */}
        <div className="w-full lg:w-[50%] p-10 md:p-20 lg:p-28 flex flex-col justify-center bg-[#050a0f]/60 relative text-left">
          <div className="absolute inset-0 network-bg opacity-[0.05] pointer-events-none"></div>
          
          <div className="space-y-6 md:space-y-10 relative z-10">
             <div className="flex items-center gap-4 md:gap-8">
                <div className="flex flex-col">
                  <span className="mono text-[#ff2d55] text-[10px] md:text-[12px] tracking-[0.4em] md:tracking-[0.8em] font-black uppercase mb-1">{memory.month}</span>
                  <div className="h-[2px] w-full bg-gradient-to-r from-[#ff2d55] to-transparent"></div>
                </div>
                <div className="flex-grow h-[1px] bg-white/5"></div>
                <div className="flex gap-2 text-white/15 mono text-[8px] uppercase font-bold select-none">
                    <Database size={10} />
                    <span className="hidden sm:inline">commit_log_{index}</span>
                </div>
             </div>
             
             <h3 className="serif text-4xl md:text-7xl lg:text-9xl italic font-bold text-white leading-none tracking-tighter group-hover:text-[#00e5ff] transition-colors duration-700">
                {memory.title}
             </h3>
             
             <div className="relative mt-8 md:mt-16 group/story">
                <div className="absolute -left-6 md:-left-12 top-0 bottom-0 w-[2px] md:w-[4px] bg-gradient-to-b from-[#00e5ff] to-[#ff2d55] opacity-20 group-hover/story:opacity-100 transition-opacity duration-700"></div>
                <p className="serif text-xl md:text-3xl lg:text-5xl italic text-white/95 leading-relaxed md:leading-[1.35] font-light tracking-tight">
                   "{memory.story}"
                </p>
             </div>
             
             <div className="pt-10 md:pt-20 grid grid-cols-2 gap-8 md:gap-16 border-t border-white/5">
                <div className="space-y-2 md:space-y-3">
                   <div className="mono text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black">Timestamp</div>
                   <div className="flex items-center gap-2 md:gap-4">
                      <div className="p-1.5 md:p-2.5 rounded-lg bg-[#00e5ff]/5 border border-[#00e5ff]/20">
                        <Clock size={12} className="text-[#00e5ff] md:hidden" />
                        <Clock size={16} className="text-[#00e5ff] hidden md:block" />
                      </div>
                      <span className="mono text-[10px] md:text-[12px] font-black text-white/70 tracking-widest">{memory.date}</span>
                   </div>
                </div>
                <div className="space-y-2 md:space-y-3">
                   <div className="mono text-[8px] md:text-[10px] text-white/30 uppercase tracking-[0.2em] md:tracking-[0.4em] font-black">Emotional</div>
                   <div className="flex items-center gap-2 md:gap-4">
                      <div className="p-1.5 md:p-2.5 rounded-lg bg-[#ff2d55]/5 border border-[#ff2d55]/20">
                        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#ff2d55] shadow-[0_0_15px_#ff2d55]"></div>
                      </div>
                      <span className="mono text-[10px] md:text-[12px] font-black text-white/70 uppercase tracking-widest">{memory.emotion}</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryViewer;
