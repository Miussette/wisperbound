"use client";

import { useState } from "react";
import { SavedSpell } from "@/lib/auth";
import { getElementalSymbol } from "@/lib/data/elementalSymbols";
import { IntentCategory } from "@/lib/types";

interface GrimoireViewProps {
  spells: SavedSpell[];
  onClose: () => void;
  onDelete: (spellId: string) => void;
  onView: (spell: SavedSpell) => void;
  userLevel: number;
  achievements: number;
}

export default function GrimoireView({ spells, onClose, onDelete, onView, userLevel, achievements }: GrimoireViewProps) {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["all", "protection", "revelation", "binding", "transformation", "summoning", "banishment", "preservation", "passage"];

  const filteredSpells = spells.filter((spell) => {
    const matchesFilter = filter === "all" || spell.intent === filter;
    const matchesSearch = spell.whisper.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const spellsByCategory = categories.reduce((acc, cat) => {
    if (cat === "all") return acc;
    acc[cat] = spells.filter((s) => s.intent === cat).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="parchment-border p-8 rounded-lg max-w-5xl w-full my-8 space-y-6 animate-inkReveal max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl ink-text-light hover:ink-text transition-all duration-300 z-10"
          title="Close"
        >
          ✕
        </button>

        <div className="text-center space-y-2 sticky top-0 bg-[var(--parchment)] pb-4 z-10">
          <h2 className="text-3xl font-serif tracking-[0.2em] ink-text" style={{ fontVariant: "small-caps" }}>
            Your Grimoire
          </h2>
          <div className="ornamental-divider my-4">
            <span>❖</span>
          </div>
          <div className="flex justify-center gap-6 text-xs ink-text-light">
            <span>Level {userLevel}</span>
            <span>•</span>
            <span>{spells.length} {spells.length === 1 ? "spell" : "spells"}</span>
            <span>•</span>
            <span>{achievements} achievements</span>
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="search your spells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-b-2 border-[var(--ink-light)] ink-text text-center outline-none p-2 text-sm tracking-wide focus:border-[var(--ink-faded)] transition-all duration-500"
          />

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 text-xs tracking-widest uppercase transition-all duration-300 rounded ${
                  filter === cat
                    ? "parchment-border shadow-md"
                    : "border border-[var(--ink-light)] hover:parchment-border"
                }`}
                style={{
                  backgroundColor: filter === cat ? '#d4c4a8' : 'transparent',
                  color: filter === cat ? '#2a1810' : '#5a4838',
                }}
              >
                {cat} {cat !== "all" && spellsByCategory[cat] > 0 && `(${spellsByCategory[cat]})`}
              </button>
            ))}
          </div>
        </div>

        {filteredSpells.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg ink-text-faded italic">
              {searchTerm || filter !== "all"
                ? "no spells found..."
                : "your grimoire awaits its first inscription..."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSpells.map((savedSpell) => {
              const symbol = getElementalSymbol(savedSpell.intent as IntentCategory);
              return (
                <div
                  key={savedSpell.id}
                  className="p-4 rounded space-y-3 transition-all duration-500 cursor-pointer border-2"
                  style={{
                    background: "var(--slate-arcane)",
                    borderColor: "var(--cyan-turquoise)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = symbol.color;
                    e.currentTarget.style.boxShadow = `0 0 15px ${symbol.glowColor}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--cyan-turquoise)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onClick={() => onView(savedSpell)}
                >
                  <div className="flex items-start gap-3">
                    <span 
                      className="text-3xl" 
                      style={{ 
                        color: symbol.color,
                        textShadow: `0 0 10px ${symbol.glowColor}`
                      }}
                    >
                      {symbol.symbol}
                    </span>
                    <div className="flex-1 space-y-2">
                      <p className="text-sm ink-text-faded italic line-clamp-2">
                        "{savedSpell.whisper}"
                      </p>
                      <p className="text-xs ink-text-light tracking-widest uppercase">
                        {symbol.element}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-opacity-30" style={{ borderColor: "var(--cyan-turquoise)" }}>
                    <pre className="text-xs ink-text-faded font-mono text-center leading-relaxed">
                      {savedSpell.spell.sigil.lines.slice(0, 2).join("\n")}
                    </pre>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-xs ink-text-light">
                      {new Date(savedSpell.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(savedSpell.id);
                      }}
                      className="text-xs ink-text-light hover:ink-text transition-all"
                    >
                      remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center pt-6 border-t border-[var(--ink-light)] border-opacity-30">
          <button
            onClick={onClose}
            className="text-sm ink-text-light hover:ink-text-faded transition-all duration-500 tracking-[0.2em] uppercase"
          >
            Close Grimoire
          </button>
        </div>
      </div>
    </div>
  );
}
