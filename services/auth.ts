import { User } from '../types';

// Standard User Mock
const MOCK_USER: User = {
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
    
    // Always return the standard user
    const user = MOCK_USER;
    
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
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Generate mock 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // In a real application, this would send an email.
    // For this demo, we assume the code is sent successfully.
    // We return it here so the calling component can store it for verification comparison.
    console.log(`[MOCK] 2FA code for ${email}: ${code}`);
    
    return code;
  }
};
