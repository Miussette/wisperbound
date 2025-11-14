import { IntentCategory } from "./types";

const intentKeywords: Record<IntentCategory, string[]> = {
  [IntentCategory.PROTECTION]: ["safe", "guard", "shield", "ward"],
  [IntentCategory.REVELATION]: ["know", "truth", "see", "understand", "find"],
  [IntentCategory.BINDING]: ["bind", "hold", "trap", "contain"],
  [IntentCategory.TRANSFORMATION]: ["change", "become", "shift"],
  [IntentCategory.SUMMONING]: ["call", "summon", "invoke"],
  [IntentCategory.BANISHMENT]: ["banish", "remove", "expel", "cast out"],
  [IntentCategory.PRESERVATION]: ["keep", "remember", "preserve"],
  [IntentCategory.PASSAGE]: ["cross", "go", "travel", "pass", "move"],
};

export class IntentClassifier {
  classify(whisper: string): IntentCategory {
    const w = whisper.toLowerCase();
    for (const intent of Object.values(IntentCategory)) {
      const words = intentKeywords[intent];
      if (words.some((k) => w.includes(k))) return intent;
    }
    return IntentCategory.REVELATION; // fallback
  }
}
