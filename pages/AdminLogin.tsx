import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowRight } from 'lucide-react';
import { authService } from '../services/auth';
import { User } from '../types';

interface AdminLoginProps {
  user: User | null;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ user }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'verify' | 'code'>('verify');
  const [code, setCode] = useState('');
  const [sentCode, setSentCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If not logged in or not admin, kick out
    if (!user || user.role !== 'admin' || user.email !== 'oryn179@gmail.com') {
      alert("Access Denied. Admin privileges required.");
      navigate('/');
    } else {
        // Auto trigger code send
        handleSendCode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const handleSendCode = async () => {
    if (!user?.email) return;
    try {
      const c = await authService.send2FACode(user.email);
      setSentCode(c);
      setStep('code');
    } catch (err) {
      setError("Failed to send 2FA code.");
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === sentCode) {
      navigate('/admin/dashboard');
    } else {
      setError("Invalid Verification Code.");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center bg-hacker-black">
      <div className="max-w-md w-full mx-4">
        <div className="bg-gray-900 border-2 border-hacker-red rounded-lg p-8 shadow-neon-red relative overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>

          <div className="flex justify-center mb-6">
             <div className="p-4 bg-hacker-red/10 rounded-full border border-hacker-red animate-pulse">
               <ShieldAlert className="w-12 h-12 text-hacker-red" />
             </div>
          </div>

          <h2 className="text-2xl font-orbitron font-bold text-center text-white mb-2">
            ADMIN 2FA REQUIRED
          </h2>
          <p className="text-center text-gray-400 text-sm mb-8 font-mono">
            Verification code sent to {user.email}
          </p>

          <form onSubmit={handleVerify} className="space-y-6 relative z-10">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-black border border-gray-700 text-center text-2xl tracking-[0.5em] font-mono text-hacker-red py-3 rounded focus:border-hacker-red outline-none shadow-inner"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            {error && <p className="text-red-500 text-center text-sm font-bold">{error}</p>}

            <button
              type="submit"
              className="w-full bg-hacker-red hover:bg-red-700 text-white font-bold py-3 rounded transition-all uppercase tracking-wider flex items-center justify-center gap-2"
            >
              Verify Identity <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;