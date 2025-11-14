"use client";

import { useState } from "react";

interface GrimoireSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  userLevel: number;
  spellCount: number;
  achievementCount: number;
}

export default function GrimoireSidebar({
  currentView,
  onNavigate,
  userLevel,
  spellCount,
  achievementCount,
}: GrimoireSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: "create", label: "Create Spell", icon: "◆", description: "whisper to the tome" },
    { id: "oracle", label: "Oracle Mode", icon: "◈", description: "gentle guidance" },
    { id: "rituals", label: "Guided Rituals", icon: "◎", description: "breathing & peace" },
    { id: "grimoire", label: "Grimoire", icon: "◯", description: `${spellCount} inscribed` },
    { id: "custom", label: "Custom Spells", icon: "✎", description: "your own rituals" },
    { id: "runes", label: "Runes & Seals", icon: "ᚱ", description: "ancient symbols" },
    { id: "bestiary", label: "Bestiary", icon: "△", description: "entities & echoes" },
    { id: "artifacts", label: "Artifacts", icon: "◈", description: "objects of power" },
    { id: "progress", label: "Progress", icon: "✦", description: `level ${userLevel}` },
    { id: "achievements", label: "Achievements", icon: "⚔", description: `${achievementCount} unlocked` },
  ];

  return (
    <>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed top-4 left-4 z-50 text-2xl ink-text-light hover:ink-text transition-all duration-300"
        title={isExpanded ? "Close menu" : "Open menu"}
      >
        {isExpanded ? "✕" : "☰"}
      </button>

      <aside
        className={`fixed left-0 top-0 h-full border-r-2 shadow-2xl transition-transform duration-500 z-40 ${
          isExpanded ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ 
          width: "280px",
          background: "var(--obsidian-blue)",
          borderColor: "var(--cyan-deep)",
          boxShadow: "0 0 30px rgba(61, 245, 255, 0.3)"
        }}
      >
        <div className="p-6 space-y-8 h-full overflow-y-auto">
          <div className="text-center pt-8 space-y-3">
            <h2
              className="text-2xl font-serif tracking-[0.2em] ink-text"
              style={{ fontVariant: "small-caps" }}
            >
              The Whisperbound
            </h2>
            <div className="ornamental-divider my-3">
              <span>❖</span>
            </div>
            <p className="text-xs ink-text-light italic">grimoire</p>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full text-left p-4 rounded transition-all duration-300 ${
                  currentView === item.id
                    ? "parchment-border ink-text shadow-md"
                    : "ink-text-faded hover:ink-text hover:parchment-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-1">{item.icon}</span>
                  <div className="flex-1">
                    <div
                      className="text-sm tracking-[0.15em] mb-1"
                      style={{ fontVariant: "small-caps" }}
                    >
                      {item.label}
                    </div>
                    <div className="text-xs ink-text-light italic">{item.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-opacity-30" style={{ borderColor: "var(--cyan-turquoise)" }}>
            <div className="text-center space-y-2">
              <p className="text-xs ink-text-light tracking-widest uppercase">Your Progress</p>
              <div className="space-y-1 text-xs ink-text-faded">
                <div className="flex justify-between">
                  <span>Level</span>
                  <span className="ink-text">{userLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Spells</span>
                  <span className="ink-text">{spellCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Achievements</span>
                  <span className="ink-text">{achievementCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

    </>
  );
}
