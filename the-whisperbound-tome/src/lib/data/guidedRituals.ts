export interface RitualStep {
  instruction: string;
  duration: number; // in seconds
  breathPattern?: {
    inhale: number;
    hold: number;
    exhale: number;
    pause: number;
  };
}

export interface GuidedRitual {
  id: string;
  name: string;
  description: string;
  category: 'grounding' | 'release' | 'energy' | 'peace' | 'clarity';
  duration: number; // total in minutes
  symbol: string;
  color: string;
  steps: RitualStep[];
  ambientDescription: string;
}

export const GUIDED_RITUALS: GuidedRitual[] = [
  {
    id: 'grounding_earth',
    name: 'roots of earth',
    description: 'return to your center when the world feels too much',
    category: 'grounding',
    duration: 5,
    symbol: '⊙',
    color: '#8B4513',
    ambientDescription: 'imagine roots growing from your feet into dark, rich soil',
    steps: [
      {
        instruction: 'sit comfortably. feel the weight of your body supported',
        duration: 30
      },
      {
        instruction: 'breathe deeply. let your belly rise and fall',
        duration: 60,
        breathPattern: { inhale: 4, hold: 2, exhale: 6, pause: 2 }
      },
      {
        instruction: 'imagine roots growing from your feet into the earth',
        duration: 60
      },
      {
        instruction: 'with each breath, feel yourself more anchored, more present',
        duration: 60,
        breathPattern: { inhale: 4, hold: 2, exhale: 6, pause: 2 }
      },
      {
        instruction: 'you are held. you are safe. you are here',
        duration: 30
      }
    ]
  },
  {
    id: 'release_water',
    name: 'current of release',
    description: 'let go of what no longer serves you',
    category: 'release',
    duration: 7,
    symbol: '◌',
    color: '#4682B4',
    ambientDescription: 'visualize a gentle stream carrying away all that weighs you down',
    steps: [
      {
        instruction: 'close your eyes. notice what feels heavy in your body',
        duration: 45
      },
      {
        instruction: 'breathe into that heaviness. acknowledge it without judgment',
        duration: 60,
        breathPattern: { inhale: 4, hold: 4, exhale: 6, pause: 2 }
      },
      {
        instruction: 'imagine a gentle stream flowing beside you',
        duration: 60
      },
      {
        instruction: 'with each exhale, release what you\'re ready to let go',
        duration: 90,
        breathPattern: { inhale: 4, hold: 2, exhale: 8, pause: 2 }
      },
      {
        instruction: 'watch it float away on the current. it served its purpose',
        duration: 60
      },
      {
        instruction: 'feel the lightness that remains. this is your natural state',
        duration: 45
      }
    ]
  },
  {
    id: 'energy_fire',
    name: 'flame of vitality',
    description: 'awaken your inner fire when energy feels low',
    category: 'energy',
    duration: 4,
    symbol: '△',
    color: '#FF4500',
    ambientDescription: 'kindle the flame that burns at your core',
    steps: [
      {
        instruction: 'stand or sit tall. feel your spine lengthen',
        duration: 30
      },
      {
        instruction: 'breathe with power. quick inhales, strong exhales',
        duration: 60,
        breathPattern: { inhale: 2, hold: 1, exhale: 3, pause: 1 }
      },
      {
        instruction: 'imagine a flame igniting at your solar plexus',
        duration: 45
      },
      {
        instruction: 'with each breath, the flame grows brighter, warmer',
        duration: 60,
        breathPattern: { inhale: 3, hold: 2, exhale: 4, pause: 1 }
      },
      {
        instruction: 'feel this warmth spread through your entire being',
        duration: 45
      }
    ]
  },
  {
    id: 'peace_void',
    name: 'sanctuary of silence',
    description: 'find stillness in the space between thoughts',
    category: 'peace',
    duration: 8,
    symbol: '◢',
    color: '#4B0082',
    ambientDescription: 'enter the quiet void where peace dwells',
    steps: [
      {
        instruction: 'find a comfortable position. let your body settle',
        duration: 45
      },
      {
        instruction: 'breathe slowly, naturally. no effort required',
        duration: 90,
        breathPattern: { inhale: 5, hold: 3, exhale: 7, pause: 3 }
      },
      {
        instruction: 'notice the silence between your thoughts',
        duration: 60
      },
      {
        instruction: 'rest in that silence. it is vast and welcoming',
        duration: 120
      },
      {
        instruction: 'thoughts will come. let them pass like clouds',
        duration: 90,
        breathPattern: { inhale: 5, hold: 3, exhale: 7, pause: 3 }
      },
      {
        instruction: 'return to the silence. it is always here, waiting',
        duration: 60
      }
    ]
  },
  {
    id: 'clarity_light',
    name: 'illumination of mind',
    description: 'clear the fog when decisions feel overwhelming',
    category: 'clarity',
    duration: 6,
    symbol: '◐',
    color: '#FFD700',
    ambientDescription: 'light pierces through confusion, revealing what is true',
    steps: [
      {
        instruction: 'sit quietly. acknowledge the confusion without resistance',
        duration: 45
      },
      {
        instruction: 'breathe into your forehead, your third eye',
        duration: 60,
        breathPattern: { inhale: 4, hold: 4, exhale: 6, pause: 2 }
      },
      {
        instruction: 'imagine a soft golden light beginning to glow there',
        duration: 60
      },
      {
        instruction: 'with each breath, the light grows clearer, brighter',
        duration: 90,
        breathPattern: { inhale: 4, hold: 4, exhale: 6, pause: 2 }
      },
      {
        instruction: 'let this light illuminate your question. no forcing, just allowing',
        duration: 90
      },
      {
        instruction: 'trust what arises. clarity comes in whispers, not shouts',
        duration: 45
      }
    ]
  }
];

export function getRitualsByCategory(category: GuidedRitual['category']): GuidedRitual[] {
  return GUIDED_RITUALS.filter(r => r.category === category);
}

export function getRitualById(id: string): GuidedRitual | undefined {
  return GUIDED_RITUALS.find(r => r.id === id);
}
