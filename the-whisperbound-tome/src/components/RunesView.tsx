"use client";

import { useState } from "react";
import { ELDER_FUTHARK_RUNES, Rune } from "@/lib/data/runes";

export default function RunesView() {
  const [selectedRune, setSelectedRune] = useState<Rune | null>(null);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-inkReveal">
      <div className="text-center space-y-4">
        <h2
          className="text-4xl font-serif tracking-[0.2em] ink-text"
          style={{ fontVariant: "small-caps" }}
        >
          Elder Futhark Runes
        </h2>
        <div className="ornamental-divider my-4">
          <span>❖</span>
        </div>
        <p className="text-sm ink-text-light italic max-w-2xl mx-auto leading-relaxed">
          ancient symbols of power and wisdom from the norse tradition
          <br />
          each rune carries its own meaning and energy
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ELDER_FUTHARK_RUNES.map((rune) => (
          <button
            key={rune.name}
            onClick={() => setSelectedRune(rune)}
            className="parchment-border p-4 rounded text-center hover:shadow-lg transition-all duration-500 space-y-2"
          >
            <div className="text-5xl ink-text">{rune.symbol}</div>
            <div className="text-xs ink-text-faded tracking-widest uppercase">
              {rune.name}
            </div>
          </button>
        ))}
      </div>

      {selectedRune && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="parchment-border p-8 rounded-lg max-w-lg w-full space-y-6 animate-inkReveal relative">
            <button
              onClick={() => setSelectedRune(null)}
              className="absolute top-4 right-4 text-2xl ink-text-light hover:ink-text transition-all duration-300"
            >
              ✕
            </button>

            <div className="text-center space-y-4">
              <div className="text-7xl ink-text mb-4">{selectedRune.symbol}</div>
              
              <h3
                className="text-3xl font-serif tracking-[0.2em] ink-text"
                style={{ fontVariant: "small-caps" }}
              >
                {selectedRune.name}
              </h3>

              <div className="ornamental-divider my-4">
                <span>✦</span>
              </div>

              <p className="text-lg italic" style={{ color: '#3d2817' }}>{selectedRune.meaning}</p>

              <div className="pt-4 border-t border-[var(--ink-light)] border-opacity-30">
                <p className="text-sm leading-relaxed" style={{ color: '#4a3422' }}>
                  {selectedRune.description}
                </p>
              </div>

              <div className="pt-4">
                <p className="text-xs tracking-widest uppercase mb-3" style={{ color: '#5a4432' }}>
                  Keywords
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedRune.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-3 py-1 parchment-border rounded text-xs tracking-wide"
                      style={{ color: '#4a3422' }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
