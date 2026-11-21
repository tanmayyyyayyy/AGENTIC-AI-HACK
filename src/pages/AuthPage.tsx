import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { Sparkles, LogIn, UserPlus, ShieldCheck } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isRegister, setIsRegister] = useState(searchParams.get('mode') === 'register');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, register, demoLogin, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsRegister(searchParams.get('mode') === 'register');
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) {
          throw new Error('Please enter your full name.');
        }
        await register(name.trim(), email.trim(), password);
        toast.success('Account created! Welcome to PivotCraft AI.');
        navigate('/onboarding');
      } else {
        await login(email.trim(), password);
        toast.success('Welcome back!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      const msg = err.message || 'Authentication failed. Please check your credentials.';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      await demoLogin();
      toast.success('Demo profile loaded! You are logged in as Aarav Sharma.');
      navigate('/dashboard');
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to initialize demo session.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="pivot-landing-root"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        position: 'relative'
      }}
    >
      <div className="pivot-atmosphere" aria-hidden="true" />

      <div
        style={{
          maxWidth: 440,
          width: '100%',
          background: 'rgba(23, 36, 71, 0.82)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: 20,
          padding: '2.5rem 2rem',
          boxShadow: '0 24px 60px rgba(4, 9, 23, 0.75)',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link
            to="/"
            className="pivot-wordmark"
            style={{ fontSize: '1.35rem', justifyContent: 'center' }}
            aria-label="PivotCraft home"
          >
            <span className="pivot-mark">
              <span /><span /><span />
            </span>
            <span>pivotcraft<span className="pivot-wordmark-dot">.</span></span>
          </Link>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              fontWeight: 650,
              color: '#ffffff',
              marginTop: '1.25rem',
              letterSpacing: '-0.03em'
            }}
          >
            {isRegister ? 'Create Your Account' : 'Welcome Back'}
          </h2>
          <p style={{ color: '#9aa9c5', fontSize: '0.88rem', marginTop: '0.35rem' }}>
            {isRegister
              ? 'Start mapping your personalized career pivot today.'
              : 'Sign in to access your saved skills, roadmap, and progress.'}
          </p>
        </div>

        {/* 1-Click Evaluator Demo Access Box */}
        <div
          style={{
            background: 'rgba(216, 255, 104, 0.08)',
            border: '1px solid rgba(216, 255, 104, 0.28)',
            borderRadius: 14,
            padding: '1.1rem',
            marginBottom: '1.75rem',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              color: 'var(--pivot-lime, #d8ff68)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '0.6rem'
            }}
          >
            <Sparkles size={14} color="var(--pivot-lime, #d8ff68)" />
            <span>Hackathon Evaluator Quick Access</span>
          </div>
          <button
            type="button"
            onClick={handleDemoAccess}
            disabled={isLoading}
            className="btn btn-secondary"
            style={{
              width: '100%',
              background: 'rgba(216, 255, 104, 0.16)',
              color: 'var(--pivot-lime, #d8ff68)',
              borderColor: 'rgba(216, 255, 104, 0.45)',
              fontSize: '0.88rem',
              fontWeight: 750,
              padding: '0.65rem'
            }}
          >
            <ShieldCheck size={16} color="var(--pivot-lime, #d8ff68)" />
            <span>Explore Demo Profile (Aarav Sharma)</span>
          </button>
          <div style={{ fontSize: '0.74rem', color: '#90a0be', marginTop: '0.45rem' }}>
            Instant access with pre-loaded AI/ML profile, completed tasks, and assessments.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
          <span style={{ fontSize: '0.72rem', color: '#7a8ba8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 650 }}>
            Or continue with email
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(255, 255, 255, 0.1)' }} />
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              padding: '0.75rem 1rem',
              background: 'rgba(255, 95, 86, 0.15)',
              border: '1px solid rgba(255, 95, 86, 0.35)',
              borderRadius: 10,
              color: '#ff806b',
              fontSize: '0.85rem',
              marginBottom: '1.25rem'
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group">
              <label className="form-label" htmlFor="name" style={{ color: '#dce3f1' }}>Full Name</label>
              <input
                id="name"
                type="text"
                required
                className="form-input"
                placeholder="e.g. Tanmay Jain"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email" style={{ color: '#dce3f1' }}>Email Address</label>
            <input
              id="email"
              type="email"
              required
              className="form-input"
              placeholder="you@domain.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password" style={{ color: '#dce3f1' }}>Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="form-input"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', fontSize: '0.95rem' }}
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : isRegister ? (
              <>
                <UserPlus size={16} />
                <span>Create Account</span>
              </>
            ) : (
              <>
                <LogIn size={16} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>

        {/* Switch mode */}
        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.88rem', color: '#9aa9c5' }}>
          {isRegister ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setErrorMessage(''); }}
                style={{ color: 'var(--pivot-lime, #d8ff68)', fontWeight: 650, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Sign In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setErrorMessage(''); }}
                style={{ color: 'var(--pivot-lime, #d8ff68)', fontWeight: 650, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Create One
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
