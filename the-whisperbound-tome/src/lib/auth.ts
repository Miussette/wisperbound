export interface User {
  id: string;
  username: string;
  createdAt: number;
}

export interface SavedSpell {
  id: string;
  whisper: string;
  spell: any;
  createdAt: number;
  intent: string;
}

export class AuthService {
  private static USERS_KEY = "whisperbound_users";
  private static CURRENT_USER_KEY = "whisperbound_current_user";
  private static GRIMOIRE_KEY = "whisperbound_grimoire";

  static loginOrRegister(username: string, password: string): User | null {
    if (!username || !password) return null;

    const users = this.getUsers();
    const hashedPassword = this.hashPassword(password);
    
    const existingUser = users.find(u => u.username === username);

    if (existingUser) {
      if (existingUser.password === hashedPassword) {
        const { password: _, ...userWithoutPassword } = existingUser;
        this.setCurrentUser(userWithoutPassword);
        return userWithoutPassword;
      } else {
        return null;
      }
    } else {
      const newUser: User = {
        id: this.generateId(),
        username,
        createdAt: Date.now(),
      };

      users.push({ ...newUser, password: hashedPassword });
      localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      this.setCurrentUser(newUser);
      return newUser;
    }
  }

  static logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  static getCurrentUser(): User | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  private static setCurrentUser(user: User): void {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private static getUsers(): any[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private static hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}

export class GrimoireService {
  private static GRIMOIRE_KEY = "whisperbound_grimoire";

  static saveSpell(userId: string, whisper: string, spell: any, intent: string): SavedSpell {
    const savedSpell: SavedSpell = {
      id: this.generateId(),
      whisper,
      spell,
      createdAt: Date.now(),
      intent,
    };

    const grimoire = this.getGrimoire(userId);
    grimoire.push(savedSpell);
    this.setGrimoire(userId, grimoire);

    return savedSpell;
  }

  static getGrimoire(userId: string): SavedSpell[] {
    const allGrimoires = this.getAllGrimoires();
    return allGrimoires[userId] || [];
  }

  static deleteSpell(userId: string, spellId: string): void {
    const grimoire = this.getGrimoire(userId);
    const filtered = grimoire.filter(s => s.id !== spellId);
    this.setGrimoire(userId, filtered);
  }

  private static setGrimoire(userId: string, grimoire: SavedSpell[]): void {
    const allGrimoires = this.getAllGrimoires();
    allGrimoires[userId] = grimoire;
    localStorage.setItem(this.GRIMOIRE_KEY, JSON.stringify(allGrimoires));
  }

  private static getAllGrimoires(): Record<string, SavedSpell[]> {
    const grimoireJson = localStorage.getItem(this.GRIMOIRE_KEY);
    return grimoireJson ? JSON.parse(grimoireJson) : {};
  }

  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
