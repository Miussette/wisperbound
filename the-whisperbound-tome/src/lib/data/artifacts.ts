export interface Artifact {
  id: string;
  name: string;
  symbol: string;
  material: string;
  origin: string;
  energy: string;
  function: string;
  affinity: string[];
  level: number;
  description: string;
}

export const ARTIFACTS: Artifact[] = [
  {
    id: "obsidian_mirror",
    name: "Obsidian Mirror",
    symbol: "◐",
    material: "volcanic glass",
    origin: "ancient scrying chambers",
    energy: "revelation",
    function: "reveals hidden truths and distant visions",
    affinity: ["revelation", "divination", "shadow"],
    level: 1,
    description: "polished black glass that reflects more than mere light. gazing into its depths reveals what lies beneath surface and veil",
  },
  {
    id: "silver_chalice",
    name: "Silver Chalice",
    symbol: "◯",
    material: "blessed silver",
    origin: "temple sanctuaries",
    energy: "purification",
    function: "cleanses and consecrates ritual waters",
    affinity: ["protection", "healing", "blessing"],
    level: 1,
    description: "vessel wrought from moon-touched silver. water held within becomes charged with purifying essence",
  },
  {
    id: "bone_wand",
    name: "Bone Wand",
    symbol: "│",
    material: "consecrated bone",
    origin: "burial grounds",
    energy: "channeling",
    function: "directs and focuses mystical energies",
    affinity: ["binding", "banishment", "summoning"],
    level: 2,
    description: "carved from ancient bone and marked with sigils. extends the will of the practitioner into the unseen",
  },
  {
    id: "iron_nail",
    name: "Iron Nail",
    symbol: "╱",
    material: "cold iron",
    origin: "forgotten forges",
    energy: "binding",
    function: "fixes intentions and seals boundaries",
    affinity: ["binding", "protection", "warding"],
    level: 1,
    description: "simple iron driven with purpose becomes unbreakable anchor. holds fast what must not move",
  },
  {
    id: "amber_stone",
    symbol: "◆",
    name: "Amber Stone",
    material: "fossilized resin",
    origin: "ancient forests",
    energy: "preservation",
    function: "captures and holds essence unchanged",
    affinity: ["preservation", "time", "memory"],
    level: 2,
    description: "golden resin that trapped time itself. what is sealed within remains eternal and unchanged",
  },
  {
    id: "salt_circle",
    name: "Salt Circle",
    symbol: "⊙",
    material: "consecrated salt",
    origin: "sacred mines",
    energy: "protection",
    function: "creates impenetrable boundaries",
    affinity: ["protection", "warding", "cleansing"],
    level: 1,
    description: "white crystals drawn in perfect ring. nothing unwanted may cross the line thus made",
  },
  {
    id: "raven_feather",
    name: "Raven Feather",
    symbol: "⋮",
    material: "corvid plume",
    origin: "sacred groves",
    energy: "communication",
    function: "carries messages between worlds",
    affinity: ["summoning", "communication", "passage"],
    level: 2,
    description: "black feather from bird of omen. writes words that travel beyond the veil",
  },
  {
    id: "moonstone",
    name: "Moonstone",
    symbol: "◐",
    material: "lunar crystal",
    origin: "night-touched peaks",
    energy: "intuition",
    function: "enhances psychic perception",
    affinity: ["revelation", "dreams", "intuition"],
    level: 3,
    description: "pale stone that holds moon's light. opens inner eye to see what darkness hides",
  },
];
