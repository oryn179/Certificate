import { User } from '../types';

const ADMIN_EMAIL = 'oryn179@gmail.com';

// Simulated Google User
const MOCK_ADMIN_USER: User = {
  uid: 'admin-123',
  email: ADMIN_EMAIL,
  displayName: 'Oryn CEO',
  photoURL: 'https://picsum.photos/200',
  role: 'admin'
};

const MOCK_REGULAR_USER: User = {
  uid: 'user-456',
  email: 'participant@gmail.com',
  displayName: 'CTF Player',
  photoURL: 'https://picsum.photos/200',
  role: 'user'
};

export const authService = {
  loginWithGoogle: async (): Promise<User> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple toggle for demo purposes: 
    // If we are on the admin page route or checking admin specific flows, we might want to return admin.
    // However, usually Google Auth returns *whoever* logs in.
    // To make the demo testable, let's use a browser prompt to ask "Simulate Admin Login?"
    
    const isAdmin = window.confirm("SIMULATION: Click OK to login as Admin (oryn179@gmail.com)\nClick Cancel to login as Regular User");
    
    const user = isAdmin ? MOCK_ADMIN_USER : MOCK_REGULAR_USER;
    
    localStorage.setItem('tenanet_user', JSON.stringify(user));
    return user;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem('tenanet_user');
  },

  getCurrentUser: (): User | null => {
    const stored = localStorage.getItem('tenanet_user');
    return stored ? JSON.parse(stored) : null;
  },

  send2FACode: async (email: string): Promise<string> => {
    if (email !== ADMIN_EMAIL) throw new Error("Unauthorized");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`[SECURE EMAIL SERVICE] Verification Code sent to ${email}: ${code}`);
    alert(`2FA Code sent to ${email}: ${code}`);
    return code;
  }
};