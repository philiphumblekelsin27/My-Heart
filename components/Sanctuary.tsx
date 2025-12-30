
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Emotion, TabId } from '../types';
import { OPENING_LETTER, MEMORIES, CHAT_DATA, FUTURE_LETTERS, VIDEOS, BACKGROUND_IMAGES, EMOTION_THEMES, VALENTINES_DATA } from '../constants';
import MusicPlayer from './MusicPlayer';
import MemoryViewer from './MemoryViewer';
import ChatArchiveDisplay from './ChatArchiveDisplay';
import FutureVault from './FutureVault';
import MemoryPrompter from './MemoryPrompter';
import TypewriterText from './TypewriterText';
import { Video, Heart, Terminal, Globe, MessageCircle, Utensils, ShieldCheck, ChevronDown, Activity, Layers, Search, Command, Cpu, Hash, X, Play, Flame, Image as ImageIcon, Type, Sparkles, Fingerprint, ShieldAlert, Wifi, Lock } from 'lucide-react';

interface SanctuaryProps {
  currentEmotion: Emotion;
  onEmotionChange: (emotion: Emotion) => void;
}

const Sanctuary: React.FC<SanctuaryProps> = ({ currentEmotion, onEmotionChange }) => {
  const [activeTab, setActiveTab] = useState<TabId>('origin');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.12);
  const [selectedVideo, setSelectedVideo] = useState<typeof VIDEOS[0] | null>(null);
  const [dynamicBgIndex, setDynamicBgIndex] = useState<number>(0);
  
  // Valentine Lock State
  const [isValentinesUnlocked, setIsValentinesUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [accessDenied, setAccessDenied] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);

  // Target Date: February 14, 2026
  const targetValentineDate = useMemo(() => new Date('2026-02-14T00:00:00'), []);
  const isValentineReady = useMemo(() => {
    // For development, you can change this, but strictly set to target for production.
    return new Date() >= targetValentineDate;
  }, [targetValentineDate]);

  const tabs: { id: TabId; icon: any; label: string; bgIndex: number; index: number }[] = useMemo(() => [
    { id: 'origin', icon: Heart, label: 'ORIGIN', bgIndex: 0, index: 0 },
    { id: 'memories', icon: Globe, label: 'MEMORIES', bgIndex: 1, index: 1 },
    { id: 'kitchen', icon: Utensils, label: 'KITCHEN', bgIndex: 3, index: 2 },
    { id: 'chats', icon: MessageCircle, label: 'ECHOES', bgIndex: 2, index: 3 },
    { id: 'valentines', icon: Flame, label: 'PASSION', bgIndex: 5, index: 4 },
    { id: 'future', icon: ShieldCheck, label: 'VAULT', bgIndex: 4, index: 5 }
  ], []);

  const activeTabData = tabs.find(t => t.id === activeTab)!;

  const cycleBackground = useCallback(() => {
    setDynamicBgIndex(prev => (prev + 1) % BACKGROUND_IMAGES.length);
  }, []);

  useEffect(() => {
    const handleGlobalTap = () => cycleBackground();
    window.addEventListener('click', handleGlobalTap, true); 
    return () => window.removeEventListener('click', handleGlobalTap, true);
  }, [cycleBackground]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bgIndexAttr = entry.target.getAttribute('data-bg-index');
          if (bgIndexAttr !== null) {
            setDynamicBgIndex(parseInt(bgIndexAttr));
          }
        }
      });
    }, { threshold: 0.3 });

    const sections = document.querySelectorAll('[data-bg-index]');
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [activeTab]);

  const navigateTo = (tabId: TabId) => {
    if (isTransitioning || tabId === activeTab) return;
    setIsTransitioning(true);
    setActiveTab(tabId);
    setAccessDenied(false); 
    
    if (tabId === 'valentines') {
      onEmotionChange('passion');
    } else if (currentEmotion === 'passion') {
      onEmotionChange('peace');
    }
    
    const tab = tabs.find(t => t.id === tabId);
    if (tab) setDynamicBgIndex(tab.bgIndex);
    
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const startScan = () => {
    if (isScanning || isValentinesUnlocked) return;

    if (!isValentineReady) {
      setAccessDenied(true);
      setTimeout(() => setAccessDenied(false), 3000);
      return;
    }

    setIsScanning(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsValentinesUnlocked(true);
          setIsScanning(false);
        }, 300);
      }
    }, 40);
  };

  const stopScan = () => {
    if (isScanning && !isValentinesUnlocked) {
      setIsScanning(false);
      setScanProgress(0);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#02060a] text-white font-sans">
      {/* Background System */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {BACKGROUND_IMAGES.map((img, idx) => (
          <div 
            key={img}
            className="absolute inset-0 bg-cover bg-center transition-all duration-[3000ms] ease-in-out"
            style={{ 
              backgroundImage: `url(${img})`, 
              opacity: dynamicBgIndex === idx ? 0.3 : 0,
              transform: `scale(${dynamicBgIndex === idx ? 1 : 1.15})`,
              filter: `blur(${dynamicBgIndex === idx ? 0 : 15}px)`,
              zIndex: dynamicBgIndex === idx ? 1 : 0
            }}
          >
            <div 
              className="absolute inset-0 transition-opacity duration-1500"
              style={{ backgroundColor: EMOTION_THEMES[currentEmotion], opacity: overlayOpacity }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#02060a] via-transparent to-[#02060a]"></div>
          </div>
        ))}
        <div className="absolute inset-0 visual-noise opacity-[0.05] pointer-events-none"></div>
      </div>

      {/* TOP HUD */}
      <header className="fixed top-0 left-0 w-full p-4 md:p-10 z-50 flex justify-between items-center pointer-events-none">
        <div className="flex flex-col items-start bg-black/60 backdrop-blur-3xl px-3 md:px-8 py-2 md:py-5 border border-white/10 rounded-xl md:rounded-3xl pointer-events-auto">
            <div className="flex items-center gap-2 md:gap-4 mb-0.5 md:mb-2">
                <div className="w-1.5 md:w-3 h-1.5 md:h-3 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_15px_#00e5ff]"></div>
                <span className="mono text-[6px] md:text-[10px] tracking-[0.2em] md:tracking-[0.6em] font-black text-[#00e5ff]">UPLINK::SECURED</span>
            </div>
            <div className="mono text-[7px] md:text-[11px] tracking-[0.1em] md:tracking-[0.4em] font-black text-white/60 uppercase">CORE: CHINECHEREM</div>
        </div>

        <div className="flex gap-1.5 md:gap-4 pointer-events-auto bg-black/40 backdrop-blur-2xl p-1.5 md:p-4 rounded-xl md:rounded-3xl border border-white/5">
            {Object.keys(EMOTION_THEMES).map((e) => (
                <button
                    key={e}
                    onClick={(evt) => {
                        evt.stopPropagation();
                        onEmotionChange(e as Emotion);
                    }}
                    className={`w-6 h-6 md:w-11 md:h-11 rounded-md md:rounded-2xl border transition-all flex items-center justify-center relative overflow-hidden group ${currentEmotion === e ? 'border-[#ff2d55] scale-110 shadow-[0_0_15px_#ff2d55]' : 'border-white/10 opacity-30 hover:opacity-100'}`}
                    style={{ backgroundColor: EMOTION_THEMES[e as Emotion] }}
                >
                    {currentEmotion === e && <Activity size={18} className="text-white z-10" />}
                </button>
            ))}
        </div>
      </header>

      {/* STAGE SLIDER */}
      <div 
        ref={stageRef}
        className="relative z-10 h-full w-full transition-transform duration-[1000ms] ease-[cubic-bezier(0.85,0,0.15,1)] flex"
        style={{ transform: `translateX(${-activeTabData.index * 100}%)` }}
      >
        {/* Origin Section */}
        <section className="min-w-full h-full flex items-center justify-center p-6 md:p-20 overflow-y-auto" data-bg-index="0">
          <div className="max-w-4xl w-full space-y-12 md:space-y-20 py-20">
             <div className="space-y-6 md:space-y-10">
                <div className="flex items-center gap-4 md:gap-8 opacity-40">
                  <div className="h-[1px] flex-grow bg-white"></div>
                  <span className="mono text-[8px] md:text-[10px] tracking-[0.6em] font-black uppercase">Established_04_2025</span>
                  <div className="h-[1px] flex-grow bg-white"></div>
                </div>
                <h1 className="serif text-5xl md:text-9xl italic font-bold text-white tracking-tighter leading-none text-center">
                  The <span className="text-[#ff2d55]">Archive</span> <br/>
                  of Us.
                </h1>
             </div>

             <div className="glass p-8 md:p-20 rounded-[40px] md:rounded-[80px] border border-white/10 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] to-[#ff2d55]"></div>
                <div className="serif text-xl md:text-4xl lg:text-5xl italic text-white/90 leading-relaxed font-light text-left">
                  <TypewriterText text={OPENING_LETTER} delay={40} />
                </div>
             </div>

             <div className="flex justify-center pt-10">
                <button 
                  onClick={() => navigateTo('memories')}
                  className="group flex flex-col items-center gap-6"
                >
                   <div className="mono text-[10px] tracking-[0.5em] text-white/40 font-black uppercase group-hover:text-[#00e5ff] transition-colors">Enter Archives</div>
                   <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#00e5ff] group-hover:bg-[#00e5ff]/5 transition-all animate-bounce">
                      <ChevronDown size={24} className="text-white/40 group-hover:text-[#00e5ff]" />
                   </div>
                </button>
             </div>
          </div>
        </section>

        {/* Memories Section */}
        <section className="min-w-full h-full overflow-y-auto px-6 md:px-20 py-32 md:py-48" data-bg-index="1">
          <div className="max-w-7xl mx-auto space-y-32 md:space-y-64">
             <div className="space-y-8 md:space-y-12 text-center">
                <h2 className="serif text-5xl md:text-9xl italic font-bold text-white tracking-tighter">Timeline Logs</h2>
                <div className="mono text-[10px] md:text-[12px] tracking-[1em] text-[#00e5ff] font-black uppercase opacity-40">Fragmented_Moments_Collection</div>
             </div>
             
             <div className="space-y-32 md:space-y-64">
                {MEMORIES.map((m, i) => (
                  <MemoryViewer key={m.id} memory={m} index={i} />
                ))}
             </div>
          </div>
        </section>

        {/* Kitchen/Gourmet Section */}
        <section className="min-w-full h-full overflow-y-auto px-6 md:px-20 py-32 md:py-48" data-bg-index="3">
          <div className="max-w-7xl mx-auto space-y-32">
             <div className="space-y-8 text-center">
                <h2 className="serif text-5xl md:text-9xl italic font-bold text-white tracking-tighter">Culinary Source</h2>
                <div className="mono text-[10px] md:text-[12px] tracking-[1em] text-[#ff2d55] font-black uppercase opacity-40">Encryption_Through_Flavor</div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                {VIDEOS.map((vid) => (
                   <div key={vid.id} className="group relative rounded-[40px] overflow-hidden border border-white/10 bg-black aspect-video cursor-pointer" onClick={() => setSelectedVideo(vid)}>
                      <video 
                        src={vid.url} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                        muted
                        loop
                        onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.target as HTMLVideoElement).pause()}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      <div className="absolute bottom-10 left-10">
                        <div className="mono text-[10px] text-[#ff2d55] font-black tracking-widest uppercase mb-2">{vid.month}</div>
                        <h4 className="serif text-3xl italic font-bold text-white">{vid.title}</h4>
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </section>

        {/* Chat/Echoes Section */}
        <section className="min-w-full h-full overflow-y-auto px-6 md:px-20 py-32 md:py-48" data-bg-index="2">
          <div className="max-w-7xl mx-auto space-y-32">
             <div className="space-y-8 text-center">
                <h2 className="serif text-5xl md:text-9xl italic font-bold text-white tracking-tighter">Echoed Packets</h2>
                <div className="mono text-[10px] md:text-[12px] tracking-[1em] text-[#00e5ff] font-black uppercase opacity-40">Asynchronous_Communication_Logs</div>
             </div>

             <div className="space-y-20">
                {Object.entries(CHAT_DATA).map(([month, messages]) => (
                   <ChatArchiveDisplay key={month} month={month} messages={messages} />
                ))}
             </div>
             
             <MemoryPrompter />
          </div>
        </section>

        {/* Valentines/Passion Section */}
        <section className="min-w-full h-full overflow-y-auto px-6 md:px-20 py-32 md:py-48" data-bg-index="5">
          <div className="max-w-7xl mx-auto">
             {!isValentinesUnlocked ? (
               <div className="max-w-4xl mx-auto text-center space-y-16 py-20 flex flex-col items-center">
                  <div className="space-y-8">
                     <h2 className="serif text-6xl md:text-9xl italic font-bold text-white tracking-tighter">Passion Protocol</h2>
                     <div className="mono text-[10px] md:text-[12px] tracking-[1em] text-[#ff2d55] font-black uppercase opacity-60">High_Security_Intimacy_Vault</div>
                  </div>

                  {/* Fingerprint Scanner Component */}
                  <div className="relative group p-10">
                     <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${isScanning ? 'border-[#ff2d55] animate-spin-slow scale-110' : 'border-white/10 opacity-30 group-hover:opacity-60'}`}></div>
                     
                     <div 
                        onMouseDown={startScan}
                        onMouseUp={stopScan}
                        onMouseLeave={stopScan}
                        onTouchStart={startScan}
                        onTouchEnd={stopScan}
                        className={`relative w-48 h-48 md:w-64 md:h-64 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-500 overflow-hidden cursor-pointer active:scale-95 select-none ${accessDenied ? 'border-red-600 bg-red-600/10' : isScanning ? 'border-[#ff2d55] bg-[#ff2d55]/5' : 'border-white/20 bg-white/5 hover:border-[#ff2d55]/50'}`}
                     >
                        {/* Scanner Laser Line */}
                        {isScanning && (
                          <div className="absolute top-0 left-0 w-full h-1 bg-[#ff2d55] shadow-[0_0_15px_#ff2d55] animate-scan z-20"></div>
                        )}

                        <div className="relative z-10 flex flex-col items-center gap-4">
                           {accessDenied ? (
                             <>
                               <ShieldAlert size={64} className="text-red-600 animate-bounce" />
                               <span className="mono text-[10px] font-black text-red-600 uppercase tracking-widest">Temporal_Lock</span>
                             </>
                           ) : (
                             <>
                               <Fingerprint size={64} className={`transition-colors duration-500 ${isScanning ? 'text-[#ff2d55]' : 'text-white/20'}`} />
                               <span className="mono text-[10px] font-black text-white/40 uppercase tracking-widest">Hold to Verify</span>
                             </>
                           )}
                        </div>

                        {/* Progress Fill */}
                        <div 
                           className="absolute bottom-0 left-0 w-full bg-[#ff2d55]/20 transition-all duration-100 ease-linear" 
                           style={{ height: `${scanProgress}%` }}
                        ></div>
                     </div>
                  </div>

                  <div className="space-y-6 max-w-xl">
                    <div className="flex items-center justify-center gap-3">
                       <Lock size={14} className="text-white/40" />
                       <span className="mono text-[10px] text-white/40 font-black tracking-widest uppercase">Encryption Status: Temporal_Restricted</span>
                    </div>
                    <p className="serif text-white/60 italic text-xl md:text-2xl">
                      "This archive is sealed until the synchronicity of 2026. Only a heartbeat on the appointed day can unlock these memories."
                    </p>
                    <div className="inline-block px-6 py-2 rounded-full bg-white/5 border border-white/10 mono text-[10px] text-[#ff2d55] font-black tracking-widest uppercase">
                       Unlocks: Feb 14, 2026
                    </div>
                  </div>
               </div>
             ) : (
               /* The Unlocked Passion Content */
               <div className="space-y-32 md:space-y-64 animate-fade-in">
                  <div className="text-center space-y-10">
                     <h2 className="serif text-6xl md:text-[12rem] italic font-bold text-white tracking-tighter leading-none">{VALENTINES_DATA.title}</h2>
                     <div className="flex items-center justify-center gap-6">
                        <div className="h-[1px] w-20 bg-white/20"></div>
                        <span className="mono text-[10px] md:text-[14px] text-[#ff2d55] font-black tracking-[1em] uppercase">{VALENTINES_DATA.subtitle}</span>
                        <div className="h-[1px] w-20 bg-white/20"></div>
                     </div>
                  </div>

                  <div className="max-w-5xl mx-auto glass p-10 md:p-24 rounded-[40px] md:rounded-[100px] border border-[#ff2d55]/30 shadow-[0_0_100px_rgba(255,45,85,0.15)]">
                     <p className="serif text-2xl md:text-5xl lg:text-6xl italic text-white/95 leading-relaxed font-light text-left">
                        {VALENTINES_DATA.mainLetter}
                     </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
                     {VALENTINES_DATA.memories.map((mem, idx) => (
                        <div key={idx} className={`glass rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 group ${mem.type === 'text' ? 'p-10 md:p-20 flex flex-col justify-center' : ''}`}>
                           {mem.type === 'image' && (
                              <div className="aspect-[4/5] relative overflow-hidden">
                                 <img src={mem.url} alt={mem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5000ms]" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                 <div className="absolute bottom-10 left-10 right-10 space-y-4">
                                    <h4 className="serif text-3xl md:text-5xl italic font-bold text-white">{mem.title}</h4>
                                    <p className="serif text-lg md:text-2xl italic text-white/70">{mem.description}</p>
                                 </div>
                              </div>
                           )}
                           {mem.type === 'video' && (
                              <div className="aspect-[4/5] relative bg-black group-hover:border-[#ff2d55]/40 transition-colors">
                                 <video src={mem.url} className="w-full h-full object-cover opacity-60" muted loop autoPlay />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                 <div className="absolute bottom-10 left-10 right-10 space-y-4">
                                    <h4 className="serif text-3xl md:text-5xl italic font-bold text-white">{mem.title}</h4>
                                    <p className="serif text-lg md:text-2xl italic text-white/70">{mem.description}</p>
                                 </div>
                              </div>
                           )}
                           {mem.type === 'text' && (
                              <div className="space-y-10 text-left">
                                 <div className="space-y-4">
                                    <h4 className="serif text-4xl md:text-7xl italic font-bold text-white tracking-tighter">{mem.title}</h4>
                                    <div className="h-[1px] w-20 bg-[#ff2d55]"></div>
                                 </div>
                                 <p className="serif text-xl md:text-4xl italic text-white/95 leading-relaxed font-light">
                                    {mem.content}
                                 </p>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               </div>
             )}
          </div>
        </section>

        {/* Future Vault Section */}
        <section className="min-w-full h-full overflow-y-auto px-6 md:px-20 py-32 md:py-48" data-bg-index="4">
          <div className="max-w-7xl mx-auto space-y-32">
             <div className="space-y-8 text-center">
                <h2 className="serif text-5xl md:text-9xl italic font-bold text-white tracking-tighter">The Future Vault</h2>
                <div className="mono text-[10px] md:text-[12px] tracking-[1em] text-[#00e5ff] font-black uppercase opacity-40">Predictive_Affection_Logs</div>
             </div>

             <div className="space-y-20">
                {FUTURE_LETTERS.map((letter) => (
                  <FutureVault key={letter.id} letter={letter} />
                ))}
             </div>
          </div>
        </section>
      </div>

      {/* NAVIGATION BAR */}
      <nav className="fixed bottom-0 left-0 w-full p-6 md:p-12 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 md:gap-4 bg-black/60 backdrop-blur-3xl p-2 md:p-4 rounded-[25px] md:rounded-[40px] border border-white/10 shadow-3xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigateTo(tab.id)}
              className={`flex-1 flex flex-col items-center gap-1 md:gap-3 py-3 md:py-6 rounded-[20px] md:rounded-[30px] transition-all duration-500 relative group overflow-hidden ${activeTab === tab.id ? 'bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]' : 'hover:bg-white/5 opacity-40 hover:opacity-100'}`}
            >
              <div className={`transition-transform duration-500 ${activeTab === tab.id ? 'scale-125 -translate-y-1' : 'group-hover:scale-110'}`}>
                 <tab.icon size={20} className={activeTab === tab.id ? (tab.id === 'valentines' ? 'text-[#ff2d55]' : 'text-[#00e5ff]') : 'text-white'} />
              </div>
              <span className={`mono text-[7px] md:text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] transition-all duration-500 ${activeTab === tab.id ? 'opacity-100' : 'opacity-0 scale-75'}`}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 md:w-12 h-1 rounded-full ${tab.id === 'valentines' ? 'bg-[#ff2d55]' : 'bg-[#00e5ff]'}`}></div>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20 bg-black/95 backdrop-blur-2xl animate-fade-in">
           <button 
             onClick={() => setSelectedVideo(null)}
             className="absolute top-10 right-10 w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
           >
              <X size={32} />
           </button>
           <div className="w-full max-w-6xl aspect-video rounded-[40px] overflow-hidden border border-white/10 shadow-3xl">
              <video 
                src={selectedVideo.url} 
                className="w-full h-full object-contain" 
                controls 
                autoPlay 
              />
           </div>
        </div>
      )}

      {/* GLOBAL HUD DECOR */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-20 hidden lg:block z-50">
        <div className="flex items-center gap-4 mono text-[10px] font-black tracking-widest text-white/40 mb-2">
           <Cpu size={14} />
           <span>CPU_TEMP: 34C</span>
        </div>
        <div className="flex items-center gap-4 mono text-[10px] font-black tracking-widest text-[#00e5ff] mb-2">
           <Wifi size={14} />
           <span>LATENCY: 12MS</span>
        </div>
        <div className="flex items-center gap-4 mono text-[10px] font-black tracking-widest text-[#ff2d55]">
           <Flame size={14} />
           <span>FLAME_INTENSITY: 100%</span>
        </div>
      </div>

      <MusicPlayer currentEmotion={currentEmotion} />
    </div>
  );
};

export default Sanctuary;
