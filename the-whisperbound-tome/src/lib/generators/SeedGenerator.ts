import { IntentCategory } from "../types";

export class SeedGenerator {
  private fnv1a(str: string): number {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  generateSeed(whisper: string, intent: IntentCategory): number {
    const normalizedWhisper = whisper.trim().toLowerCase();
    const combined = `${normalizedWhisper}|${intent}`;
    return this.fnv1a(combined);
  }

  createSubSeed(baseSeed: number, component: string): number {
    return this.fnv1a(`${baseSeed}|${component}`);
  }
}
