export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: 'admin' | 'user';
}

export interface Certificate {
  id: string;
  name: string;
  passwordHash: string; // Storing plain text for this demo based on prompt list, but treating as "secure" field
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}