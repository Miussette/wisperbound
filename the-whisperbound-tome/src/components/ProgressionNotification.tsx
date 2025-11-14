"use client";

import { useEffect, useState } from "react";
import { Achievement } from "@/lib/progression";

interface ProgressionNotificationProps {
  achievement?: Achievement;
  levelUp?: number;
  mysteryMessage?: string;
  onClose: () => void;
}

export default function ProgressionNotification({
  achievement,
  levelUp,
  mysteryMessage,
  onClose,
}: ProgressionNotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500);
    }, 6000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
      <div className="parchment-border p-12 rounded-lg max-w-lg w-full mx-4 space-y-6 shadow-2xl animate-inkReveal">
        {achievement && (
          <>
            <div className="text-center space-y-4">
              <div className="ornamental-divider">
                <span>✦</span>
              </div>
              <div className="text-7xl mb-4 animate-pulse">{achievement.icon}</div>
              <h3 className="text-3xl font-serif tracking-[0.2em] ink-text" style={{ fontVariant: "small-caps" }}>
                Achievement Unlocked
              </h3>
              <div className="ornamental-divider my-4">
                <span>❖</span>
              </div>
              <h4 className="text-2xl font-serif tracking-[0.15em] ink-text-faded" style={{ fontVariant: "small-caps" }}>
                {achievement.name}
              </h4>
              <p className="text-sm ink-text-light italic mt-3 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          </>
        )}

        {levelUp && (
          <>
            <div className="text-center space-y-4">
              <div className="ornamental-divider">
                <span>✦</span>
              </div>
              <div className="text-7xl mb-4 animate-pulse">✦</div>
              <h3 className="text-3xl font-serif tracking-[0.2em] ink-text" style={{ fontVariant: "small-caps" }}>
                Level Up
              </h3>
              <div className="ornamental-divider my-4">
                <span>❖</span>
              </div>
              <h4 className="text-4xl font-serif tracking-[0.15em] ink-text-faded">
                Level {levelUp}
              </h4>
              <p className="text-sm ink-text-light italic mt-3">
                your power grows...
              </p>
            </div>
          </>
        )}

        {mysteryMessage && (
          <div className="text-center border-t border-[var(--ink-light)] border-opacity-30 pt-6 mt-6">
            <p className="text-sm ink-text-faded italic leading-relaxed">
              {mysteryMessage}
            </p>
          </div>
        )}

        <div className="text-center pt-4">
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-xs ink-text-light hover:ink-text-faded transition-all duration-300 tracking-widest uppercase"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
