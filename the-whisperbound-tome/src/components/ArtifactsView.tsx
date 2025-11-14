'use client';

import { ARTIFACTS, Artifact } from '@/lib/data/artifacts';
import { useState } from 'react';
import { ProgressionService } from '@/lib/progression';

export default function ArtifactsView() {
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);
  
  const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('whisperbound_user');
    return user ? JSON.parse(user) : null;
  };
  
  const currentUser = getCurrentUser();
  const progress = currentUser ? ProgressionService.getProgress(currentUser.id) : null;
  const userLevel = progress?.level || 1;

  const unlockedArtifacts = ARTIFACTS.filter(a => a.level <= userLevel);
  const lockedArtifacts = ARTIFACTS.filter(a => a.level > userLevel);

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="border-b pb-4" style={{ borderColor: "var(--cyan-turquoise)" }}>
        <h2 className="text-2xl font-serif ink-text">artifacts of power</h2>
        <p className="text-sm ink-text-light mt-2">
          tools and relics that channel the unseen. each holds purpose and memory
        </p>
      </div>

      {unlockedArtifacts.length > 0 && (
        <div>
          <h3 className="text-lg font-serif ink-text-faded mb-4">available</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unlockedArtifacts.map((artifact) => (
              <button
                key={artifact.id}
                onClick={() => setSelectedArtifact(artifact)}
                className="text-left p-4 border rounded transition-all duration-300"
                style={{
                  borderColor: "var(--cyan-turquoise)",
                  background: "var(--slate-arcane)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan-deep)";
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(61, 245, 255, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--cyan-turquoise)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" style={{ color: "var(--cyan-arcane)", textShadow: "0 0 10px var(--cyan-arcane)" }}>{artifact.symbol}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg ink-text">{artifact.name}</h3>
                    <div className="flex gap-2 mt-1 text-xs">
                      <span className="ink-text-light">{artifact.material}</span>
                      <span className="ink-text-light">·</span>
                      <span className="ink-text-light">level {artifact.level}</span>
                    </div>
                    <p className="text-sm ink-text-faded mt-2 line-clamp-2">
                      {artifact.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {lockedArtifacts.length > 0 && (
        <div>
          <h3 className="text-lg font-serif ink-text-faded mb-4">mysteries yet sealed</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lockedArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                className="p-4 border rounded opacity-50"
                style={{
                  borderColor: "var(--cosmic-graphite)",
                  background: "var(--slate-arcane)"
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" style={{ color: "var(--dimensional-mist)" }}>{artifact.symbol}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg ink-text-light">{artifact.name}</h3>
                    <p className="text-xs ink-text-light mt-1">
                      unlocks at level {artifact.level}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedArtifact && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50"
             style={{ background: "rgba(5, 7, 10, 0.9)" }}
             onClick={() => setSelectedArtifact(null)}>
          <div className="border-2 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
               style={{
                 background: "var(--obsidian-blue)",
                 borderColor: "var(--cyan-deep)",
                 boxShadow: "0 0 40px rgba(61, 245, 255, 0.4)"
               }}
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl" style={{ color: "var(--cyan-arcane)", textShadow: "0 0 20px var(--cyan-arcane)" }}>{selectedArtifact.symbol}</span>
              <div className="flex-1">
                <h2 className="text-3xl font-serif ink-text">{selectedArtifact.name}</h2>
                <div className="flex gap-3 mt-2 text-sm">
                  <span className="px-2 py-1 rounded" style={{ background: "var(--slate-arcane)", color: "var(--cyan-deep)" }}>
                    {selectedArtifact.material}
                  </span>
                  <span className="px-2 py-1 rounded" style={{ background: "var(--slate-arcane)", color: "var(--cyan-deep)" }}>
                    level {selectedArtifact.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  nature
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedArtifact.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  origin
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedArtifact.origin}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  function
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedArtifact.function}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  energy
                </h3>
                <p className="ink-text-light italic">{selectedArtifact.energy}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  affinity
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArtifact.affinity.map((aff) => (
                    <span key={aff} className="px-3 py-1 rounded-full text-sm" style={{ background: "var(--slate-arcane)", color: "var(--cyan-arcane)", boxShadow: "0 0 5px rgba(61, 245, 255, 0.3)" }}>
                      {aff}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedArtifact(null)}
              className="mt-8 w-full py-3 border rounded transition-colors duration-300 ink-text-faded"
              style={{ borderColor: "var(--cyan-turquoise)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--slate-arcane)";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(61, 245, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
