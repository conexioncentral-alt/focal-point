import React from 'react';
import { splitWordAtORP } from '../engine/orp';

interface ReaderProps {
  word: string;
  style?: React.CSSProperties;
}

export const Reader: React.FC<ReaderProps> = ({ word, style }) => {
  const { left, pivot, right } = splitWordAtORP(word);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 select-none">
      {/* RSVP Container */}
      <div className="relative w-full max-w-2xl py-16 border-y border-subtle/30 bg-subtle/5 backdrop-blur-sm rounded-lg flex-center flex-col">
        
        {/* Top Focus Guide Mark */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-6 bg-accent/40"></div>
          <div className="w-2 h-2 rotate-45 border-r border-b border-accent bg-background -mt-1"></div>
        </div>

        {/* Bottom Focus Guide Mark */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-2 h-2 rotate-45 border-l border-t border-accent bg-background -mb-1 z-10"></div>
          <div className="w-[2px] h-6 bg-accent/40"></div>
        </div>

        {/* Word Display with perfect ORP Center Alignment */}
        <div 
          className="flex w-full font-mono tracking-tight items-center justify-center py-4"
          style={style}
        >
          {/* Left part of the word (right-aligned to center point) */}
          <span className="text-right flex-1 text-primary opacity-40 select-none overflow-hidden whitespace-nowrap">
            {left}
          </span>
          
          {/* Pivot Letter (ORP) - bolded, highlighted in accent orange, centered */}
          <span className="text-accent font-bold text-center inline-block w-[1.1ch] select-none transition-transform duration-75 scale-105">
            {pivot}
          </span>
          
          {/* Right part of the word (left-aligned to center point) */}
          <span className="text-left flex-1 text-primary opacity-80 select-none overflow-hidden whitespace-nowrap">
            {right}
          </span>
        </div>
      </div>
    </div>
  );
};
