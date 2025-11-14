'use client';

import { useState, useEffect } from 'react';
import { GUIDED_RITUALS, GuidedRitual, RitualStep } from '@/lib/data/guidedRituals';

export default function GuidedRitualsView() {
  const [selectedRitual, setSelectedRitual] = useState<GuidedRitual | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [breathProgress, setBreathProgress] = useState(0);
  const [stepTimeElapsed, setStepTimeElapsed] = useState(0);

  useEffect(() => {
    if (!isActive || !selectedRitual) return;

    const timer = setInterval(() => {
      setStepTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, selectedRitual, currentStepIndex]);

  const nextStep = () => {
    if (currentStepIndex < selectedRitual!.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setBreathProgress(0);
      setBreathPhase('inhale');
      setStepTimeElapsed(0);
    } else {
      stopRitual();
    }
  };

  const previousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      setBreathProgress(0);
      setBreathPhase('inhale');
      setStepTimeElapsed(0);
    }
  };

  useEffect(() => {
    if (!isActive || !selectedRitual) return;

    const currentStep = selectedRitual.steps[currentStepIndex];
    if (!currentStep.breathPattern) return;

    const pattern = currentStep.breathPattern;
    const phases: Array<{ phase: typeof breathPhase; duration: number }> = [
      { phase: 'inhale', duration: pattern.inhale },
      { phase: 'hold', duration: pattern.hold },
      { phase: 'exhale', duration: pattern.exhale },
      { phase: 'pause', duration: pattern.pause }
    ];

    let phaseIndex = 0;
    let elapsed = 0;

    const breathInterval = setInterval(() => {
      const currentPhase = phases[phaseIndex];
      elapsed += 0.1;

      if (elapsed >= currentPhase.duration) {
        elapsed = 0;
        phaseIndex = (phaseIndex + 1) % phases.length;
        setBreathPhase(phases[phaseIndex].phase);
        setBreathProgress(0);
      } else {
        setBreathProgress((elapsed / currentPhase.duration) * 100);
      }
    }, 100);

    return () => clearInterval(breathInterval);
  }, [isActive, currentStepIndex, selectedRitual, breathPhase]);

  const startRitual = (ritual: GuidedRitual) => {
    setSelectedRitual(ritual);
    setIsActive(true);
    setCurrentStepIndex(0);
    setBreathProgress(0);
  };

  const stopRitual = () => {
    setIsActive(false);
    setCurrentStepIndex(0);
    setSelectedRitual(null);
    setStepTimeElapsed(0);
  };

  const getBreathScale = () => {
    if (breathPhase === 'inhale') return 1 + (breathProgress / 100) * 0.5;
    if (breathPhase === 'exhale') return 1.5 - (breathProgress / 100) * 0.5;
    return breathPhase === 'hold' ? 1.5 : 1;
  };

  const getBreathOpacity = () => {
    if (breathPhase === 'inhale') return 0.3 + (breathProgress / 100) * 0.4;
    if (breathPhase === 'exhale') return 0.7 - (breathProgress / 100) * 0.4;
    return breathPhase === 'hold' ? 0.7 : 0.3;
  };

  if (isActive && selectedRitual) {
    const currentStep = selectedRitual.steps[currentStepIndex];
    
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, var(--stellar-black) 0%, var(--obsidian-blue) 100%)'
        }}
      >
        <div className="text-center space-y-12 max-w-3xl px-8">
          {/* Breathing Circle */}
          {currentStep.breathPattern && (
            <div className="relative mx-auto" style={{ width: '300px', height: '300px' }}>
              <div
                className="absolute inset-0 rounded-full transition-all duration-300 ease-in-out"
                style={{
                  background: `radial-gradient(circle, ${selectedRitual.color}40 0%, transparent 70%)`,
                  transform: `scale(${getBreathScale()})`,
                  opacity: getBreathOpacity(),
                  boxShadow: `0 0 60px ${selectedRitual.color}60, inset 0 0 40px ${selectedRitual.color}40`
                }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  color: selectedRitual.color,
                  fontSize: '120px',
                  textShadow: `0 0 30px ${selectedRitual.color}`
                }}
              >
                {selectedRitual.symbol}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-sm ink-text-light uppercase tracking-widest"
                  style={{ marginTop: '200px' }}
                >
                  {breathPhase}
                </span>
              </div>
            </div>
          )}

          {/* Instruction */}
          <div className="space-y-6">
            <p 
              className="text-2xl ink-text font-serif leading-relaxed animate-fadeIn"
              style={{ 
                textShadow: '0 0 10px rgba(61, 245, 255, 0.3)',
                animation: 'fadeIn 1s ease-in'
              }}
            >
              {currentStep.instruction}
            </p>

            {/* Progress and Timer */}
            <div className="space-y-3">
              <div className="flex justify-center gap-2">
                {selectedRitual.steps.map((_, index) => (
                  <div
                    key={index}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: index === currentStepIndex 
                        ? selectedRitual.color 
                        : index < currentStepIndex
                        ? 'var(--cyan-turquoise)'
                        : 'var(--cosmic-graphite)',
                      boxShadow: index === currentStepIndex 
                        ? `0 0 10px ${selectedRitual.color}` 
                        : 'none'
                    }}
                  />
                ))}
              </div>
              
              <div className="text-xs ink-text-light text-center">
                {stepTimeElapsed}s · suggested: {currentStep.duration}s
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={previousStep}
              disabled={currentStepIndex === 0}
              className="px-6 py-2 border rounded transition-all duration-300 ink-text-light text-sm disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ borderColor: 'var(--cosmic-graphite)' }}
              onMouseEnter={(e) => {
                if (currentStepIndex > 0) {
                  e.currentTarget.style.borderColor = 'var(--cyan-turquoise)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--cosmic-graphite)';
              }}
            >
              ← previous
            </button>

            <button
              onClick={nextStep}
              className="px-8 py-2 border-2 rounded transition-all duration-300 ink-text text-sm"
              style={{ 
                borderColor: selectedRitual.color,
                background: 'var(--obsidian-blue)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px ${selectedRitual.color}60`;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {currentStepIndex === selectedRitual.steps.length - 1 ? 'complete' : 'next →'}
            </button>

            <button
              onClick={stopRitual}
              className="px-6 py-2 border rounded transition-all duration-300 ink-text-light text-sm"
              style={{ borderColor: 'var(--cosmic-graphite)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--cyan-turquoise)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--cosmic-graphite)';
              }}
            >
              end ritual
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-serif ink-text tracking-wide">guided rituals</h2>
        <p className="text-sm ink-text-light italic max-w-2xl mx-auto leading-relaxed">
          gentle practices for grounding, release, and inner peace.
          let the grimoire guide you through moments of stillness
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GUIDED_RITUALS.map((ritual) => (
          <div
            key={ritual.id}
            className="border-2 rounded-lg p-6 space-y-4 transition-all duration-300 cursor-pointer"
            style={{
              background: 'var(--slate-arcane)',
              borderColor: 'var(--cyan-turquoise)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = ritual.color;
              e.currentTarget.style.boxShadow = `0 0 20px ${ritual.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--cyan-turquoise)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => startRitual(ritual)}
          >
            <div className="flex items-start gap-4">
              <div
                className="text-5xl"
                style={{
                  color: ritual.color,
                  textShadow: `0 0 15px ${ritual.color}`
                }}
              >
                {ritual.symbol}
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-serif ink-text">{ritual.name}</h3>
                <p className="text-xs ink-text-light uppercase tracking-wider">
                  {ritual.category} · {ritual.duration} minutes
                </p>
              </div>
            </div>

            <p className="text-sm ink-text-faded leading-relaxed">
              {ritual.description}
            </p>

            <div className="pt-4 border-t border-opacity-30" style={{ borderColor: 'var(--cyan-turquoise)' }}>
              <p className="text-xs ink-text-light italic">
                {ritual.ambientDescription}
              </p>
            </div>

            <button
              className="w-full py-3 border rounded transition-all duration-300 ink-text-faded text-sm"
              style={{ borderColor: ritual.color }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--obsidian-blue)';
                e.currentTarget.style.boxShadow = `0 0 15px ${ritual.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              begin ritual
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
