export interface UserProgress {
  userId: string;
  level: number;
  experience: number;
  spellsCreated: number;
  achievements: Achievement[];
  unlockedCategories: string[];
  mysteryLevel: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  unlockedAt: number;
  icon: string;
}

export class ProgressionService {
  private static PROGRESS_KEY = "whisperbound_progress";

  static getProgress(userId: string): UserProgress {
    const allProgress = this.getAllProgress();
    return allProgress[userId] || this.createNewProgress(userId);
  }

  static addExperience(userId: string, amount: number): UserProgress {
    const progress = this.getProgress(userId);
    progress.experience += amount;
    progress.spellsCreated += 1;

    const oldLevel = progress.level;
    progress.level = this.calculateLevel(progress.experience);

    if (progress.level > oldLevel) {
      this.unlockNewCategory(progress);
    }

    this.checkAchievements(progress);
    this.saveProgress(userId, progress);

    return progress;
  }

  private static calculateLevel(experience: number): number {
    return Math.floor(Math.sqrt(experience / 10)) + 1;
  }

  private static unlockNewCategory(progress: UserProgress): void {
    const categories = [
      "protection",
      "revelation",
      "binding",
      "transformation",
      "summoning",
      "banishment",
      "preservation",
      "passage",
    ];

    const nextCategory = categories[progress.unlockedCategories.length];
    if (nextCategory && !progress.unlockedCategories.includes(nextCategory)) {
      progress.unlockedCategories.push(nextCategory);
      progress.mysteryLevel += 1;
    }
  }

  private static checkAchievements(progress: UserProgress): void {
    const achievements: Achievement[] = [
      {
        id: "first_whisper",
        name: "First Whisper",
        description: "spoke your first words to the tome",
        unlockedAt: Date.now(),
        icon: "✦",
      },
      {
        id: "apprentice",
        name: "Apprentice",
        description: "created 5 spells",
        unlockedAt: Date.now(),
        icon: "◆",
      },
      {
        id: "adept",
        name: "Adept",
        description: "created 10 spells",
        unlockedAt: Date.now(),
        icon: "◯",
      },
      {
        id: "master",
        name: "Master",
        description: "created 25 spells",
        unlockedAt: Date.now(),
        icon: "⊙",
      },
      {
        id: "archmage",
        name: "Archmage",
        description: "created 50 spells",
        unlockedAt: Date.now(),
        icon: "∞",
      },
    ];

    achievements.forEach((achievement) => {
      if (this.shouldUnlockAchievement(progress, achievement)) {
        if (!progress.achievements.find((a) => a.id === achievement.id)) {
          progress.achievements.push(achievement);
        }
      }
    });
  }

  private static shouldUnlockAchievement(
    progress: UserProgress,
    achievement: Achievement
  ): boolean {
    switch (achievement.id) {
      case "first_whisper":
        return progress.spellsCreated >= 1;
      case "apprentice":
        return progress.spellsCreated >= 5;
      case "adept":
        return progress.spellsCreated >= 10;
      case "master":
        return progress.spellsCreated >= 25;
      case "archmage":
        return progress.spellsCreated >= 50;
      default:
        return false;
    }
  }

  private static createNewProgress(userId: string): UserProgress {
    return {
      userId,
      level: 1,
      experience: 0,
      spellsCreated: 0,
      achievements: [],
      unlockedCategories: ["revelation", "protection"],
      mysteryLevel: 1,
    };
  }

  private static saveProgress(userId: string, progress: UserProgress): void {
    const allProgress = this.getAllProgress();
    allProgress[userId] = progress;
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(allProgress));
  }

  private static getAllProgress(): Record<string, UserProgress> {
    const progressJson = localStorage.getItem(this.PROGRESS_KEY);
    return progressJson ? JSON.parse(progressJson) : {};
  }

  static getMysteryMessage(level: number): string {
    const messages = [
      "the tome begins to recognize your voice...",
      "ancient words stir in the depths...",
      "the pages whisper secrets long forgotten...",
      "shadows part to reveal hidden knowledge...",
      "the veil grows thin between worlds...",
      "power flows through your words...",
      "the tome reveals its true nature...",
      "you have become one with the grimoire...",
    ];

    return messages[Math.min(level - 1, messages.length - 1)];
  }
}
