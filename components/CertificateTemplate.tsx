import React from 'react';
import { ShieldCheck, Bug, Terminal } from 'lucide-react';

interface CertificateTemplateProps {
  recipientName: string;
  id?: string;
}

const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ recipientName, id = "certificate-container" }) => {
  return (
    <div 
      id={id}
      className="relative w-full aspect-[1.414/1] bg-black overflow-hidden shadow-2xl flex flex-col items-center justify-between p-8 md:p-12"
      style={{
        background: 'linear-gradient(135deg, #2a0000 0%, #000000 50%, #1a0005 100%)',
      }}
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #ff0033 0%, transparent 60%)' }}>
      </div>

      {/* Top Section */}
      <div className="w-full flex justify-between items-start z-10 relative">
        <div className="bg-hacker-red/10 p-3 rounded-full border border-hacker-red/50 shadow-neon-red">
          <Bug className="w-12 h-12 text-hacker-red" />
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2 mb-1">
             <ShieldCheck className="w-6 h-6 text-white" />
             <h2 className="text-white font-orbitron font-bold text-xl tracking-wider">TenaNet</h2>
          </div>
          <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">Cyber Security Division</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 w-full flex-grow mt-4 mb-4">
        
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 tracking-widest mb-2 uppercase">
          Certificate
        </h1>
        <p className="text-hacker-red font-orbitron tracking-[0.3em] text-sm md:text-base mb-8 md:mb-12 uppercase">
          Of Participation Our CTF
        </p>

        <p className="text-gray-300 font-mono text-sm md:text-base mb-4">
          HUGE THANK TO :
        </p>

        <div className="relative mb-6 md:mb-8 w-full">
            {/* The Name Highlight */}
            <div className="absolute inset-0 bg-neon-purple blur-[40px] opacity-30 rounded-full transform scale-x-150"></div>
            <div className="relative bg-gradient-to-r from-neon-purple/20 via-neon-purple/40 to-neon-purple/20 py-4 px-8 rounded-lg border-y border-neon-purple/50">
              <h2 className="text-4xl md:text-6xl font-gothic text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] tracking-wide">
                {recipientName}
              </h2>
            </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-xs md:text-sm leading-relaxed font-sans">
            Thank you for your dedication and participation in the CTF event.
            Your efforts and skills made this competition memorable. We
            appreciate your hard work and enthusiasm!
          </p>
          <p className="text-gray-500 text-[10px] mt-2 font-mono">Verified by TenaNet-CTF</p>
        </div>
      </div>

      {/* Footer / Signature */}
      <div className="w-full flex justify-between items-end z-10 relative mt-4">
         <div className="text-left relative min-w-[200px]">
            <div className="w-40 h-px bg-hacker-red mb-2 relative z-10"></div>
            <p className="text-white font-orbitron font-bold text-sm relative z-10">ORYN</p>
            <p className="text-gray-400 text-xs uppercase relative z-10">Company CEO</p>
         </div>
         
         <div className="opacity-80">
            {/* Cute Hacker Mascot Bottom Right */}
            <div className="w-20 h-20 bg-black/50 rounded-full border border-hacker-red/30 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-hacker-red/20 animate-pulse"></div>
                <Terminal className="w-10 h-10 text-white relative z-10" />
            </div>
         </div>
      </div>
    </div>
  );
};

export default CertificateTemplate;