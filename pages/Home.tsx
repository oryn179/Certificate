import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Award, ChevronRight } from 'lucide-react';
import { User } from '../types';
import { authService } from '../services/auth';

interface HomeProps {
  user: User | null;
  setUser: (user: User) => void;
}

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const loggedInUser = await authService.loginWithGoogle();
      setUser(loggedInUser);
      navigate('/claim');
    } catch (error) {
      console.error("Login failed", error);
      alert("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCertificate = () => {
    if (user) {
      navigate('/claim');
    } else {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-hacker-dark-red/20 via-black to-black z-0"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 z-0"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-hacker-red/50 bg-hacker-red/10 text-hacker-red mb-8 animate-pulse">
           <Lock className="w-3 h-3" />
           <span className="text-xs font-mono uppercase tracking-widest">Secure Environment</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-orbitron font-black text-white mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          TenaNet-CTF
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-hacker-red to-neon-purple mt-2">
            Digital Certification
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
          Verify your participation and claim your official Capture The Flag digital certificate.
          Authentication required.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <button
            onClick={handleGetCertificate}
            disabled={isLoading}
            className="group relative px-8 py-4 bg-hacker-red hover:bg-red-600 text-white font-orbitron font-bold tracking-wider rounded overflow-hidden transition-all hover:shadow-neon-red disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? 'Authenticating...' : 'Get Your Certificate'}
              {!isLoading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 skew-y-12"></div>
          </button>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm">
             <Award className="w-4 h-4" />
             <span>Official Documentation</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Grid Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hacker-red/10 to-transparent pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 0, 51, .3) 25%, rgba(255, 0, 51, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 51, .3) 75%, rgba(255, 0, 51, .3) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 0, 51, .3) 25%, rgba(255, 0, 51, .3) 26%, transparent 27%, transparent 74%, rgba(255, 0, 51, .3) 75%, rgba(255, 0, 51, .3) 76%, transparent 77%, transparent)',
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
};

export default Home;
