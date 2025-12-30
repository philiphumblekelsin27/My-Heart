
import React, { useState, useEffect } from 'react';
import LoginGate from './components/LoginGate';
import Sanctuary from './components/Sanctuary';
import NewYearGreeting from './components/NewYearGreeting';
import { AppState, Emotion } from './types';
import { Loader2, Heart } from 'lucide-react';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isAuthenticated: false,
    currentEmotion: 'peace'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showGreeting, setShowGreeting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const isAuth = localStorage.getItem('love_archive_auth') === 'true';
    if (isAuth) {
      setState(prev => ({ ...prev, isAuthenticated: true }));
    }

    // Simulate slow system boot
    const timer = setInterval(() => {
      setLoadProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            // Show new year greeting first if not already viewed in this session
            const hasSeenSessionGreeting = sessionStorage.getItem('seen_ny_greeting');
            if (!hasSeenSessionGreeting) {
              setShowGreeting(true);
            }
          }, 1200);
          return 100;
        }
        return prev + 0.6;
      });
    }, 40);

    return () => clearInterval(timer);
  }, []);

  const handleLogin = () => {
    setState(prev => ({ ...prev, isAuthenticated: true }));
    localStorage.setItem('love_archive_auth', 'true');
  };

  const handleGreetingComplete = () => {
    setShowGreeting(false);
    sessionStorage.setItem('seen_ny_greeting', 'true');
  };

  const changeEmotion = (emotion: Emotion) => {
    setState(prev => ({ ...prev, currentEmotion: emotion }));
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full bg-[#02060a] flex flex-col items-center justify-center text-[#00e5ff] mono p-8 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-40 scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=1920")' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#02060a] via-transparent to-[#02060a]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-12">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#00e5ff]/20 flex items-center justify-center bg-black/40 backdrop-blur-xl">
               <Heart size={48} className="heart-pulse text-[#ff2d55]" fill="currentColor" />
            </div>
            <div className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-t-4 border-[#00e5ff] animate-spin"></div>
          </div>
          
          <div className="w-64 md:w-96 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6 border border-white/5">
            <div className="h-full bg-gradient-to-r from-[#00e5ff] to-[#ff2d55] transition-all duration-300 shadow-[0_0_20px_#00e5ff]" style={{ width: `${loadProgress}%` }}></div>
          </div>
          
          <div className="text-[10px] md:text-[12px] tracking-[0.5em] md:tracking-[0.8em] uppercase font-black text-center max-w-xs md:max-w-md">
            {loadProgress < 30 ? 'Initializing LUCIAN_OS_v2.5...' : loadProgress < 60 ? 'Synchronizing Heart_Core...' : loadProgress < 90 ? 'Authenticating CHINECHEREM_STATION...' : 'Finalizing Love Protocol...'}
          </div>
          
          <div className="mt-4 text-[14px] font-black opacity-80">{Math.floor(loadProgress)}%</div>
        </div>
      </div>
    );
  }

  if (showGreeting) {
    return <NewYearGreeting onProceed={handleGreetingComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#02060a]">
      {!state.isAuthenticated ? (
        <LoginGate onLogin={handleLogin} />
      ) : (
        <Sanctuary 
          currentEmotion={state.currentEmotion} 
          onEmotionChange={changeEmotion} 
        />
      )}
    </div>
  );
};

export default App;
