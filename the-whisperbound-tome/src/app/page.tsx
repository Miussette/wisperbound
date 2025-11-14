"use client";

import { useState, useEffect } from "react";
import { generateSpell } from "@/lib/generators/generateSpell";
import { AuthService, GrimoireService, SavedSpell } from "@/lib/auth";
import { ProgressionService, Achievement } from "@/lib/progression";
import Image from "next/image";
import AuthModal from "@/components/AuthModal";
import GrimoireView from "@/components/GrimoireView";
import ProgressionNotification from "@/components/ProgressionNotification";
import GrimoireSidebar from "@/components/GrimoireSidebar";
import ProgressView from "@/components/ProgressView";
import AchievementsView from "@/components/AchievementsView";
import RunesView from "@/components/RunesView";
import BestiaryView from "@/components/BestiaryView";
import ArtifactsView from "@/components/ArtifactsView";
import CustomSpellsView from "@/components/CustomSpellsView";
import OracleMode from "@/components/OracleMode";
import GuidedRitualsView from "@/components/GuidedRitualsView";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState("create");
  const [grimoire, setGrimoire] = useState<SavedSpell[]>([]);
  const [whisper, setWhisper] = useState("");
  const [spell, setSpell] = useState<any>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userLevel, setUserLevel] = useState(1);
  const [userProgress, setUserProgress] = useState<any>(null);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [levelUpNotification, setLevelUpNotification] = useState<number | null>(null);
  const [mysteryMessage, setMysteryMessage] = useState<string | null>(null);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      loadGrimoire(user.id);
      
      const progress = ProgressionService.getProgress(user.id);
      setUserLevel(progress.level);
      setUserProgress(progress);
    }
  }, []);

  const loadGrimoire = (userId: string) => {
    const spells = GrimoireService.getGrimoire(userId);
    setGrimoire(spells.sort((a, b) => b.createdAt - a.createdAt));
  };

  const handleWhisper = async () => {
    if (!whisper.trim()) return;
    
    setIsRevealing(true);
    setSpell(null);
    
    setTimeout(async () => {
      const result = await generateSpell(whisper);
      setSpell(result);
      setIsRevealing(false);
      
      if (isAuthenticated && currentUser) {
        GrimoireService.saveSpell(
          currentUser.id,
          whisper,
          result,
          result.metadata.intent
        );
        loadGrimoire(currentUser.id);
        
        const oldProgress = ProgressionService.getProgress(currentUser.id);
        const oldLevel = oldProgress.level;
        const oldAchievements = oldProgress.achievements.length;
        
        const newProgress = ProgressionService.addExperience(currentUser.id, 10);
        setUserLevel(newProgress.level);
        setUserProgress(newProgress);
        
        if (newProgress.level > oldLevel) {
          setLevelUpNotification(newProgress.level);
          setMysteryMessage(ProgressionService.getMysteryMessage(newProgress.mysteryLevel));
        }
        
        if (newProgress.achievements.length > oldAchievements) {
          setNewAchievement(newProgress.achievements[newProgress.achievements.length - 1]);
        }
      }
    }, 2000);
  };

  const handleSaveSpell = () => {
    if (!isAuthenticated || !currentUser || !spell) return;
    
    GrimoireService.saveSpell(
      currentUser.id,
      whisper,
      spell,
      spell.metadata.intent
    );
    loadGrimoire(currentUser.id);
  };

  const handleDeleteSpell = (spellId: string) => {
    if (!currentUser) return;
    GrimoireService.deleteSpell(currentUser.id, spellId);
    loadGrimoire(currentUser.id);
  };

  const handleViewSpell = (savedSpell: SavedSpell) => {
    setWhisper(savedSpell.whisper);
    setSpell(savedSpell.spell);
    setCurrentView("create");
  };

  const handleLogout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setGrimoire([]);
    setSpell(null);
    setWhisper("");
  };

  const enterTome = () => {
    setShowWelcome(false);
    if (!isAuthenticated) {
      setShowAuth(true);
    }
  };

  const handleAuthSuccess = () => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      loadGrimoire(user.id);
    }
    setShowAuth(false);
  };

  if (showWelcome) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-12 py-16 px-4 animate-inkReveal">
        <div className="text-center space-y-8">
          <div className="relative w-64 h-64 mx-auto mb-8">
            <Image
              src="/whisperbound.jpg"
              alt="The Whisperbound Tome"
              fill
              className="object-contain rounded-lg shadow-2xl"
              style={{ filter: "sepia(0.3) contrast(1.1)" }}
              priority
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-serif tracking-[0.3em] ink-text" style={{ fontVariant: "small-caps" }}>
              The Whisperbound Tome
            </h1>
            <div className="ornamental-divider my-6">
              <span>❖</span>
            </div>
            <p className="text-lg ink-text-faded italic tracking-wide max-w-md mx-auto leading-relaxed">
              A silent book that answers when spoken to
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={enterTome}
              className="parchment-border px-12 py-4 text-base tracking-[0.25em] ink-text-faded hover:ink-text hover:shadow-xl transition-all duration-700 uppercase animate-pulse"
            >
              Open the Tome
            </button>
          </div>

          <div className="pt-12 text-center">
            <p className="text-xs ink-text-light tracking-widest">
              Speak your intent and the tome shall answer
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      {showAuth && <AuthModal onSuccess={handleAuthSuccess} />}

      {(newAchievement || levelUpNotification) && (
        <ProgressionNotification
          achievement={newAchievement || undefined}
          levelUp={levelUpNotification || undefined}
          mysteryMessage={mysteryMessage || undefined}
          onClose={() => {
            setNewAchievement(null);
            setLevelUpNotification(null);
            setMysteryMessage(null);
          }}
        />
      )}

      {isAuthenticated && userProgress && (
        <GrimoireSidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          userLevel={userLevel}
          spellCount={grimoire.length}
          achievementCount={userProgress.achievements.length}
        />
      )}

      <main className="min-h-screen flex flex-col items-center justify-center gap-8 py-16 px-4 animate-fadeIn">
        <button
          onClick={() => setShowWelcome(true)}
          className="absolute top-4 right-4 text-2xl ink-text-light hover:ink-text transition-all duration-300"
          title="Back to welcome"
        >
          ←
        </button>

        {!isAuthenticated && (
          <div className="absolute top-4 left-4">
            <button
              onClick={() => setShowAuth(true)}
              className="parchment-border px-4 py-2 text-xs tracking-[0.2em] ink-text-faded hover:ink-text transition-all duration-500 uppercase"
            >
              Sign In
            </button>
          </div>
        )}

        {isAuthenticated && (
          <div className="absolute top-4 right-16">
            <button
              onClick={handleLogout}
              className="text-xs ink-text-light hover:ink-text-faded transition-all duration-300 tracking-wide"
            >
              Leave
            </button>
          </div>
        )}

        {currentView === "create" && (
          <>
            <div className="text-center mb-8 animate-inkReveal">
              <h1 className="text-4xl font-serif tracking-[0.3em] mb-3 ink-text" style={{ fontVariant: "small-caps" }}>
                The Whisperbound Tome
              </h1>
              <div className="ornamental-divider my-4">
                <span>✦</span>
              </div>
              <p className="text-sm ink-text-light italic tracking-wide">
                a silent book that answers when spoken to
                {isAuthenticated && currentUser && (
                  <span className="block mt-2 text-xs">
                    inscribed by {currentUser.username}
                  </span>
                )}
              </p>
            </div>

            <div className="w-full max-w-md parchment-border p-6 rounded">
        <input
          className="w-full bg-transparent border-b-2 border-[var(--ink-light)] ink-text text-center outline-none p-3 text-lg tracking-wide focus:border-[var(--ink-faded)] transition-all duration-700"
          placeholder="speak to the grimoire..."
          value={whisper}
          onChange={(e) => setWhisper(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleWhisper()}
          disabled={isRevealing}
        />
      </div>

      <button
        onClick={handleWhisper}
        disabled={isRevealing || !whisper.trim()}
        className="parchment-border px-10 py-3 text-sm tracking-[0.2em] ink-text-faded hover:ink-text hover:shadow-lg transition-all duration-700 disabled:opacity-30 disabled:cursor-not-allowed uppercase"
      >
        {isRevealing ? "listening..." : "whisper"}
      </button>

      {isRevealing && (
        <div className="mt-12 text-center ink-text-light animate-pulse">
          <p className="text-sm italic tracking-wide">the tome stirs...</p>
        </div>
      )}

      {spell && !isRevealing && (
        <div className="mt-12 w-full max-w-3xl space-y-0">
          <div className="spell-section text-center space-y-6 py-8">
            <div className="ornamental-divider">
              <span>❖</span>
            </div>
            <h2 className="text-xs tracking-[0.3em] ink-text-faded uppercase">Sigil</h2>
            <pre className="sigil-symbol text-3xl leading-relaxed font-mono ink-text">
              {spell.sigil.lines.join("\n")}
            </pre>
          </div>

          <div className="spell-section py-8">
            <div className="ornamental-divider">
              <span>✦</span>
            </div>
            <h2 className="text-xs tracking-[0.3em] ink-text-faded uppercase text-center mb-8">Ritual</h2>
            <div className="space-y-4 text-center max-w-xl mx-auto">
              {spell.ritual.steps.map((step: any, i: number) => (
                <p key={i} className="ritual-step text-sm ink-text-faded leading-relaxed">
                  {i + 1}. {step.action}
                </p>
              ))}
              <p className="text-xs italic ink-text-light mt-8 tracking-wide">{spell.ritual.duration}</p>
            </div>
          </div>

          <div className="spell-section py-8">
            <div className="ornamental-divider">
              <span>❖</span>
            </div>
            <h2 className="text-xs tracking-[0.3em] ink-text-faded uppercase text-center mb-8">Incantation</h2>
            <div className="space-y-5 text-center max-w-2xl mx-auto">
              {spell.incantation.lines.map((line: string, i: number) => (
                <p key={i} className="incantation-line text-lg italic ink-text leading-loose tracking-wide">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="text-center pt-12 pb-8 space-y-4">
            <div className="ornamental-divider mb-6">
              <span>✦</span>
            </div>
            {isAuthenticated && (
              <p className="text-xs ink-text-light italic mb-4">
                ✓ inscribed in your grimoire
              </p>
            )}
            <button
              onClick={() => {
                setSpell(null);
                setWhisper("");
              }}
              className="text-xs ink-text-light hover:ink-text-faded transition-all duration-500 tracking-[0.2em] uppercase"
            >
              whisper again
            </button>
          </div>
        </div>
      )}
          </>
        )}

        {currentView === "grimoire" && userProgress && (
          <GrimoireView
            spells={grimoire}
            onClose={() => setCurrentView("create")}
            onDelete={handleDeleteSpell}
            onView={handleViewSpell}
            userLevel={userLevel}
            achievements={userProgress.achievements.length}
          />
        )}

        {currentView === "progress" && userProgress && (
          <ProgressView progress={userProgress} />
        )}

        {currentView === "achievements" && userProgress && (
          <AchievementsView
            achievements={userProgress.achievements}
            totalSpells={grimoire.length}
          />
        )}

        {currentView === "oracle" && <OracleMode />}

        {currentView === "rituals" && <GuidedRitualsView />}

        {currentView === "runes" && <RunesView />}

        {currentView === "bestiary" && <BestiaryView />}

        {currentView === "artifacts" && <ArtifactsView />}

        {currentView === "custom" && currentUser && <CustomSpellsView userId={currentUser.id} />}
      </main>
    </>
  );
}
