
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FutureLetter } from '../types';
import { Lock, Unlock, Fingerprint, ShieldAlert, Loader2, Sparkles as SparklesIcon } from 'lucide-react';
import TypewriterText from './TypewriterText';

interface FutureVaultProps {
  letter: FutureLetter;
}

interface SparkleProps {
  x: string;
  y: string;
  duration: string;
  delay: string;
}

const Sparkle: React.FC<SparkleProps> = ({ x, y, duration, delay }) => (
  <div 
    className="sparkle" 
    style={{ 
      '--tw-x': x, 
      '--tw-y': y, 
      '--tw-duration': duration,
      animationDelay: delay 
    } as React.CSSProperties} 
  />
);

const FutureVault: React.FC<FutureVaultProps> = ({ letter }) => {
  const [isLocked, setIsLocked] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'denied' | 'success'>('idle');
  const [timeLeft, setTimeLeft] = useState('');
  const [isAnniversary, setIsAnniversary] = useState(false);
  const scanTimerRef = useRef<number | null>(null);

  const sparkles = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: `${(Math.random() - 0.5) * 400}px`,
      y: `${(Math.random() - 0.5) * 400}px`,
      duration: `${2 + Math.random() * 3}s`,
      delay: `${Math.random() * 2}s`
    }));
  }, []);

  useEffect(() => {
    const targetDate = new Date(letter.unlockDate);
    const update = () => {
      const now = new Date();
      const isToday = now.toDateString() === targetDate.toDateString();
      setIsAnniversary(isToday);

      const diff = targetDate.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft('00d 00h 00m');
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${days}d ${hours}h ${mins}m`);
      }
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, [letter.unlockDate]);

  const handleScanStart = () => {
    const targetDate = new Date(letter.unlockDate);
    if (new Date() < targetDate) {
      setScanStatus('denied');
      setTimeout(() => setScanStatus('idle'), 3000);
      return;
    }

    setScanStatus('scanning');
    setIsScanning(true);
    setScanProgress(0);

    let progress = 0;
    scanTimerRef.current = window.setInterval(() => {
      progress += 1.5; 
      if (progress >= 100) {
        progress = 100;
        clearInterval(scanTimerRef.current!);
        setScanStatus('success');
        setTimeout(() => setIsLocked(false), 800);
      }
      setScanProgress(progress);
    }, 50);
  };

  const handleScanEnd = () => {
    if (scanStatus === 'success') return;
    if (scanTimerRef.current) clearInterval(scanTimerRef.current);
    setIsScanning(false);
    setScanProgress(0);
    if (scanStatus !== 'denied') setScanStatus('idle');
  };

  return (
    <div className={`glass p-6 md:p-16 rounded-[30px] md:rounded-[60px] relative overflow-hidden transition-all duration-1000 border border-white/5 min-h-[500px] h-auto flex flex-col justify-center mb-40 ${!isLocked ? 'glow-pink border-[#ff2d55]/30 shadow-3xl' : ''} ${isAnniversary && isLocked ? 'anniversary-glow' : ''}`}>
      {isLocked ? (
        <div className="flex flex-col items-center justify-center text-center space-y-10 relative py-20">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             {sparkles.map(s => (
               <Sparkle key={s.id} x={s.x} y={s.y} duration={s.duration} delay={s.delay} />
             ))}
          </div>

          <div className="relative group">
            <div className={`absolute -inset-6 rounded-full border border-dashed transition-all duration-700 ${isScanning ? 'border-[#00e5ff] animate-spin-slow opacity-100' : 'border-white/10 opacity-40'}`}></div>
            <button
              onMouseDown={handleScanStart}
              onMouseUp={handleScanEnd}
              onMouseLeave={handleScanEnd}
              onTouchStart={handleScanStart}
              onTouchEnd={handleScanEnd}
              className={`relative w-20 h-20 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500 z-20 ${
                scanStatus === 'denied' ? 'bg-red-500/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' :
                isScanning ? 'bg-[#00e5ff]/20 border-[#00e5ff] shadow-[0_0_50px_rgba(0,229,255,0.4)]' :
                'bg-white/5 border-white/20 hover:border-[#00e5ff]/50'
              } border-2 backdrop-blur-xl`}
            >
              {scanStatus === 'denied' ? (
                <ShieldAlert size={32} className="text-red-500 animate-pulse md:hidden" />
              ) : scanStatus === 'success' ? (
                <Unlock size={32} className="text-[#00e5ff] md:hidden" />
              ) : (
                <Fingerprint size={32} className={`md:hidden ${isScanning ? 'text-[#00e5ff]' : 'text-white/40'}`} />
              )}

              {scanStatus === 'denied' ? (
                <ShieldAlert size={48} className="text-red-500 animate-pulse hidden md:block" />
              ) : scanStatus === 'success' ? (
                <Unlock size={48} className="text-[#00e5ff] hidden md:block" />
              ) : (
                <Fingerprint size={48} className={`hidden md:block ${isScanning ? 'text-[#00e5ff]' : 'text-white/40'}`} />
              )}
              
              {isScanning && (
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="46%"
                    fill="transparent"
                    stroke="#00e5ff"
                    strokeWidth="3"
                    strokeDasharray="300%"
                    strokeDashoffset={300 - (300 * scanProgress) / 100}
                    className="transition-all duration-100"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-center gap-3">
               <div className={`mono text-[8px] md:text-[10px] tracking-[0.3em] md:tracking-[0.6em] font-black ${isAnniversary ? 'text-[#ff2d55]' : 'text-[#00e5ff]'}`}>
                {scanStatus === 'denied' ? 'ACCESS_DENIED' : isScanning ? 'VERIFYING...' : isAnniversary ? 'ANNIVERSARY_ACTIVE' : 'BIOMETRIC_LOCK_v2'}
              </div>
            </div>
            
            {scanStatus === 'denied' ? (
              <p className="serif text-red-400 italic text-lg px-4">Temporal Lock: Access permitted on Anniversary Day only.</p>
            ) : (
              <div className="px-6">
                <h3 className="serif text-xl md:text-3xl font-bold italic text-white/90">Anniversary Protocol</h3>
                <div className={`mono text-[9px] md:text-xs uppercase tracking-widest font-bold my-4 ${isAnniversary ? 'text-[#ff2d55]' : 'opacity-40'}`}>
                    {isAnniversary ? 'TOUCH SENSOR TO DECRYPT' : `LOCKED UNTIL: ${timeLeft}`}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-fade-in text-left max-w-4xl mx-auto py-6 md:py-20">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 md:pb-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-[#ff2d55]/10 flex items-center justify-center border border-[#ff2d55]/30">
                   <Unlock size={18} className="text-[#ff2d55]" />
                 </div>
                 <div className="flex flex-col">
                   <span className="mono text-[8px] md:text-[10px] text-[#ff2d55] font-black tracking-widest uppercase">Decryption_Complete</span>
                 </div>
              </div>
              <div className="mono text-[7px] md:text-[10px] opacity-30 tracking-[0.2em] font-black uppercase">Secure_Access_Granted</div>
           </div>
           
           <div className="space-y-8 md:space-y-12">
             <h3 className="serif text-4xl md:text-8xl font-bold italic text-white leading-tight tracking-tighter">Letter from the Heart</h3>
             
             <div className="relative group">
                <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-[#ff2d55] to-transparent opacity-30"></div>
                <div className="serif text-lg md:text-3xl lg:text-4xl italic text-white/95 leading-relaxed md:leading-[1.6] font-light tracking-tight whitespace-pre-line">
                  <TypewriterText text={letter.content} delay={150} />
                </div>
             </div>
           </div>
           
           <div className="pt-10 md:pt-20 text-center">
              <div className="inline-flex items-center gap-4 md:gap-6 p-4 md:p-8 border border-white/5 rounded-[25px] md:rounded-[30px] bg-black/40 backdrop-blur-md">
                 <div className="flex -space-x-3">
                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-white/10 overflow-hidden bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4")'}}></div>
                    <div className="w-8 h-8 md:w-14 md:h-14 rounded-full border border-white/10 overflow-hidden bg-cover bg-center" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1577219491135-ce39a730fbaf")'}}></div>
                 </div>
                 <div className="text-left leading-none">
                    <div className="mono text-[8px] md:text-[11px] text-[#00e5ff] font-black tracking-widest uppercase mb-1">Session Permanent</div>
                    <div className="mono text-[6px] md:text-[9px] opacity-20 uppercase font-black">LUCIAN_LINK // C-CORE</div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default FutureVault;
