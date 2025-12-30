
import React from 'react';
import { ChatMessage } from '../types';
import { Hash, Terminal, Cpu } from 'lucide-react';

interface ChatArchiveDisplayProps {
  month: string;
  messages: ChatMessage[];
}

const ChatArchiveDisplay: React.FC<ChatArchiveDisplayProps> = ({ month, messages }) => {
  return (
    <div className="glass rounded-[30px] md:rounded-[40px] p-6 md:p-16 w-full max-w-4xl mx-auto space-y-8 md:space-y-16 shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/10 relative overflow-hidden group">
      {/* Visual background decor for the message log */}
      <div className="absolute top-0 right-0 p-4 md:p-8 opacity-5 pointer-events-none mono text-[6px] md:text-[8px] leading-tight">
        {`[DECRYPT_LOG]\nNODE: LOVE_CORE\nSTATUS: SYNCED\nCID: ${month.toUpperCase().replace(' ', '_')}\n##################`}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-6 md:pb-10 gap-4 md:gap-6 text-left">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-[#ff2d55]/10 border border-[#ff2d55]/30">
            <Terminal size={18} className="text-[#ff2d55] md:hidden" />
            <Terminal size={24} className="text-[#ff2d55] hidden md:block" />
          </div>
          <div className="flex flex-col">
            <span className="mono text-[8px] md:text-[10px] text-white/30 font-black tracking-widest uppercase">Channel_Session</span>
            <span className="serif italic text-3xl md:text-5xl font-bold">{month} Log</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 md:gap-4 mono text-[9px] md:text-[11px] text-[#00e5ff] tracking-[0.2em] md:tracking-[0.4em] font-black bg-black/40 px-4 md:px-6 py-2 md:py-3 rounded-full border border-white/5 uppercase w-fit">
          <Hash size={12} className="md:hidden" />
          <Hash size={14} className="hidden md:block" />
          Secured_Link
        </div>
      </div>
      
      <div className="space-y-8 md:space-y-12 relative z-10">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`flex flex-col group/msg ${msg.sender === 'me' ? 'items-end text-right' : 'items-start text-left'}`}
          >
            <div className={`max-w-[90%] md:max-w-[85%] rounded-[20px] md:rounded-[30px] p-6 md:p-10 transition-all duration-500 border relative ${
              msg.sender === 'me' 
              ? 'bg-[#00e5ff]/5 border-[#00e5ff]/20 hover:border-[#00e5ff]/50 rounded-tr-none shadow-[0_20px_40px_rgba(0,0,0,0.3)]' 
              : 'bg-white/5 border-white/10 hover:border-white/30 rounded-tl-none shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
            }`}>
              {/* Message Header Decor */}
              <div className={`flex items-center gap-2 md:gap-3 mb-3 md:mb-4 opacity-30 mono text-[7px] md:text-[9px] uppercase tracking-widest font-black ${msg.sender === 'me' ? 'flex-row-reverse' : ''}`}>
                <Cpu size={10} className="md:hidden" />
                <Cpu size={12} className="hidden md:block" />
                <span>Src: {msg.sender === 'me' ? 'LUCIAN' : 'CHINECHEREM'}</span>
              </div>

              <p className="serif text-xl md:text-3xl lg:text-4xl italic mb-4 md:mb-6 leading-relaxed md:leading-[1.3] text-white/95 font-light">{msg.message}</p>
              
              <div className={`flex items-center gap-3 md:gap-4 mono text-[8px] md:text-[10px] opacity-40 uppercase tracking-[0.2em] md:tracking-[0.3em] font-black ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[#ff2d55]">{msg.sender === 'me' ? 'LUCIAN' : 'CHINECHEREM'}</span>
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white/20"></span>
                <span className="text-[#00e5ff]">{msg.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-6 md:pt-10 flex justify-center opacity-10">
        <div className="w-16 md:w-24 h-[1px] bg-white"></div>
        <div className="mono text-[6px] md:text-[8px] px-2 md:px-4 font-black tracking-widest uppercase">End_Log</div>
        <div className="w-16 md:w-24 h-[1px] bg-white"></div>
      </div>
    </div>
  );
};

export default ChatArchiveDisplay;
