import { IntentCategory } from "../types";

export interface ElementalSymbol {
  category: IntentCategory;
  symbol: string;
  element: string;
  color: string;
  glowColor: string;
  description: string;
}

export const ELEMENTAL_SYMBOLS: Record<IntentCategory, ElementalSymbol> = {
  [IntentCategory.PROTECTION]: {
    category: IntentCategory.PROTECTION,
    symbol: "⊙",
    element: "earth",
    color: "#8B4513",
    glowColor: "#D2691E",
    description: "shield of stone and root"
  },
  [IntentCategory.REVELATION]: {
    category: IntentCategory.REVELATION,
    symbol: "◐",
    element: "light",
    color: "#FFD700",
    glowColor: "#FFA500",
    description: "eye of illumination"
  },
  [IntentCategory.BINDING]: {
    category: IntentCategory.BINDING,
    symbol: "⋔",
    element: "iron",
    color: "#708090",
    glowColor: "#A9A9A9",
    description: "chains of will"
  },
  [IntentCategory.TRANSFORMATION]: {
    category: IntentCategory.TRANSFORMATION,
    symbol: "△",
    element: "fire",
    color: "#FF4500",
    glowColor: "#FF6347",
    description: "flame of change"
  },
  [IntentCategory.SUMMONING]: {
    category: IntentCategory.SUMMONING,
    symbol: "◇",
    element: "air",
    color: "#87CEEB",
    glowColor: "#00BFFF",
    description: "breath of calling"
  },
  [IntentCategory.BANISHMENT]: {
    category: IntentCategory.BANISHMENT,
    symbol: "◢",
    element: "void",
    color: "#4B0082",
    glowColor: "#8B008B",
    description: "gate of dismissal"
  },
  [IntentCategory.PRESERVATION]: {
    category: IntentCategory.PRESERVATION,
    symbol: "◆",
    element: "crystal",
    color: "#40E0D0",
    glowColor: "#48D1CC",
    description: "amber of eternity"
  },
  [IntentCategory.PASSAGE]: {
    category: IntentCategory.PASSAGE,
    symbol: "◌",
    element: "water",
    color: "#4682B4",
    glowColor: "#5F9EA0",
    description: "current of transition"
  }
};

export function getElementalSymbol(category: IntentCategory): ElementalSymbol {
  return ELEMENTAL_SYMBOLS[category];
}
