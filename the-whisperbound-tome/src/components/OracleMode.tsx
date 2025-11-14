'use client';

import { useState } from 'react';
import { getRandomPrompt, OraclePrompt } from '@/lib/data/oraclePrompts';

export default function OracleMode() {
  const [currentPrompt, setCurrentPrompt] = useState<OraclePrompt | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);

  const drawPrompt = () => {
    setIsRevealing(true);
    setTimeout(() => {
      setCurrentPrompt(getRandomPrompt());
      setIsRevealing(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-serif ink-text tracking-wide">oracle mode</h2>
        <p className="text-sm ink-text-light italic max-w-2xl mx-auto leading-relaxed">
          when words escape you, the grimoire offers gentle guidance.
          no predictions, only companionship in your reflection
        </p>
      </div>

      {!currentPrompt && !isRevealing && (
        <div className="text-center py-16 space-y-8">
          <div 
            className="text-8xl mx-auto animate-pulse"
            style={{ 
              color: 'var(--cyan-arcane)',
              textShadow: '0 0 30px var(--cyan-arcane), 0 0 60px var(--cyan-deep)',
              filter: 'drop-shadow(0 0 20px var(--nebular-glow))'
            }}
          >
            ◈
          </div>
          <button
            onClick={drawPrompt}
            className="px-12 py-4 border-2 rounded transition-all duration-500 ink-text text-lg"
            style={{ 
              borderColor: 'var(--cyan-deep)',
              background: 'var(--obsidian-blue)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(61, 245, 255, 0.5)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ask the oracle
          </button>
        </div>
      )}

      {isRevealing && (
        <div className="text-center py-16 space-y-6">
          <div 
            className="text-8xl mx-auto animate-spin-slow"
            style={{ 
              color: 'var(--cyan-arcane)',
              textShadow: '0 0 30px var(--cyan-arcane)',
              animation: 'spin 3s linear infinite'
            }}
          >
            ◈
          </div>
          <p className="ink-text-light italic animate-pulse">
            the oracle contemplates...
          </p>
        </div>
      )}

      {currentPrompt && !isRevealing && (
        <div className="space-y-8 animate-fadeIn">
          <div 
            className="border-2 rounded-lg p-12 text-center space-y-8"
            style={{
              background: 'var(--obsidian-blue)',
              borderColor: currentPrompt.color,
              boxShadow: `0 0 40px ${currentPrompt.color}40`
            }}
          >
            <div 
              className="text-7xl mx-auto"
              style={{ 
                color: currentPrompt.color,
                textShadow: `0 0 20px ${currentPrompt.color}`,
                filter: `drop-shadow(0 0 15px ${currentPrompt.color})`
              }}
            >
              {currentPrompt.symbol}
            </div>

            <div className="space-y-6">
              <p className="text-2xl ink-text font-serif leading-relaxed">
                {currentPrompt.prompt}
              </p>

              <div className="ornamental-divider my-6">
                <span>✦</span>
              </div>

              <p className="text-sm ink-text-faded italic leading-loose max-w-xl mx-auto">
                {currentPrompt.anchorPhrase}
              </p>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-xs ink-text-light">
              sit with this question. let it breathe. there is no rush for answers
            </p>
            <button
              onClick={drawPrompt}
              className="px-8 py-3 border rounded transition-all duration-300 ink-text-faded text-sm"
              style={{ borderColor: 'var(--cyan-turquoise)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--slate-arcane)';
                e.currentTarget.style.boxShadow = '0 0 10px rgba(61, 245, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              draw another
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
