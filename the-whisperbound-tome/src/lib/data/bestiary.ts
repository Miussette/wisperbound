export interface Entity {
  id: string;
  name: string;
  symbol: string;
  element: string;
  type: string;
  affinity: string[];
  weakness: string;
  description: string;
  appearance: string;
  behavior: string;
}

export const BESTIARY: Entity[] = [
  {
    id: "shadow_walker",
    name: "Shadow Walker",
    symbol: "◢",
    element: "darkness",
    type: "ethereal",
    affinity: ["banishment", "binding", "passage"],
    weakness: "direct sunlight",
    description: "entity that moves between shadows. neither fully present nor entirely absent",
    appearance: "formless darkness that shifts at the edge of vision. no fixed shape, only suggestion of movement",
    behavior: "drawn to places of transition and threshold. feeds on uncertainty and hesitation",
  },
  {
    id: "flame_spirit",
    name: "Flame Spirit",
    symbol: "△",
    element: "fire",
    type: "elemental",
    affinity: ["transformation", "purification", "destruction"],
    weakness: "still water",
    description: "living fire that dances with conscious intent. consumes what must be released",
    appearance: "flickering form of pure flame. shifts between blue and gold, never still",
    behavior: "seeks what needs burning. transforms through destruction, purifies through heat",
  },
  {
    id: "stone_guardian",
    name: "Stone Guardian",
    symbol: "▢",
    element: "earth",
    type: "construct",
    affinity: ["protection", "preservation", "endurance"],
    weakness: "running water",
    description: "ancient sentinel carved from living rock. stands watch over sacred places",
    appearance: "humanoid form of weathered stone. moss grows in crevices, eyes are hollow voids",
    behavior: "motionless until threshold is crossed. moves with grinding patience when roused",
  },
  {
    id: "mist_weaver",
    name: "Mist Weaver",
    symbol: "◌",
    element: "water",
    type: "ethereal",
    affinity: ["revelation", "illusion", "passage"],
    weakness: "strong wind",
    description: "being of fog and vapor. shapes reality through mist and dream",
    appearance: "shifting form of pale mist. sometimes suggests human shape, sometimes disperses entirely",
    behavior: "appears at dawn and dusk. obscures or reveals according to unknown purpose",
  },
  {
    id: "root_keeper",
    name: "Root Keeper",
    symbol: "⋔",
    element: "earth",
    type: "nature spirit",
    affinity: ["preservation", "growth", "binding"],
    weakness: "fire",
    description: "ancient consciousness dwelling in deep roots. remembers what the forest has forgotten",
    appearance: "network of roots and fungal threads. occasionally forms vaguely humanoid shape from wood",
    behavior: "guards old growth and sacred groves. communicates through dreams and whispers in leaves",
  },
  {
    id: "wind_caller",
    name: "Wind Caller",
    symbol: "◇",
    element: "air",
    type: "elemental",
    affinity: ["summoning", "communication", "passage"],
    weakness: "enclosed spaces",
    description: "voice carried on every breeze. speaks in languages older than words",
    appearance: "invisible presence felt as sudden gusts. sometimes visible as swirling dust or leaves",
    behavior: "carries messages across distances. responds to those who speak into the wind",
  },
  {
    id: "memory_eater",
    name: "Memory Eater",
    symbol: "◭",
    element: "void",
    type: "psychic",
    affinity: ["banishment", "forgetting", "release"],
    weakness: "written records",
    description: "entity that consumes recollection. takes what must be forgotten",
    appearance: "absence more than presence. space where memory should be but isn't",
    behavior: "drawn to regret and trauma. removes memories that poison the mind",
  },
  {
    id: "dawn_herald",
    name: "Dawn Herald",
    symbol: "◮",
    element: "light",
    type: "celestial",
    affinity: ["revelation", "transformation", "awakening"],
    weakness: "total darkness",
    description: "being of first light. announces new beginnings and fresh starts",
    appearance: "radiance that suggests winged form. colors of sunrise and breaking day",
    behavior: "appears at moments of change. brings clarity and dispels confusion",
  },
];
