
interface ToneViolation {
  line: number;
  text: string;
  violation: string;
  suggestion?: string;
}

const FORBIDDEN_PATTERNS = {
  exclamation: /!/g,
  modernSlang: /\b(cool|awesome|great|nice|ok|okay|yeah|yep|nope|gonna|wanna|gotta)\b/gi,
  directCommands: /\b(click|press|tap|select|choose|do this|you must|you should)\b/gi,
  enthusiasm: /\b(amazing|incredible|fantastic|wonderful|excellent)\b/gi,
  casualPhrases: /\b(hey|hi|hello|thanks|thank you)\b/gi,
};

const MODERN_WORDS = [
  'technology', 'computer', 'digital', 'online', 'internet',
  'app', 'software', 'program', 'code', 'data',
  'user', 'login', 'password', 'email', 'website'
];

const PREFERRED_ALTERNATIVES: Record<string, string> = {
  'click': 'speak into',
  'press': 'inscribe upon',
  'select': 'choose with intention',
  'delete': 'release',
  'save': 'inscribe',
  'load': 'summon',
  'user': 'practitioner',
  'login': 'cross the threshold',
  'logout': 'depart',
  'error': 'the way is obscured',
  'success': 'the path reveals itself',
  'complete': 'threshold crossed',
  'next': 'the path continues',
  'previous': 'return to what was',
};

function checkTone(content: string, filePath: string): ToneViolation[] {
  const violations: ToneViolation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // check for exclamation marks
    if (FORBIDDEN_PATTERNS.exclamation.test(line)) {
      violations.push({
        line: lineNumber,
        text: line.trim(),
        violation: 'exclamation mark found — enthusiasm breaks the spell',
        suggestion: 'remove exclamation and let the words carry their own weight'
      });
    }

    // check for modern slang
    const slangMatch = line.match(FORBIDDEN_PATTERNS.modernSlang);
    if (slangMatch) {
      violations.push({
        line: lineNumber,
        text: line.trim(),
        violation: `modern slang detected: "${slangMatch[0]}"`,
        suggestion: 'use archaic or neutral language'
      });
    }

    // check for direct commands
    const commandMatch = line.match(FORBIDDEN_PATTERNS.directCommands);
    if (commandMatch) {
      const word = commandMatch[0].toLowerCase();
      const alternative = PREFERRED_ALTERNATIVES[word];
      violations.push({
        line: lineNumber,
        text: line.trim(),
        violation: `direct command found: "${commandMatch[0]}"`,
        suggestion: alternative ? `consider: "${alternative}"` : 'use passive voice or invitation'
      });
    }

    // check for enthusiasm
    const enthusiasmMatch = line.match(FORBIDDEN_PATTERNS.enthusiasm);
    if (enthusiasmMatch) {
      violations.push({
        line: lineNumber,
        text: line.trim(),
        violation: `excessive enthusiasm: "${enthusiasmMatch[0]}"`,
        suggestion: 'maintain ceremonial restraint'
      });
    }

    // check for modern words
    MODERN_WORDS.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(line)) {
        const alternative = PREFERRED_ALTERNATIVES[word.toLowerCase()];
        violations.push({
          line: lineNumber,
          text: line.trim(),
          violation: `modern word: "${word}"`,
          suggestion: alternative ? `consider: "${alternative}"` : 'seek archaic equivalent'
        });
      }
    });

    // check for missing silence markers in longer sentences
    if (line.length > 80 && !line.includes('—') && !line.includes('…')) {
      if (line.includes(',') || line.includes('.')) {
        violations.push({
          line: lineNumber,
          text: line.trim(),
          violation: 'long sentence without silence markers',
          suggestion: 'consider adding — or … for deliberate pacing'
        });
      }
    }
  });

  return violations;
}

function formatViolations(violations: ToneViolation[], filePath: string): string {
  if (violations.length === 0) {
    return `\n✓ ${filePath}\n  the tone remains true\n`;
  }

  let output = `\n⚠ ${filePath}\n`;
  output += `  ${violations.length} violation${violations.length > 1 ? 's' : ''} found\n\n`;

  violations.forEach(v => {
    output += `  line ${v.line}: ${v.violation}\n`;
    output += `    "${v.text}"\n`;
    if (v.suggestion) {
      output += `    → ${v.suggestion}\n`;
    }
    output += '\n';
  });

  return output;
}

// main execution
export function validateTone(filePath: string, content: string): {
  valid: boolean;
  violations: ToneViolation[];
  report: string;
} {
  const violations = checkTone(content, filePath);
  const report = formatViolations(violations, filePath);
  
  return {
    valid: violations.length === 0,
    violations,
    report
  };
}

// hook configuration for Kiro
export const hookConfig = {
  name: 'tone-check',
  description: 'verifies ceremonial tone in content files',
  trigger: 'on-save',
  filePatterns: [
    '**/*.md',
    '**/*.tsx',
    '**/*.ts',
    '**/data/*.ts'
  ],
  excludePatterns: [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**'
  ]
};
