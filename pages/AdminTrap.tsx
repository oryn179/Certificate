import React, { useEffect, useRef } from 'react';
import { Skull } from 'lucide-react';

const AdminTrap: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to play sound on mount
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2034/2034-preview.mp3');
    audio.volume = 0.8;
    audioRef.current = audio;
    
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Auto-play was prevented
        console.log("Auto-play prevented by browser policy", error);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative z-50">
      {/* Intense Background Animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-black to-black animate-pulse z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 z-0"></div>

      <div className="z-10 flex flex-col items-center relative">
        <div className="mb-8 animate-bounce">
            <Skull className="w-24 h-24 text-red-600 drop-shadow-[0_0_25px_rgba(255,0,0,1)]" />
        </div>

        <h1 className="text-4xl md:text-8xl font-gothic text-center text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-900 drop-shadow-[0_0_30px_rgba(255,0,0,0.8)] tracking-widest animate-pulse select-none">
          hahaha
        </h1>
        
        <h2 className="mt-8 text-2xl md:text-5xl font-orbitron font-bold text-red-500 text-center drop-shadow-[0_0_10px_#ff0000] border-y-2 border-red-800 py-4 px-8 bg-black/50 backdrop-blur-sm">
          U want admin accesses
        </h2>

        <p className="mt-12 text-red-900/50 font-mono text-sm tracking-[0.5em] uppercase">
          Access Denied • Incident Logged • IP Traced
        </p>
      </div>

      {/* Glitch Overlay effects */}
      <div className="absolute inset-0 pointer-events-none bg-red-500/5 mix-blend-overlay"></div>
    </div>
  );
};

export default AdminTrap;
