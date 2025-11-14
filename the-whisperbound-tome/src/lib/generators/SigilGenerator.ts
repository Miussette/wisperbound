import { IntentCategory, Sigil } from "../types";
import { INTENT_CORPUS } from "../data/intentCorpus";

export class SigilGenerator {
  private patterns = ["circle", "triangle", "line", "cross"] as const;

  generate(seed: number, intent: IntentCategory): Sigil {
    const symbolSet = [...INTENT_CORPUS[intent].symbolSet];
    const rand = this.createPRNG(seed);
    
    const lineCount = 3 + (rand() % 5);
    const patternType = this.patterns[rand() % this.patterns.length];
    
    const lines = this.generatePattern(patternType, lineCount, symbolSet, rand);
    
    return {
      lines: this.centerAlign(lines),
      symbolSet,
      pattern: patternType,
    };
  }

  private generatePattern(
    pattern: string,
    lineCount: number,
    symbols: string[],
    rand: () => number
  ): string[] {
    switch (pattern) {
      case "circle":
        return this.generateCircle(lineCount, symbols, rand);
      case "triangle":
        return this.generateTriangle(lineCount, symbols, rand);
      case "line":
        return this.generateLine(lineCount, symbols, rand);
      case "cross":
        return this.generateCross(lineCount, symbols, rand);
      default:
        return this.generateLine(lineCount, symbols, rand);
    }
  }

  private generateCircle(lineCount: number, symbols: string[], rand: () => number): string[] {
    const lines: string[] = [];
    const mid = Math.floor(lineCount / 2);
    
    for (let i = 0; i < lineCount; i++) {
      if (i === 0 || i === lineCount - 1) {
        lines.push(symbols[rand() % symbols.length]);
      } else if (i === mid) {
        const left = symbols[rand() % symbols.length];
        const center = symbols[rand() % symbols.length];
        const right = symbols[rand() % symbols.length];
        lines.push(`${left}   ${center}   ${right}`);
      } else {
        const left = symbols[rand() % symbols.length];
        const right = symbols[rand() % symbols.length];
        lines.push(`${left}       ${right}`);
      }
    }
    
    return lines;
  }

  private generateTriangle(lineCount: number, symbols: string[], rand: () => number): string[] {
    const lines: string[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      const symbolCount = i + 1;
      const line = Array.from({ length: symbolCount }, () => 
        symbols[rand() % symbols.length]
      ).join("   ");
      lines.push(line);
    }
    
    return lines;
  }

  private generateLine(lineCount: number, symbols: string[], rand: () => number): string[] {
    const lines: string[] = [];
    
    for (let i = 0; i < lineCount; i++) {
      const symbolCount = 1 + (rand() % 3);
      const line = Array.from({ length: symbolCount }, () =>
        symbols[rand() % symbols.length]
      ).join("   ");
      lines.push(line);
    }
    
    return lines;
  }

  private generateCross(lineCount: number, symbols: string[], rand: () => number): string[] {
    const lines: string[] = [];
    const mid = Math.floor(lineCount / 2);
    
    for (let i = 0; i < lineCount; i++) {
      if (i === mid) {
        const line = Array.from({ length: 3 }, () =>
          symbols[rand() % symbols.length]
        ).join("   ");
        lines.push(line);
      } else {
        lines.push(symbols[rand() % symbols.length]);
      }
    }
    
    return lines;
  }

  private createPRNG(seed: number): () => number {
    let state = seed;
    return () => {
      state = (state * 1664525 + 1013904223) >>> 0;
      return state;
    };
  }

  private centerAlign(lines: string[]): string[] {
    const maxLength = Math.max(...lines.map(l => l.length));
    return lines.map(line => {
      const padding = Math.floor((maxLength - line.length) / 2);
      return " ".repeat(padding) + line;
    });
  }
}
