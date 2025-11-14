'use client';

import { BESTIARY, Entity } from '@/lib/data/bestiary';
import { useState } from 'react';

export default function BestiaryView() {
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="border-b pb-4" style={{ borderColor: "var(--cyan-turquoise)" }}>
        <h2 className="text-2xl font-serif ink-text">entities of the unseen</h2>
        <p className="text-sm ink-text-light mt-2">
          beings that dwell beyond the veil. approach with caution and respect
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {BESTIARY.map((entity) => (
          <button
            key={entity.id}
            onClick={() => setSelectedEntity(entity)}
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
              <span className="text-3xl" style={{ color: "var(--cyan-arcane)", textShadow: "0 0 10px var(--cyan-arcane)" }}>{entity.symbol}</span>
              <div className="flex-1">
                <h3 className="font-serif text-lg ink-text">{entity.name}</h3>
                <div className="flex gap-2 mt-1 text-xs">
                  <span className="ink-text-light">{entity.element}</span>
                  <span className="ink-text-light">·</span>
                  <span className="ink-text-light">{entity.type}</span>
                </div>
                <p className="text-sm ink-text-faded mt-2 line-clamp-2">
                  {entity.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedEntity && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50"
             style={{ background: "rgba(5, 7, 10, 0.9)" }}
             onClick={() => setSelectedEntity(null)}>
          <div className="border-2 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto" 
               style={{
                 background: "var(--obsidian-blue)",
                 borderColor: "var(--cyan-deep)",
                 boxShadow: "0 0 40px rgba(61, 245, 255, 0.4)"
               }}
               onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-6">
              <span className="text-5xl" style={{ color: "var(--cyan-arcane)", textShadow: "0 0 20px var(--cyan-arcane)" }}>{selectedEntity.symbol}</span>
              <div className="flex-1">
                <h2 className="text-3xl font-serif ink-text">{selectedEntity.name}</h2>
                <div className="flex gap-3 mt-2 text-sm">
                  <span className="px-2 py-1 rounded" style={{ background: "var(--slate-arcane)", color: "var(--cyan-deep)" }}>
                    {selectedEntity.element}
                  </span>
                  <span className="px-2 py-1 rounded" style={{ background: "var(--slate-arcane)", color: "var(--cyan-deep)" }}>
                    {selectedEntity.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  nature
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedEntity.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  appearance
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedEntity.appearance}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  behavior
                </h3>
                <p className="ink-text-light leading-relaxed">{selectedEntity.behavior}</p>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  affinity
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedEntity.affinity.map((aff) => (
                    <span key={aff} className="px-3 py-1 rounded-full text-sm" style={{ background: "var(--slate-arcane)", color: "var(--cyan-arcane)", boxShadow: "0 0 5px rgba(61, 245, 255, 0.3)" }}>
                      {aff}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                  weakness
                </h3>
                <p className="ink-text-light italic">{selectedEntity.weakness}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedEntity(null)}
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
