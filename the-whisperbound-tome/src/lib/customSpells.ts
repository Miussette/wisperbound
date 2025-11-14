import { IntentCategory } from "./types";

export interface CustomSpell {
  id: string;
  userId: string;
  name: string;
  category: IntentCategory;
  description: string;
  incantation: string;
  materials: string[];
  steps: string[];
  createdAt: number;
}

export class CustomSpellService {
  private static STORAGE_KEY = "whisperbound_custom_spells";

  static getAllSpells(userId: string): CustomSpell[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    
    const allSpells = JSON.parse(data);
    return allSpells[userId] || [];
  }

  static saveSpell(spell: CustomSpell): void {
    if (typeof window === "undefined") return;
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    const allSpells = data ? JSON.parse(data) : {};
    
    if (!allSpells[spell.userId]) {
      allSpells[spell.userId] = [];
    }
    
    allSpells[spell.userId].push(spell);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allSpells));
  }

  static updateSpell(userId: string, spellId: string, updates: Partial<CustomSpell>): void {
    if (typeof window === "undefined") return;
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return;
    
    const allSpells = JSON.parse(data);
    if (!allSpells[userId]) return;
    
    const spellIndex = allSpells[userId].findIndex((s: CustomSpell) => s.id === spellId);
    if (spellIndex === -1) return;
    
    allSpells[userId][spellIndex] = {
      ...allSpells[userId][spellIndex],
      ...updates
    };
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allSpells));
  }

  static deleteSpell(userId: string, spellId: string): void {
    if (typeof window === "undefined") return;
    
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (!data) return;
    
    const allSpells = JSON.parse(data);
    if (!allSpells[userId]) return;
    
    allSpells[userId] = allSpells[userId].filter((s: CustomSpell) => s.id !== spellId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(allSpells));
  }

  static generateId(): string {
    return `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
