import {
  AuthUser,
  AuthSession,
  LoginCredentials,
  RegisterData,
} from "@/lib/auth-types";

// -----------------------------------------
// Mock Database
// -----------------------------------------

const MOCK_USERS: Record<
  string,
  {
    user: AuthUser;
    password: string;
  }
> = {
  "demo@example.com": {
    user: {
      id: "demo-user",
      email: "demo@example.com",
      firstName: "Demo",
      lastName: "User",
      role: "auditor",
      phone: "+919999999999",
      company: "Demo Security",
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date("2025-01-01"),
    },
    password: "Demo@1234567890",
  },

  "company@example.com": {
    user: {
      id: "company-user",
      email: "company@example.com",
      firstName: "Jane",
      lastName: "Company",
      role: "audited",
      phone: "+1234567890",
      company: "Tech Corp",
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date("2024-01-15"),
    },
    password: "password123",
  },

  "auditor@example.com": {
    user: {
      id: "auditor-user",
      email: "auditor@example.com",
      firstName: "John",
      lastName: "Auditor",
      role: "auditor",
      phone: "+1987654321",
      company: "Audit Labs",
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date("2024-01-20"),
    },
    password: "password123",
  },

  "verifier@example.com": {
    user: {
      id: "verifier-user",
      email: "verifier@example.com",
      firstName: "Alex",
      lastName: "Verifier",
      role: "investor",
      company: "Verifier DAO",
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date("2024-02-01"),
    },
    password: "password123",
  },
};

export const authService = {
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: AuthUser; session: AuthSession } | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userRecord = MOCK_USERS[credentials.email];

    if (!userRecord) {
      return null;
    }

    if (userRecord.password !== credentials.password) {
      return null;
    }

    const session: AuthSession = {
      accessToken: `access-${Date.now()}`,
      refreshToken: `refresh-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      user: userRecord.user,
    };

    // Persist session
    if (typeof window !== "undefined") {
      localStorage.setItem("authSession", JSON.stringify(session));
    }

    return {
      user: userRecord.user,
      session,
    };
  },

  async register(
    data: RegisterData
  ): Promise<{ user: AuthUser; session: AuthSession } | null> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (MOCK_USERS[data.email]) {
      return null;
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
      phone: data.phone,
      company: data.company,
      emailVerified: true,
      twoFactorEnabled: false,
      createdAt: new Date(),
    };

    const session: AuthSession = {
      accessToken: `access-${Date.now()}`,
      refreshToken: `refresh-${Date.now()}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      user: newUser,
    };

    MOCK_USERS[data.email] = {
      user: newUser,
      password: data.password,
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("authSession", JSON.stringify(session));
    }

    return {
      user: newUser,
      session,
    };
  },

  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (typeof window !== "undefined") {
      // Remove all known auth keys explicitly
      const knownKeys = [
        "authSession",
        "zka-auth-storage",
        "zk-auth-storage",
        "pendingEmailVerification",
      ];
      knownKeys.forEach((key) => localStorage.removeItem(key));

      // Sweep any remaining keys matching auth/session/token/user patterns
      const authPatterns = /auth|session|token|user/i;
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && authPatterns.test(key)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));

      // Clear sessionStorage entirely
      sessionStorage.clear();
    }
  },

  async getCurrentUser() {
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (typeof window === "undefined") {
      return null;
    }

    const session = localStorage.getItem("authSession");

    if (!session) {
      return null;
    }

    return JSON.parse(session).user as AuthUser;
  },

  async refreshSession() {
    if (typeof window === "undefined") {
      return null;
    }

    const session = localStorage.getItem("authSession");

    if (!session) {
      return null;
    }

    return JSON.parse(session) as AuthSession;
  },
};