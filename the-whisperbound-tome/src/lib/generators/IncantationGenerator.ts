import { IntentCategory, Incantation } from "../types";
import { INTENT_CORPUS } from "../data/intentCorpus";
import { LEXICON } from "../data/lexicon";

export class IncantationGenerator {
  generate(seed: number, intent: IntentCategory): Incantation {
    const templates = [...INTENT_CORPUS[intent].templates];
    const metaphors = [...INTENT_CORPUS[intent].metaphors];
    const rand = this.createPRNG(seed);

    const lineCount = 2 + (rand() % 3);
    const lines: string[] = [];

    for (let i = 0; i < lineCount; i++) {
      const template = templates[rand() % templates.length];
      const line = this.fillTemplate(template, rand);
      lines.push(line);
    }

    const metaphor = metaphors[rand() % metaphors.length];
    const syllableCount = lines.map(() => 8 + (rand() % 5));

    return {
      lines,
      syllableCount,
      metaphor,
    };
  }

  private fillTemplate(template: string, rand: () => number): string {
    let result = template;

    const replacements: Record<string, readonly string[]> = {
      temporal: LEXICON.temporal,
      verb_passive: LEXICON.verbs.passive,
      noun_mystical: LEXICON.nouns.mystical,
      noun_natural: LEXICON.nouns.natural,
      noun_abstract: LEXICON.nouns.abstract,
      noun_elemental: LEXICON.nouns.elemental,
      preposition: LEXICON.prepositions,
      adjective: LEXICON.adjectives.restrained,
    };

    for (const [key, values] of Object.entries(replacements)) {
      const pattern = new RegExp(`\\{${key}\\}`, "g");
      result = result.replace(pattern, () => {
        return values[rand() % values.length];
      });
    }

    return result;
  }

  private createPRNG(seed: number): () => number {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state;
    };
  }
}
