"use client";

import { UserProgress } from "@/lib/progression";

interface ProgressViewProps {
  progress: UserProgress;
}

export default function ProgressView({ progress }: ProgressViewProps) {
  const experienceToNextLevel = Math.pow(progress.level, 2) * 10;
  const progressPercent = (progress.experience / experienceToNextLevel) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-inkReveal">
      <div className="text-center space-y-4">
        <h2
          className="text-4xl font-serif tracking-[0.2em] ink-text"
          style={{ fontVariant: "small-caps" }}
        >
          Your Journey
        </h2>
        <div className="ornamental-divider my-4">
          <span>✦</span>
        </div>
      </div>

      <div className="parchment-border p-8 rounded space-y-6">
        <div className="text-center space-y-3">
          <div className="text-6xl ink-text">✦</div>
          <h3 className="text-3xl font-serif tracking-[0.2em] ink-text">Level {progress.level}</h3>
          <p className="text-sm ink-text-light italic">
            {progress.experience} / {experienceToNextLevel} experience
          </p>
        </div>

        <div className="w-full bg-[var(--sepia)] rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-[var(--ink-faded)] transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--ink-light)] border-opacity-30">
          <div className="text-center">
            <div className="text-3xl ink-text mb-2">{progress.spellsCreated}</div>
            <div className="text-xs ink-text-light tracking-widest uppercase">Spells Created</div>
          </div>
          <div className="text-center">
            <div className="text-3xl ink-text mb-2">{progress.achievements.length}</div>
            <div className="text-xs ink-text-light tracking-widest uppercase">Achievements</div>
          </div>
          <div className="text-center">
            <div className="text-3xl ink-text mb-2">{progress.unlockedCategories.length}</div>
            <div className="text-xs ink-text-light tracking-widest uppercase">Categories</div>
          </div>
        </div>
      </div>

      <div className="parchment-border p-6 rounded space-y-4">
        <h3
          className="text-xl font-serif tracking-[0.2em] ink-text text-center"
          style={{ fontVariant: "small-caps" }}
        >
          Unlocked Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {progress.unlockedCategories.map((category) => (
            <div
              key={category}
              className="px-4 py-2 parchment-border rounded text-sm ink-text tracking-widest uppercase"
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center parchment-border p-6 rounded">
        <p className="text-sm ink-text-faded italic leading-relaxed">
          {progress.mysteryLevel >= 8
            ? "you have become one with the grimoire..."
            : progress.mysteryLevel >= 5
            ? "the tome reveals its true nature..."
            : progress.mysteryLevel >= 3
            ? "shadows part to reveal hidden knowledge..."
            : "the tome begins to recognize your voice..."}
        </p>
      </div>
    </div>
  );
}
