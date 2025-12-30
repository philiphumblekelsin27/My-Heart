
import React, { useState, useEffect, useMemo } from 'react';
import { ShieldCheck, Heart, Globe, Wifi, Cpu, Lock, Terminal, Utensils, Zap, Database, Hash, Command, ChevronRight } from 'lucide-react';

interface LoginGateProps {
  onLogin: () => void;
}

const LoginGate: React.FC<LoginGateProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('AUTH_SOCKET_ACTIVE');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Awaiting Secure Input...');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth - 0.5) * 40, 
        y: (e.clientY / window.innerHeight - 0.5) * 40 
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const driftSymbols = useMemo(() => {
    const symbols = [
      '01', 'SALT', 'HEX', 'TEMP', 'RECIPE', 'CPU', 'SPICE', 'UPLINK', 
      'SIMMER', 'FIREWALL', 'SEAR', 'SAUCE', 'KERNEL', 'WHISK', 'DECRYPT', 'FLAME'
    ];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      text: symbols[Math.floor(Math.random() * symbols.length)],
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${8 + Math.random() * 7}s`,
      color: Math.random() > 0.6 ? 'text-[#00e5ff]' : 'text-[#ff2d55]'
    }));
  }, []);

  const tasks = [
    "Establishing encrypted handshake...",
    "Querying distance database: 10,000mi...",
    "Calibrating pan temperature: 400F...",
    "Analyzing heartbeat frequency...",
    "Syncing Lucian_OS with Chinecherem_Core...",
    "Bypassing physical constraints...",
    "Retrieving April 2025 logs...",
    "Authenticating deep connection...",
    "Vault authorization granted."
  ];

  const startAuthorization = () => {
    setIsAuthenticating(true);
    let progress = 0;
    
    const interval = setInterval(() => {
      progress += Math.random() * 1.5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(onLogin, 1000);
      }
      
      const taskIndex = Math.min(
        Math.floor((progress / 100) * tasks.length),
        tasks.length - 1
      );
      setCurrentTask(tasks[taskIndex]);
      setLoadProgress(Math.floor(progress));
    }, 80);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '04152025') {
      setMessage('CORE_IDENTITY_CONFIRMED');
      startAuthorization();
    } else {
      setAttempts(prev => prev + 1);
      setMessage(attempts >= 2 ? 'RETRIEVING_EMERGENCY_UPLINK...' : 'PASSCODE_MISMATCH');
      setPassword('');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-[#02060a] text-[#00e5ff] mono">
      {/* Cinematic Split Background */}
      <div className="absolute inset-0 flex z-0 opacity-20 md:opacity-30">
        <div 
          className="flex-1 bg-cover bg-center border-r border-white/5"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1200")' }}
        ></div>
        <div 
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1577219491135-ce39a730fbaf?auto=format&fit=crop&q=80&w=1200")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#02060a] via-transparent to-[#02060a]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060a] via-transparent to-[#02060a]"></div>
      </div>

      <div className="absolute inset-0 visual-noise opacity-[0.12] pointer-events-none z-10"></div>
      {driftSymbols.map((s) => (
        <div 
          key={s.id}
          className={`data-bit opacity-[0.15] ${s.color} font-black tracking-[0.2em] pointer-events-none z-10`}
          style={{ 
            left: s.left, 
            top: s.top, 
            animationDelay: s.delay,
            animationDuration: s.duration
          }}
        >
          {s.text}
        </div>
      ))}

      <div className="absolute top-10 left-10 space-y-3 opacity-30 hidden lg:block select-none pointer-events-none z-20">
        <div className="flex items-center gap-3"><Terminal size={14}/> <span className="text-[10px] tracking-widest uppercase">USER: LUCIAN_ROOT</span></div>
        <div className="flex items-center gap-3 text-[#ff2d55]"><Utensils size={14}/> <span className="text-[10px] tracking-widest uppercase">CHEF: CHINECHEREM</span></div>
      </div>

      <div 
        className="z-20 text-center max-w-lg w-full px-8 transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mousePos.x * 0.1}px, ${mousePos.y * 0.1}px)` }}
      >
        {isAuthenticating ? (
          <div className="space-y-12 animate-fade-in">
            <div className="relative flex justify-center items-center h-64">
              <div className="w-56 h-56 rounded-full border-4 border-[#00e5ff]/20 flex items-center justify-center bg-[#00e5ff]/5 backdrop-blur-xl">
                <Heart size={80} className="text-[#ff2d55] heart-pulse" fill="currentColor" />
              </div>
              <div className="absolute inset-0 border-t-2 border-[#00e5ff] rounded-full animate-spin-slow"></div>
              <div className="absolute inset-8 border-b-2 border-[#ff2d55]/40 rounded-full animate-reverse-spin opacity-60"></div>
            </div>

            <div className="space-y-8 bg-black/60 backdrop-blur-3xl p-10 rounded-[40px] border border-white/10 shadow-3xl">
              <div className="flex justify-between items-end mb-3">
                  <div className="flex gap-4 items-center">
                    <Database size={14} className="text-[#00e5ff] animate-pulse" />
                    <h2 className="text-[11px] tracking-[0.4em] font-black text-[#00e5ff]/80 uppercase">Handshake_Progress</h2>
                  </div>
                  <span className="text-[14px] font-black text-[#ff2d55]">{loadProgress}%</span>
              </div>
              
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#00e5ff] to-[#ff2d55] shadow-[0_0_25px_#00e5ff] transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                ></div>
              </div>

              <div className="h-6 text-[12px] text-[#00e5ff] italic tracking-[0.1em] opacity-80 typewriter font-bold overflow-hidden">
                 {currentTask}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-16 animate-fade-in">
            <div className="relative inline-block group">
              <div className="w-44 h-44 rounded-full border-[8px] border-[#00e5ff]/40 flex items-center justify-center relative bg-white/5 shadow-[0_0_60px_rgba(0,229,255,0.15)] transition-all duration-1000 group-hover:border-[#00e5ff]">
                <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-700 bg-black/40 backdrop-blur-md">
                  <Lock size={44} className="text-white opacity-40 group-hover:opacity-100 group-hover:text-[#00e5ff] transition-all" />
                </div>
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="absolute w-1 h-10 bg-[#00e5ff]/40" style={{ transform: `rotate(${i * 30}deg) translateY(-65px)` }}></div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-black tracking-[0.3em] md:tracking-[0.5em] font-mono uppercase text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                LUCIAN_LOVE
              </h1>
              <div className="flex items-center justify-center gap-4 text-[11px] opacity-40 tracking-[0.8em] font-black uppercase">
                <Zap size={14} className="text-[#00e5ff]" />
                <span>ENCRYPTED CHANNEL: READY</span>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-10 max-w-sm mx-auto">
              <div className="relative border border-white/20 bg-black/80 backdrop-blur-xl group overflow-hidden rounded-2xl">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00e5ff] transition-all group-hover:scale-110"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#ff2d55] transition-all group-hover:scale-110"></div>
                
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="MMDDYYYY"
                  autoFocus
                  className="bg-transparent text-center text-3xl py-10 w-full focus:outline-none tracking-[0.6em] text-white font-mono placeholder:text-white/5 transition-all relative z-10"
                />
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="h-4 text-[#00e5ff]/80 font-mono text-[11px] uppercase tracking-[0.3em] font-black flex items-center justify-center">
                  {message}
                </div>
                
                <button 
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`w-full py-8 border-2 transition-all duration-500 text-[13px] font-black flex items-center justify-center gap-4 group overflow-hidden relative rounded-2xl ${
                    isHovered ? 'bg-[#00e5ff] text-black border-[#00e5ff] shadow-[0_0_40px_rgba(0,229,255,0.7)]' : 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/40'
                  }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2">
                    <span className={`transition-all duration-300 transform ${isHovered ? 'translate-x-0 opacity-100 scale-110' : '-translate-x-4 opacity-0 scale-50'}`}>
                      <ChevronRight size={18} strokeWidth={3} />
                    </span>
                    <span className={`relative tracking-[0.35em] uppercase transition-all duration-300 ${isHovered ? 'cursor-blink pl-2' : ''}`}>
                      {isHovered ? 'INITIALIZE_AUTH' : 'INITIALIZE_HANDSHAKE'}
                    </span>
                  </div>
                  {/* Subtle noise flicker on hover */}
                  {isHovered && <div className="absolute inset-0 visual-noise opacity-20 pointer-events-none"></div>}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      <div className="absolute bottom-12 opacity-30 text-[9px] md:text-[11px] tracking-[1em] font-black uppercase pointer-events-none z-20">
        DECRYPTING THE RECIPE FOR FOREVER
      </div>
    </div>
  );
};

export default LoginGate;
