import React, { useState } from 'react';
import TypewriterText from './TypewriterText';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';

interface NewYearGreetingProps {
  onProceed: () => void;
}

const NewYearGreeting: React.FC<NewYearGreetingProps> = ({ onProceed }) => {
  const [showHeart, setShowHeart] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const newYearMessage = "My love, we’ve crossed over. Another revolution around the sun, another year where you are the most beautiful part of my reality. You are a wonderful soul, Chinecherem—the secret warmth in my winters and the constant light in my code. I am so grateful to step into this new year with you. Let's make 2026 our greatest masterpiece yet.";

  const handleStartTransition = () => {
    setIsTransitioning(true);
    // Let the animation play before proceeding
    setTimeout(() => {
      onProceed();
    }, 1200);
  };

  return (
    <div className={`h-screen w-full bg-[#02060a] flex flex-col items-center justify-center p-8 md:p-20 relative overflow-hidden text-center transition-opacity duration-1000 ${isTransitioning ? 'pointer-events-none' : ''}`}>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 visual-noise opacity-15"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#ff2d55]/5 to-[#00e5ff]/5"></div>
      </div>

      {/* Opening Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center overflow-hidden">
           <div className="w-10 h-10 bg-white rounded-full animate-portal-out"></div>
        </div>
      )}

      <div className={`max-w-4xl space-y-12 relative z-10 transition-transform duration-1000 ${isTransitioning ? 'scale-90 opacity-0 blur-sm' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="mono text-[10px] md:text-[12px] text-[#00e5ff] tracking-[0.6em] font-black uppercase">Temporal_Sync_2026</span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
          
          <h2 className="serif text-4xl md:text-7xl lg:text-8xl italic font-bold text-white tracking-tighter leading-tight drop-shadow-2xl">
            Happy New Year, <br/>
            <span className="text-[#ff2d55]">My Love</span>
          </h2>
        </div>

        <div className="glass p-8 md:p-16 rounded-[40px] md:rounded-[60px] border border-white/10 backdrop-blur-3xl shadow-3xl text-left relative">
           <div className="absolute -top-6 -left-6 text-[#ff2d55]/20">
             <Sparkles size={60} />
           </div>
           
           <div className="serif text-xl md:text-3xl lg:text-4xl italic text-white/90 leading-relaxed font-light">
             <TypewriterText 
               text={newYearMessage} 
               delay={150} 
               onComplete={() => setShowHeart(true)} 
             />
           </div>
        </div>

        {showHeart && (
          <div className="flex flex-col items-center gap-6 animate-fade-in py-10">
             <button 
               onClick={handleStartTransition}
               className="group relative flex items-center justify-center transition-transform hover:scale-125 duration-500 active:scale-95"
             >
                <div className="absolute -inset-8 bg-[#ff2d55]/20 blur-3xl rounded-full animate-pulse"></div>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#ff2d55]/20 flex items-center justify-center bg-black/40 backdrop-blur-md relative overflow-hidden group-hover:border-[#ff2d55]/60 transition-colors">
                   <Heart 
                    size={60} 
                    className={`text-[#ff2d55] heart-pulse cursor-pointer transition-all group-hover:drop-shadow-[0_0_20px_#ff2d55] ${isTransitioning ? 'scale-150 opacity-0' : ''}`} 
                    fill="currentColor" 
                   />
                </div>
             </button>
             <div className="mono text-[10px] text-white/30 tracking-[0.5em] font-black uppercase animate-bounce flex items-center gap-4">
               <ChevronRight size={14} />
               Tap Heart to Initialize Archive
               <ChevronRight size={14} className="rotate-180" />
             </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-10 left-10 hidden lg:block opacity-20 mono text-[10px] font-black tracking-widest vertical-rl">
        LUCIAN_LOVE_v2.6 // 2026_ESTABLISHED
      </div>
    </div>
  );
};

export default NewYearGreeting;