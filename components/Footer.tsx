import React from 'react';
import { Linkedin, Globe, Send } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-hacker-red/20 py-8 relative z-40">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-gray-500 text-sm font-mono tracking-wider">
          © {new Date().getFullYear()} TenaNet Security.
        </div>
        
        <div className="flex items-center gap-6">
          <a 
            href="https://t.me/Tenanetsecurity" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700 hover:border-hacker-red hover:bg-hacker-red/10 transition-all duration-300"
            title="Telegram"
          >
            <Send className="w-5 h-5 text-gray-400 group-hover:text-hacker-red group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a 
            href="https://www.linkedin.com/in/tena-net/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700 hover:border-neon-purple hover:bg-neon-purple/10 transition-all duration-300"
            title="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-neon-purple transition-colors" />
          </a>
          
          <a 
            href="https://officialtenanet.pages.dev/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-900 border border-gray-700 hover:border-white hover:bg-white/10 transition-all duration-300"
            title="Official Website"
          >
            <Globe className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors animate-pulse" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;