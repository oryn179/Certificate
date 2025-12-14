import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../types';
import { authService } from '../services/auth';

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    navigate('/');
  };

  return (
    <nav className="border-b border-hacker-red/30 bg-black/80 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <Shield className="h-8 w-8 text-hacker-red group-hover:animate-pulse" />
              <span className="font-orbitron font-bold text-xl tracking-wider text-white">
                Tena<span className="text-hacker-red">Net</span>-CTF
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                  <img 
                    src={user.photoURL} 
                    alt="avatar" 
                    className="h-8 w-8 rounded-full border border-hacker-red"
                  />
                  <span className="font-orbitron">{user.displayName}</span>
                </div>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin/dashboard" 
                    className={`text-sm font-orbitron hover:text-hacker-red ${location.pathname.includes('admin') ? 'text-hacker-red' : 'text-gray-300'}`}
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-hacker-dark-red/50 hover:bg-hacker-red rounded border border-hacker-red transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <span className="text-xs text-gray-500 font-mono">SECURE CONNECTION REQUIRED</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;