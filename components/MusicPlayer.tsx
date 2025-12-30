
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward } from 'lucide-react';
import { Emotion } from '../types';
import { PLAYLIST } from '../constants';

interface MusicPlayerProps {
  currentEmotion: Emotion;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentEmotion }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [trackIndex, setTrackIndex] = useState(0);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Shuffle indices on first load
    const indices = Array.from({ length: PLAYLIST.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setShuffledIndices(indices);
    
    const savedVol = localStorage.getItem('love_archive_volume');
    if (savedVol) setVolume(parseFloat(savedVol));
  }, []);

  const handleNextTrack = () => {
    if (shuffledIndices.length === 0) return;
    const nextLocalIdx = (trackIndex + 1) % shuffledIndices.length;
    setTrackIndex(nextLocalIdx);
    
    const actualTrackIdx = shuffledIndices[nextLocalIdx];
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[actualTrackIdx];
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Auto-play blocked"));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) {
        const actualTrackIdx = shuffledIndices.length > 0 ? shuffledIndices[trackIndex] : 0;
        audioRef.current = new Audio(PLAYLIST[actualTrackIdx]);
        audioRef.current.loop = false;
        audioRef.current.volume = volume;
        audioRef.current.onended = () => {
            handleNextTrack();
        };
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("User interaction required"));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) audioRef.current.volume = newVol;
    localStorage.setItem('love_archive_volume', newVol.toString());
  };

  return (
    <div className="fixed top-8 right-8 z-[100] flex items-center gap-6 group">
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-4 bg-white/40 p-2 rounded-full border border-black/5">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume} 
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-black/20 appearance-none rounded-full cursor-pointer accent-black/60"
        />
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={togglePlay}
          className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:text-black/90 hover:bg-black/10 transition-all bg-white/20 shadow-sm"
          title={isPlaying ? "Pause Score" : "Play Score"}
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={handleNextTrack}
          className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-black/60 hover:text-black/90 hover:bg-black/10 transition-all bg-white/20 shadow-sm"
          title="Next Movement"
        >
          <SkipForward size={18} fill="currentColor" />
        </button>
      </div>

      <div className="absolute -bottom-7 right-0 text-[9px] font-black uppercase tracking-[0.2em] text-black/40 whitespace-nowrap bg-white/30 px-2 rounded-sm border border-black/5">
        Master Level: {Math.round(volume * 100)}%
      </div>
    </div>
  );
};

export default MusicPlayer;
