"use client";

import { useState } from "react";
import { AuthService } from "@/lib/auth";

interface AuthModalProps {
  onSuccess: () => void;
}

export default function AuthModal({ onSuccess }: AuthModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("please inscribe both name and secret word");
      return;
    }

    if (username.length < 3) {
      setError("name must be at least 3 characters");
      return;
    }

    if (password.length < 4) {
      setError("secret word must be at least 4 characters");
      return;
    }

    const user = AuthService.loginOrRegister(username, password);
    if (user) {
      onSuccess();
    } else {
      setError("incorrect secret word for this name");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="parchment-border p-8 rounded-lg max-w-md w-full mx-4 space-y-6 animate-inkReveal relative">
        <button
          onClick={onSuccess}
          className="absolute top-4 right-4 text-xl ink-text-light hover:ink-text transition-all duration-300"
          title="Close"
        >
          ✕
        </button>

        <div className="text-center space-y-2">
          <h2 className="text-2xl font-serif tracking-[0.2em] ink-text" style={{ fontVariant: "small-caps" }}>
            Enter the Tome
          </h2>
          <div className="ornamental-divider my-4">
            <span>✦</span>
          </div>
          <p className="text-xs ink-text-light italic tracking-wide">
            inscribe your name and secret word
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs tracking-widest ink-text-faded uppercase mb-2">
              Name
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[var(--ink-light)] ink-text p-2 outline-none focus:border-[var(--ink-faded)] transition-all duration-500"
              placeholder="your name..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs tracking-widest ink-text-faded uppercase mb-2">
              Secret Word
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[var(--ink-light)] ink-text p-2 outline-none focus:border-[var(--ink-faded)] transition-all duration-500"
              placeholder="your secret..."
            />
          </div>

          {error && (
            <p className="text-sm ink-text-faded text-center italic">{error}</p>
          )}

          <button
            type="submit"
            className="w-full parchment-border px-6 py-3 text-sm tracking-[0.2em] ink-text-faded hover:ink-text hover:shadow-lg transition-all duration-500 uppercase"
          >
            Enter
          </button>
        </form>

        <div className="text-center pt-4 border-t border-[var(--ink-light)] border-opacity-30">
          <p className="text-xs ink-text-light italic leading-relaxed">
            if your name is new, a grimoire will be created
            <br />
            if it exists, your secret word must match
          </p>
        </div>
      </div>
    </div>
  );
}
