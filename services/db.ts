import { Certificate } from '../types';
import { hashSync, compareSync } from 'bcryptjs';

// Pre-seeded data from the prompt
// We store plain passwords here temporarily to hash them on first application load.
// This allows the app to transition from "source code data" to "secure local storage data".
const RAW_INITIAL_DATA = [
  { id: '1', name: 'Yonas Getnet', passwordPlain: 'f@6PXTs8SwmVg$', createdAt: Date.now() },
  { id: '2', name: 'Amen Zelalem', passwordPlain: '912380553', createdAt: Date.now() },
  { id: '3', name: 'Yafet Seyoum', passwordPlain: 'Yafetseyome1', createdAt: Date.now() },
  { id: '4', name: 'Iman Bedru', passwordPlain: '"iman17"', createdAt: Date.now() },
  { id: '5', name: 'Eyoel Feleke', passwordPlain: 'eyu_root', createdAt: Date.now() },
  { id: '6', name: 'Eyosiyas Gossaye', passwordPlain: 'ey@#0900352194', createdAt: Date.now() },
  { id: '7', name: 'Ebenezer Hailu', passwordPlain: 'EbenezerCTF@9898', createdAt: Date.now() },
];

const STORAGE_KEY = 'tenanet_certificates';
const SALT_ROUNDS = 10;

export const db = {
  getCertificates: (): Certificate[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // First run: Hash the initial passwords and store them
      const hashedData: Certificate[] = RAW_INITIAL_DATA.map(item => ({
        id: item.id,
        name: item.name,
        passwordHash: hashSync(item.passwordPlain, SALT_ROUNDS),
        createdAt: item.createdAt,
      }));
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(hashedData));
      return hashedData;
    }
    return JSON.parse(stored);
  },

  addCertificate: (name: string, password: string): void => {
    const certs = db.getCertificates();
    const newCert: Certificate = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      passwordHash: hashSync(password, SALT_ROUNDS),
      createdAt: Date.now(),
    };
    certs.push(newCert);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  },

  updateCertificate: (id: string, name: string, passwordOrHash: string): void => {
    const certs = db.getCertificates();
    const index = certs.findIndex(c => c.id === id);
    if (index !== -1) {
      const currentCert = certs[index];
      
      // Determine if passwordOrHash is a new password or the existing hash
      // If it matches the existing hash string, we assume the user didn't change it in the UI.
      // If it's different, we assume it's a new plain text password and hash it.
      let finalPasswordHash = currentCert.passwordHash;
      if (passwordOrHash !== currentCert.passwordHash) {
          finalPasswordHash = hashSync(passwordOrHash, SALT_ROUNDS);
      }

      certs[index] = { ...currentCert, name, passwordHash: finalPasswordHash };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
    }
  },

  deleteCertificate: (id: string): void => {
    const certs = db.getCertificates();
    const filtered = certs.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },

  verifyCertificate: (password: string): Certificate | undefined => {
    const certs = db.getCertificates();
    // Scan all certificates to find a matching password.
    // This effectively treats the password as a retrieval key.
    return certs.find(c => compareSync(password, c.passwordHash));
  }
};