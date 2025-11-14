export enum IntentCategory {
  PROTECTION = "protection",
  REVELATION = "revelation",
  BINDING = "binding",
  TRANSFORMATION = "transformation",
  SUMMONING = "summoning",
  BANISHMENT = "banishment",
  PRESERVATION = "preservation",
  PASSAGE = "passage",
}

export interface Sigil {
  lines: string[];
  symbolSet: string[];
  pattern: string;
}

export interface RitualStep {
  action: string;
  material?: string;
  timing?: string;
}

export interface Ritual {
  steps: RitualStep[];
  duration: string;
}

export interface Incantation {
  lines: string[];
  syllableCount: number[];
  metaphor: string;
}

export interface SpellMetadata {
  intent: IntentCategory;
  whisperHash: string;
  generatedAt: number;
}

export interface Spell {
  sigil: Sigil;
  ritual: Ritual;
  incantation: Incantation;
  metadata: SpellMetadata;
}

export interface ValidationResult {
  isValid: boolean;
  sanitized: string;
  errorMessage?: string;
}
