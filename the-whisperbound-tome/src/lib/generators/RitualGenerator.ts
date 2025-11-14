import { IntentCategory, Ritual } from "../types";
import { INTENT_CORPUS } from "../data/intentCorpus";

export class RitualGenerator {
  private durations = [
    "until dawn",
    "three breaths",
    "until the flame dies",
    "until the air is still",
    "while the moon wanes",
    "until silence falls",
    "through the night",
    "until dusk",
  ];

  generate(seed: number, intent: IntentCategory): Ritual {
    const ritualSteps = [...INTENT_CORPUS[intent].ritualSteps];
    const rand = this.createPRNG(seed);

    const stepCount = 3 + (rand() % 3);
    const selectedSteps: string[] = [];
    const usedIndices = new Set<number>();

    while (selectedSteps.length < stepCount && usedIndices.size < ritualSteps.length) {
      const index = rand() % ritualSteps.length;
      if (!usedIndices.has(index)) {
        usedIndices.add(index);
        selectedSteps.push(ritualSteps[index]);
      }
    }

    const duration = this.durations[rand() % this.durations.length];

    return {
      steps: selectedSteps.map((action) => ({ action })),
      duration,
    };
  }

  private createPRNG(seed: number): () => number {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state;
    };
  }
}
