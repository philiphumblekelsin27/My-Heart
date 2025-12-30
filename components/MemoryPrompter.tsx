
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Sparkles, Loader2, Cpu, Utensils } from 'lucide-react';

const MemoryPrompter: React.FC = () => {
  const [prompt, setPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generatePrompt = async () => {
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are LUCIAN_OS, an advanced AI securing a love archive. Chinecherem is a talented chef and Lucian is into cybersecurity and programming. Generate a poetic, brief writing prompt that combines metaphors of cooking and code. Make it deeply romantic. 1-2 sentences max.",
      });
      
      const text = response.text;
      setPrompt(text || "Reflect on the exact temperature of your heart when the connection finally synced.");
    } catch (error) {
      console.error("LUCIAN_OS offline:", error);
      setPrompt("Initializing protocol: Describe the secret ingredient you found in our digital distance.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center space-y-10 glass p-12 rounded-[50px] border border-white/5 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00e5ff] to-[#ff2d55]"></div>
      
      <div className="flex justify-center gap-6 mb-4 items-center">
        <Cpu size={32} className="text-[#00e5ff] animate-pulse" />
        <div className="w-[1px] h-8 bg-white/10"></div>
        <Utensils size={32} className="text-[#ff2d55] animate-pulse" />
      </div>
      
      <div className="font-mono text-[10px] tracking-[0.5em] text-[#00e5ff] uppercase font-black">
        LUCIAN_OS :: RECIPE_BRAINSTORM_PROTOCOL
      </div>

      <h4 className="serif italic text-3xl md:text-5xl font-bold text-white leading-tight">"May I suggest a reflection for the archive?"</h4>
      
      {prompt && (
        <div className="relative group max-w-2xl mx-auto">
           <div className="absolute -inset-1 bg-gradient-to-r from-[#00e5ff]/20 to-[#ff2d55]/20 blur opacity-30"></div>
           <p className="relative serif text-2xl text-white italic leading-relaxed py-8 px-10 border-x border-white/10 font-medium">
            {prompt}
           </p>
        </div>
      )}

      <button
        onClick={generatePrompt}
        disabled={isLoading}
        className="px-12 py-5 bg-white/5 border border-white/10 text-[11px] font-mono font-black tracking-[0.4em] text-white hover:bg-[#00e5ff]/10 hover:border-[#00e5ff]/40 transition-all flex items-center gap-4 mx-auto disabled:opacity-50 uppercase rounded-full"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Compiling Ingredients...
          </>
        ) : (
          prompt ? 'Generate New Log Entry' : 'Start Neural Analysis'
        )}
      </button>
      
      <div className="text-[8px] font-mono text-white/20 mt-4 uppercase tracking-[0.5em] font-bold">
         SECURE_UPLINK_STABLE // AUTH: LUCIAN_CORE
      </div>
    </div>
  );
};

export default MemoryPrompter;
