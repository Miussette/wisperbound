export interface OraclePrompt {
  id: string;
  category: 'reflection' | 'release' | 'intention' | 'gratitude' | 'courage';
  prompt: string;
  symbol: string;
  color: string;
  anchorPhrase: string;
}

export const ORACLE_PROMPTS: OraclePrompt[] = [
  // Reflection
  {
    id: 'reflect_1',
    category: 'reflection',
    prompt: 'what truth have you been avoiding?',
    symbol: '◐',
    color: '#FFD700',
    anchorPhrase: 'the mirror shows what must be seen'
  },
  {
    id: 'reflect_2',
    category: 'reflection',
    prompt: 'what part of yourself needs acknowledgment?',
    symbol: '◐',
    color: '#FFD700',
    anchorPhrase: 'recognition is the first step to wholeness'
  },
  {
    id: 'reflect_3',
    category: 'reflection',
    prompt: 'what pattern keeps repeating in your life?',
    symbol: '◐',
    color: '#FFD700',
    anchorPhrase: 'cycles reveal themselves to those who look'
  },
  
  // Release
  {
    id: 'release_1',
    category: 'release',
    prompt: 'what burden are you ready to set down?',
    symbol: '◢',
    color: '#4B0082',
    anchorPhrase: 'release is not loss, but liberation'
  },
  {
    id: 'release_2',
    category: 'release',
    prompt: 'what old story no longer serves you?',
    symbol: '◢',
    color: '#4B0082',
    anchorPhrase: 'the past can be honored and still let go'
  },
  {
    id: 'release_3',
    category: 'release',
    prompt: 'what fear would you like to transform?',
    symbol: '◢',
    color: '#4B0082',
    anchorPhrase: 'fear acknowledged loses its power'
  },
  
  // Intention
  {
    id: 'intention_1',
    category: 'intention',
    prompt: 'what do you wish to call into your life?',
    symbol: '◇',
    color: '#87CEEB',
    anchorPhrase: 'intention shapes the unseen into form'
  },
  {
    id: 'intention_2',
    category: 'intention',
    prompt: 'what quality do you want to embody?',
    symbol: '◇',
    color: '#87CEEB',
    anchorPhrase: 'you become what you practice being'
  },
  {
    id: 'intention_3',
    category: 'intention',
    prompt: 'what future are you creating with today\'s choices?',
    symbol: '◇',
    color: '#87CEEB',
    anchorPhrase: 'each moment plants seeds for tomorrow'
  },
  
  // Gratitude
  {
    id: 'gratitude_1',
    category: 'gratitude',
    prompt: 'what small blessing went unnoticed today?',
    symbol: '◆',
    color: '#40E0D0',
    anchorPhrase: 'gratitude illuminates what was always there'
  },
  {
    id: 'gratitude_2',
    category: 'gratitude',
    prompt: 'who has held space for you recently?',
    symbol: '◆',
    color: '#40E0D0',
    anchorPhrase: 'connection is the thread that weaves us whole'
  },
  {
    id: 'gratitude_3',
    category: 'gratitude',
    prompt: 'what strength did you discover in yourself?',
    symbol: '◆',
    color: '#40E0D0',
    anchorPhrase: 'you are more resilient than you know'
  },
  
  // Courage
  {
    id: 'courage_1',
    category: 'courage',
    prompt: 'what would you do if you trusted yourself completely?',
    symbol: '⊙',
    color: '#8B4513',
    anchorPhrase: 'courage is not absence of fear, but action despite it'
  },
  {
    id: 'courage_2',
    category: 'courage',
    prompt: 'what boundary needs to be spoken?',
    symbol: '⊙',
    color: '#8B4513',
    anchorPhrase: 'your voice matters, your needs are valid'
  },
  {
    id: 'courage_3',
    category: 'courage',
    prompt: 'what dream have you been postponing?',
    symbol: '⊙',
    color: '#8B4513',
    anchorPhrase: 'the time is always now, never later'
  }
];

export function getRandomPrompt(): OraclePrompt {
  return ORACLE_PROMPTS[Math.floor(Math.random() * ORACLE_PROMPTS.length)];
}

export function getPromptsByCategory(category: OraclePrompt['category']): OraclePrompt[] {
  return ORACLE_PROMPTS.filter(p => p.category === category);
}
