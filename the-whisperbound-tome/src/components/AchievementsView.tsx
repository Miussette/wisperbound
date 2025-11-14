"use client";

import { Achievement } from "@/lib/progression";

interface AchievementsViewProps {
  achievements: Achievement[];
  totalSpells: number;
}

export default function AchievementsView({ achievements, totalSpells }: AchievementsViewProps) {
  const allAchievements = [
    { id: "first_whisper", name: "First Whisper", description: "spoke your first words to the tome", icon: "✦", requirement: 1 },
    { id: "apprentice", name: "Apprentice", description: "created 5 spells", icon: "◆", requirement: 5 },
    { id: "adept", name: "Adept", description: "created 10 spells", icon: "◯", requirement: 10 },
    { id: "master", name: "Master", description: "created 25 spells", icon: "⊙", requirement: 25 },
    { id: "archmage", name: "Archmage", description: "created 50 spells", icon: "∞", requirement: 50 },
  ];

  const isUnlocked = (achievementId: string) => {
    return achievements.some((a) => a.id === achievementId);
  };

  const getProgress = (requirement: number) => {
    return Math.min((totalSpells / requirement) * 100, 100);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-inkReveal">
      <div className="text-center space-y-4">
        <h2
          className="text-4xl font-serif tracking-[0.2em] ink-text"
          style={{ fontVariant: "small-caps" }}
        >
          Achievements
        </h2>
        <div className="ornamental-divider my-4">
          <span>❖</span>
        </div>
        <p className="text-sm ink-text-light italic">
          {achievements.length} of {allAchievements.length} unlocked
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allAchievements.map((achievement) => {
          const unlocked = isUnlocked(achievement.id);
          const progress = getProgress(achievement.requirement);

          return (
            <div
              key={achievement.id}
              className={`parchment-border p-6 rounded space-y-4 transition-all duration-500 ${
                unlocked ? "shadow-lg" : "opacity-60"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`text-5xl ${unlocked ? "ink-text" : "ink-text-light"}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl font-serif tracking-[0.15em] mb-2 ${
                      unlocked ? "ink-text" : "ink-text-faded"
                    }`}
                    style={{ fontVariant: "small-caps" }}
                  >
                    {achievement.name}
                  </h3>
                  <p className="text-sm ink-text-light italic">{achievement.description}</p>
                </div>
              </div>

              {!unlocked && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs ink-text-light">
                    <span>Progress</span>
                    <span>
                      {totalSpells} / {achievement.requirement}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--sepia)] rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-[var(--ink-light)] transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              {unlocked && (
                <div className="text-center pt-2 border-t border-[var(--ink-light)] border-opacity-30">
                  <p className="text-xs ink-text-light italic">
                    unlocked {new Date(achievements.find((a) => a.id === achievement.id)?.unlockedAt || 0).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
