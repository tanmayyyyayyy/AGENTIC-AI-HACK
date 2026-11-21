import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { Sparkles, LayoutDashboard, LogIn, UserPlus, LogOut } from 'lucide-react';
import { PivotLogoMark } from './PivotLogo.js';

export const Navbar: React.FC = () => {
  const { user, logout, demoLogin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleDemoClick = async () => {
    try {
      await demoLogin();
      toast.success('Demo mode loaded! Welcome to PivotCraft AI.');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to load demo mode.');
    }
  };

  return (
    <header className="pivot-navbar no-print">
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
        <Link to="/" className="pivot-wordmark" aria-label="PivotCraft home">
          <PivotLogoMark size={30} />
          <span>pivotcraft<span className="pivot-wordmark-dot">.</span></span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }} className="desktop-nav">
          <a href="#how-it-works" style={{ color: '#bfc8dd', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            How It Works
          </a>
          <a href="#problem-5" style={{ color: '#bfc8dd', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Problem 5
          </a>
          <a href="#features" style={{ color: '#bfc8dd', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
            Capabilities
          </a>
        </nav>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <button
          onClick={handleDemoClick}
          className="pivot-cta-secondary"
          style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem', borderColor: 'rgba(216, 255, 104, 0.4)', color: '#d8ff68' }}
          title="Instant 1-Click Evaluation for Hackathon Judges"
        >
          <Sparkles size={14} color="#d8ff68" />
          <span>Explore Demo</span>
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <Link to="/dashboard" className="pivot-cta-primary" style={{ padding: '0.55rem 1.2rem', fontSize: '0.82rem' }}>
              <LayoutDashboard size={14} />
              <span>Studio</span>
            </Link>
            <button
              onClick={() => {
                logout();
                toast.info('Logged out successfully.');
                navigate('/');
              }}
              className="btn btn-ghost btn-sm"
              style={{ color: '#9aa9c5' }}
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Link to="/auth" style={{ color: '#bfc8dd', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', padding: '0.5rem 0.8rem' }}>
              <LogIn size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
              Sign In
            </Link>
            <Link to="/auth?mode=register" className="pivot-cta-primary" style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}>
              <UserPlus size={14} />
              <span>Get Started</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
