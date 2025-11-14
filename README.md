# 📖 The Whisperbound Tome

> *A silent book that answers when spoken to*

An interactive mystical grimoire that transforms your whispered intentions into deterministic spells, complete with sigils, rituals, and incantations. More than just a spell generator, it's a companion for emotional wellness, self-reflection, and mindful practice.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
DEMO: https://the-wisperbound-tome.vercel.app/
## ✨ Features

### 🔮 Spell Generation
- **Deterministic Magic**: Same whisper always produces the same spell
- **8 Elemental Categories**: Protection, Revelation, Binding, Transformation, Summoning, Banishment, Preservation, Passage
- **Complete Spells**: Each includes a sigil, ritual steps, and poetic incantation
- **Intent Classification**: Automatically categorizes your whisper's purpose
- **Mystical Aesthetics**: Ancient grimoire styling with arcane cyan glow effects

### 📚 Personal Grimoire
- **Spell Collection**: Save and organize all your generated spells
- **Elemental Symbols**: Each spell displays its elemental symbol with unique colors
- **Search & Filter**: Find spells by category or search terms
- **Spell History**: Track your magical journey over time

### ✍️ Custom Spells
- **Create Your Own**: Write personalized spells with your own rituals
- **Elemental Selection**: Choose from 8 elemental categories
- **Full Customization**: Add materials, steps, incantations, and descriptions
- **Visual Symbols**: Each category has its own glowing symbol and color

### 🜁 Oracle Mode
- **Gentle Guidance**: Reflective prompts when you don't know what to write
- **5 Categories**: Reflection, Release, Intention, Gratitude, Courage
- **Anchor Phrases**: Grounding affirmations with each prompt
- **Non-Predictive**: Companionship, not fortune-telling
- **Examples**:
  - "what truth have you been avoiding?"
  - "what burden are you ready to set down?"
  - "what do you wish to call into your life?"

### 🧘‍♀️ Guided Rituals
- **5 Breathing Practices**: 4-8 minute guided meditations
- **Animated Breathing Circle**: Visual guide that expands and contracts with your breath
- **Categories**: Grounding, Release, Energy, Peace, Clarity
- **User-Controlled Pacing**: Navigate at your own speed with next/previous buttons
- **Suggested Timing**: Optional timer shows recommended duration per step
- **Rituals Include**:
  - ⊙ Roots of Earth (5 min) - Grounding
  - ◌ Current of Release (7 min) - Letting go
  - △ Flame of Vitality (4 min) - Energy boost
  - ◢ Sanctuary of Silence (8 min) - Inner peace
  - ◐ Illumination of Mind (6 min) - Mental clarity

### 📖 Mystical Library

#### Elder Futhark Runes
- Complete runic alphabet with authentic Norse meanings
- Historical context and magical associations
- Beautiful visual presentation

#### Bestiary
- 8 mystical entities (Shadow Walker, Flame Spirit, Stone Guardian, etc.)
- Detailed descriptions of appearance, behavior, and weaknesses
- Elemental affinities and symbolic representations

#### Artifacts
- Magical objects with unique properties
- Level-based unlocking system
- Detailed lore for each artifact

### 🎮 Progression System
- **Experience Points**: Earn XP by creating spells
- **Level Up**: Unlock new mysteries and content
- **Achievements**: Track milestones in your journey
- **Mystery Levels**: Discover hidden knowledge as you progress

### 🎨 Visual Design
- **Arcane Cyan Theme**: Mystical color palette with glowing effects
  - Cyan Arcano (#3DF5FF) - Primary glow
  - Stellar Black (#05070A) - Deep background
  - Nebular Glow (#8BFFFF) - Magical effects
- **Smooth Animations**: Breathing circles, fade-ins, hover effects
- **Responsive Design**: Works beautifully on all screen sizes
- **Atmospheric UI**: Ancient grimoire aesthetic with modern UX

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/the-whisperbound-tome.git

# Navigate to project directory
cd the-whisperbound-tome

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 How to Use

### Creating a Spell
1. Sign in or create an account
2. Type your intention in the input field
3. Click "whisper" or press Enter
4. Watch as the tome generates your unique spell
5. Your spell is automatically saved to your grimoire

### Using Oracle Mode
1. Navigate to "Oracle Mode" from the sidebar
2. Click "ask the oracle" when ready
3. Reflect on the prompt you receive
4. Take your time - there's no rush
5. Draw another when you're ready

### Practicing Guided Rituals
1. Go to "Guided Rituals" from the sidebar
2. Choose a ritual that matches your need
3. Click "begin ritual"
4. Follow the breathing circle and instructions
5. Use next/previous to control your pace
6. Exit anytime with "end ritual"

### Creating Custom Spells
1. Navigate to "Custom Spells"
2. Click "+ create spell"
3. Fill in name, category, description
4. Add your incantation
5. List required materials
6. Define ritual steps
7. Click "inscribe spell"

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: React Hooks
- **Storage**: localStorage (client-side)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
the-whisperbound-tome/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── page.tsx           # Main application page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   ├── AuthModal.tsx
│   │   ├── GrimoireView.tsx
│   │   ├── CustomSpellsView.tsx
│   │   ├── OracleMode.tsx
│   │   ├── GuidedRitualsView.tsx
│   │   ├── BestiaryView.tsx
│   │   ├── ArtifactsView.tsx
│   │   └── ...
│   ├── lib/                   # Core logic
│   │   ├── generators/        # Spell generation
│   │   ├── data/             # Static data
│   │   ├── auth.ts           # Authentication
│   │   ├── progression.ts    # Level system
│   │   └── types.ts          # TypeScript types
│   └── ...
├── public/                    # Static assets
├── LICENSE                    # MIT License
├── README.md                 # This file
├── WELLNESS_FEATURES.md      # Wellness features guide
└── ELEMENTAL_SYMBOLS.md      # Symbol reference
```

## 🎨 Elemental Symbols

Each spell category has its own symbol and element:

| Symbol | Category | Element | Color |
|--------|----------|---------|-------|
| ⊙ | Protection | Earth | Brown |
| ◐ | Revelation | Light | Gold |
| ⋔ | Binding | Iron | Gray |
| △ | Transformation | Fire | Orange-Red |
| ◇ | Summoning | Air | Sky Blue |
| ◢ | Banishment | Void | Indigo |
| ◆ | Preservation | Crystal | Turquoise |
| ◌ | Passage | Water | Steel Blue |

See [ELEMENTAL_SYMBOLS.md](ELEMENTAL_SYMBOLS.md) for detailed information.

## 🧘 Wellness Philosophy

The Whisperbound Tome is designed with emotional wellness in mind:

- **Non-Judgmental**: No right or wrong answers
- **User-Paced**: Control your own experience
- **Gentle Language**: Invitations, not commands
- **Practical Tools**: Real techniques for anxiety, reflection, and grounding
- **Aesthetically Calming**: Slow animations, soft glows, minimal distractions

See [WELLNESS_FEATURES.md](WELLNESS_FEATURES.md) for the complete wellness guide.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by ancient grimoires and mystical traditions
- Built with modern web technologies
- Designed for emotional wellness and self-reflection
- Created with care for those seeking inner peace

## 📧 Contact

For questions, suggestions, or just to share your experience with the tome, feel free to reach out.

---

*"The grimoire simply offers a gentle hand along the way."*

**May your whispers find their form, and your spells bring you peace.** ✨
