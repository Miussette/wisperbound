'use client';

import { useState, useEffect } from 'react';
import { CustomSpell, CustomSpellService } from '@/lib/customSpells';
import { IntentCategory } from '@/lib/types';
import { getElementalSymbol } from '@/lib/data/elementalSymbols';

interface CustomSpellsViewProps {
  userId: string;
}

export default function CustomSpellsView({ userId }: CustomSpellsViewProps) {
  const [spells, setSpells] = useState<CustomSpell[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSpell, setSelectedSpell] = useState<CustomSpell | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: IntentCategory.PROTECTION,
    description: '',
    incantation: '',
    materials: [''],
    steps: ['']
  });

  useEffect(() => {
    loadSpells();
  }, [userId]);

  const loadSpells = () => {
    const userSpells = CustomSpellService.getAllSpells(userId);
    setSpells(userSpells);
  };

  const handleCreate = () => {
    if (!formData.name.trim()) return;

    const newSpell: CustomSpell = {
      id: CustomSpellService.generateId(),
      userId,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      incantation: formData.incantation,
      materials: formData.materials.filter(m => m.trim()),
      steps: formData.steps.filter(s => s.trim()),
      createdAt: Date.now()
    };

    CustomSpellService.saveSpell(newSpell);
    loadSpells();
    resetForm();
    setIsCreating(false);
  };

  const handleDelete = (spellId: string) => {
    CustomSpellService.deleteSpell(userId, spellId);
    loadSpells();
    setSelectedSpell(null);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: IntentCategory.PROTECTION,
      description: '',
      incantation: '',
      materials: [''],
      steps: ['']
    });
  };

  const addMaterial = () => {
    setFormData({ ...formData, materials: [...formData.materials, ''] });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const updateMaterial = (index: number, value: string) => {
    const newMaterials = [...formData.materials];
    newMaterials[index] = value;
    setFormData({ ...formData, materials: newMaterials });
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const removeMaterial = (index: number) => {
    setFormData({ ...formData, materials: formData.materials.filter((_, i) => i !== index) });
  };

  const removeStep = (index: number) => {
    setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6 w-full max-w-6xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: "var(--cyan-turquoise)" }}>
        <div>
          <h2 className="text-2xl font-serif ink-text">custom spells</h2>
          <p className="text-sm ink-text-light mt-2">
            inscribe your own rituals and incantations
          </p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="px-6 py-2 border rounded transition-all duration-300 ink-text-faded"
          style={{ borderColor: "var(--cyan-deep)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--slate-arcane)";
            e.currentTarget.style.boxShadow = "0 0 10px rgba(61, 245, 255, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          + create spell
        </button>
      </div>

      {spells.length === 0 && !isCreating && (
        <div className="text-center py-16">
          <p className="ink-text-light italic">no custom spells yet. begin your grimoire.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spells.map((spell) => {
          const symbol = getElementalSymbol(spell.category);
          return (
            <button
              key={spell.id}
              onClick={() => setSelectedSpell(spell)}
              className="text-left p-4 border rounded transition-all duration-300"
              style={{
                borderColor: "var(--cyan-turquoise)",
                background: "var(--slate-arcane)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = symbol.color;
                e.currentTarget.style.boxShadow = `0 0 15px ${symbol.glowColor}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--cyan-turquoise)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div className="flex items-start gap-3">
                <span 
                  className="text-4xl" 
                  style={{ 
                    color: symbol.color,
                    textShadow: `0 0 10px ${symbol.glowColor}`
                  }}
                >
                  {symbol.symbol}
                </span>
                <div className="flex-1">
                  <h3 className="font-serif text-lg ink-text">{spell.name}</h3>
                  <p className="text-xs ink-text-light mt-1">{symbol.element}</p>
                  <p className="text-sm ink-text-faded mt-2 line-clamp-2">
                    {spell.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Create/Edit Modal */}
      {isCreating && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(5, 7, 10, 0.95)" }}
          onClick={() => {
            setIsCreating(false);
            resetForm();
          }}
        >
          <div 
            className="border-2 rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              background: "var(--obsidian-blue)",
              borderColor: "var(--cyan-deep)",
              boxShadow: "0 0 40px rgba(61, 245, 255, 0.4)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-serif ink-text mb-6">inscribe new spell</h2>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">spell name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border rounded ink-text"
                  style={{ 
                    background: "var(--slate-arcane)",
                    borderColor: "var(--cyan-turquoise)"
                  }}
                  placeholder="name your spell..."
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">elemental category</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.values(IntentCategory).map((category) => {
                    const symbol = getElementalSymbol(category);
                    const isSelected = formData.category === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setFormData({ ...formData, category })}
                        className="p-3 border rounded transition-all duration-300"
                        style={{
                          background: isSelected ? "var(--slate-arcane)" : "transparent",
                          borderColor: isSelected ? symbol.color : "var(--cyan-turquoise)",
                          boxShadow: isSelected ? `0 0 15px ${symbol.glowColor}40` : "none"
                        }}
                      >
                        <div className="text-3xl mb-2" style={{ color: symbol.color, textShadow: `0 0 10px ${symbol.glowColor}` }}>
                          {symbol.symbol}
                        </div>
                        <div className="text-xs ink-text-light">{symbol.element}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded ink-text h-24"
                  style={{ 
                    background: "var(--slate-arcane)",
                    borderColor: "var(--cyan-turquoise)"
                  }}
                  placeholder="describe the spell's purpose..."
                />
              </div>

              {/* Incantation */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">incantation</label>
                <textarea
                  value={formData.incantation}
                  onChange={(e) => setFormData({ ...formData, incantation: e.target.value })}
                  className="w-full p-3 border rounded ink-text h-32 italic"
                  style={{ 
                    background: "var(--slate-arcane)",
                    borderColor: "var(--cyan-turquoise)"
                  }}
                  placeholder="write the words of power..."
                />
              </div>

              {/* Materials */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">materials required</label>
                {formData.materials.map((material, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={material}
                      onChange={(e) => updateMaterial(index, e.target.value)}
                      className="flex-1 p-2 border rounded ink-text text-sm"
                      style={{ 
                        background: "var(--slate-arcane)",
                        borderColor: "var(--cyan-turquoise)"
                      }}
                      placeholder="material..."
                    />
                    {formData.materials.length > 1 && (
                      <button
                        onClick={() => removeMaterial(index)}
                        className="px-3 text-sm ink-text-light hover:ink-text-faded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addMaterial}
                  className="text-sm ink-text-faded hover:ink-text mt-2"
                >
                  + add material
                </button>
              </div>

              {/* Steps */}
              <div>
                <label className="block text-sm ink-text-faded mb-2">ritual steps</label>
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <span className="ink-text-light text-sm pt-2">{index + 1}.</span>
                    <input
                      type="text"
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      className="flex-1 p-2 border rounded ink-text text-sm"
                      style={{ 
                        background: "var(--slate-arcane)",
                        borderColor: "var(--cyan-turquoise)"
                      }}
                      placeholder="ritual step..."
                    />
                    {formData.steps.length > 1 && (
                      <button
                        onClick={() => removeStep(index)}
                        className="px-3 text-sm ink-text-light hover:ink-text-faded"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addStep}
                  className="text-sm ink-text-faded hover:ink-text mt-2"
                >
                  + add step
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleCreate}
                className="flex-1 py-3 border rounded transition-all duration-300 ink-text"
                style={{ 
                  borderColor: "var(--cyan-deep)",
                  background: "var(--slate-arcane)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 15px rgba(61, 245, 255, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                inscribe spell
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  resetForm();
                }}
                className="px-6 py-3 border rounded transition-colors duration-300 ink-text-light"
                style={{ borderColor: "var(--cosmic-graphite)" }}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {selectedSpell && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{ background: "rgba(5, 7, 10, 0.95)" }}
          onClick={() => setSelectedSpell(null)}
        >
          <div 
            className="border-2 rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            style={{
              background: "var(--obsidian-blue)",
              borderColor: getElementalSymbol(selectedSpell.category).color,
              boxShadow: `0 0 40px ${getElementalSymbol(selectedSpell.category).glowColor}60`
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <span 
                className="text-6xl" 
                style={{ 
                  color: getElementalSymbol(selectedSpell.category).color,
                  textShadow: `0 0 20px ${getElementalSymbol(selectedSpell.category).glowColor}`
                }}
              >
                {getElementalSymbol(selectedSpell.category).symbol}
              </span>
              <div className="flex-1">
                <h2 className="text-3xl font-serif ink-text">{selectedSpell.name}</h2>
                <p className="text-sm ink-text-light mt-1">
                  {getElementalSymbol(selectedSpell.category).element} · {getElementalSymbol(selectedSpell.category).description}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {selectedSpell.description && (
                <div>
                  <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                    purpose
                  </h3>
                  <p className="ink-text-light leading-relaxed">{selectedSpell.description}</p>
                </div>
              )}

              {selectedSpell.incantation && (
                <div>
                  <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                    incantation
                  </h3>
                  <p className="ink-text italic leading-loose">{selectedSpell.incantation}</p>
                </div>
              )}

              {selectedSpell.materials.length > 0 && (
                <div>
                  <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                    materials
                  </h3>
                  <ul className="space-y-1">
                    {selectedSpell.materials.map((material, i) => (
                      <li key={i} className="ink-text-light">• {material}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSpell.steps.length > 0 && (
                <div>
                  <h3 className="text-sm font-serif ink-text-faded uppercase tracking-wider mb-2">
                    ritual steps
                  </h3>
                  <ol className="space-y-2">
                    {selectedSpell.steps.map((step, i) => (
                      <li key={i} className="ink-text-light">{i + 1}. {step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => handleDelete(selectedSpell.id)}
                className="px-6 py-3 border rounded transition-colors duration-300 ink-text-light"
                style={{ borderColor: "var(--cosmic-graphite)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#FF4500";
                  e.currentTarget.style.color = "#FF4500";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--cosmic-graphite)";
                  e.currentTarget.style.color = "var(--astral-smoke)";
                }}
              >
                delete
              </button>
              <button
                onClick={() => setSelectedSpell(null)}
                className="flex-1 py-3 border rounded transition-colors duration-300 ink-text-faded"
                style={{ borderColor: "var(--cyan-turquoise)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--slate-arcane)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
