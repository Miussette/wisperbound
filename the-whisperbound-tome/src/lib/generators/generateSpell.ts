import { Spell } from "../types";
import { SeedGenerator } from "./SeedGenerator";
import { SigilGenerator } from "./SigilGenerator";
import { RitualGenerator } from "./RitualGenerator";
import { IncantationGenerator } from "./IncantationGenerator";
import { IntentClassifier } from "../IntentClassifier";

export async function generateSpell(whisper: string): Promise<Spell> {
  const classifier = new IntentClassifier();
  const intent = classifier.classify(whisper);

  const seedGen = new SeedGenerator();
  const baseSeed = seedGen.generateSeed(whisper, intent);

  const sigilSeed = seedGen.createSubSeed(baseSeed, "sigil");
  const ritualSeed = seedGen.createSubSeed(baseSeed, "ritual");
  const incantationSeed = seedGen.createSubSeed(baseSeed, "incantation");

  const sigil = new SigilGenerator().generate(sigilSeed, intent);
  const ritual = new RitualGenerator().generate(ritualSeed, intent);
  const incantation = new IncantationGenerator().generate(incantationSeed, intent);

  return {
    sigil,
    ritual,
    incantation,
    metadata: {
      intent,
      generatedAt: Date.now(),
      whisperHash: baseSeed.toString(),
    },
  };
}
