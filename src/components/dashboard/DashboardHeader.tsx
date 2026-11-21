import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.js';
import { PivotLogoMark } from '../PivotLogo.js';
import {
  Compass,
  Bot,
  Layers,
  Award,
  BarChart3,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sparkles
} from 'lucide-react';

interface DashboardHeaderProps {
  roleTitle?: string;
  educationInfo?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  roleTitle,
  educationInfo
}) => {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format display role
  const displayRole = roleTitle || (
    profile?.targetRole === 'aiml' ? 'Machine Learning Engineer' :
    profile?.targetRole === 'sde' ? 'Full Stack Developer' :
    profile?.targetRole === 'devops' ? 'DevOps & Cloud Engineer' :
    profile?.targetRole === 'data' ? 'Data Scientist' :
    'Machine Learning Engineer'
  );

  // Format education info
  const displayEducation = educationInfo || (
    profile ? `${profile.degree || profile.educationLevel} · Class of ${profile.graduationYear || 2026}` :
    'B.Tech CSE · Year 3'
  );

  return (
    <header className="editorial-header">
      {/* Brand: Golden Puzzle Logo + Wordmark */}
      <Link to="/dashboard" className="pivot-wordmark" title="PivotCraft AI Dashboard" style={{ textDecoration: 'none' }}>
        <PivotLogoMark size={30} />
        <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
          pivotcraft<span className="pivot-wordmark-dot">.</span>
        </span>
      </Link>

      {/* Right Pills & Menu */}
      <div className="editorial-header-actions">
        {/* Target Role Pill */}
        <div className="editorial-pill" title={`Target Career Role: ${displayRole}`}>
          <span className="editorial-pill-dot" />
          <span className="editorial-pill-text">Target · {displayRole}</span>
        </div>

        {/* Education Pill */}
        <div className="editorial-pill" title={`Education: ${displayEducation}`}>
          <span className="editorial-pill-text">{displayEducation}</span>
        </div>

        {/* Navigation Dropdown Pill */}
        <div style={{ position: 'relative' }} ref={menuRef}>
          <button
            type="button"
            className="editorial-nav-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Navigation Menu"
          >
            <Sparkles size={14} color="var(--pivot-lime, #d8ff68)" />
            <span>Explore</span>
            <ChevronDown size={14} style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>

          {menuOpen && (
            <div className="editorial-nav-dropdown">
              <Link to="/roadmap" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Compass size={16} color="#756659" />
                <span>Roadmap</span>
              </Link>
              <Link to="/analysis" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Layers size={16} color="#756659" />
                <span>Skill Gaps</span>
              </Link>
              <Link to="/projects" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Award size={16} color="#756659" />
                <span>Projects</span>
              </Link>
              <Link to="/ai-coach" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Bot size={16} color="var(--pivot-lime, #d8ff68)" />
                <span>AI Coach</span>
              </Link>
              <Link to="/assessments" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Award size={16} color="#756659" />
                <span>Assessments</span>
              </Link>
              <Link to="/analytics" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <BarChart3 size={16} color="#756659" />
                <span>Analytics</span>
              </Link>
              <Link to="/report" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Sparkles size={16} color="#756659" />
                <span>Readiness Report</span>
              </Link>
              <Link to="/profile" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <User size={16} color="#756659" />
                <span>Profile</span>
              </Link>
              <Link to="/settings" className="editorial-nav-link" onClick={() => setMenuOpen(false)}>
                <Settings size={16} color="#756659" />
                <span>Settings</span>
              </Link>
              <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', margin: '0.4rem 0' }} />
              <button
                type="button"
                className="editorial-nav-link"
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  setMenuOpen(false);
                  logout();
                  navigate('/auth');
                }}
              >
                <LogOut size={16} color="#756659" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
