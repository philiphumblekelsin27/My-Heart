import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 100, className = '', onComplete }) => {
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const words = text.split(' ');

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        setDisplayedText((prev) => [...prev, words[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText.map((word, i) => (
        <span key={i} className="inline-block animate-fade-in mr-[0.25em]">
          {word}
        </span>
      ))}
      <span className="inline-block w-[2px] h-[1em] bg-[#ff2d55] ml-1 animate-pulse align-middle" />
    </span>
  );
};

export default TypewriterText;