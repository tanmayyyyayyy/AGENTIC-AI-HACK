import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { Navbar } from '../components/Navbar.js';
import {
  Sparkles,
  ArrowRight,
  Compass,
  GitCompare,
  Milestone,
  Award,
  CheckCircle2,
  TrendingUp,
  Brain,
  ShieldCheck,
  AlertTriangle,
  FolderGit2,
  Layers,
  ArrowUpRight,
  BriefcaseBusiness,
  MapPin,
  Bot
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { user, demoLogin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleDemo = async () => {
    try {
      await demoLogin();
      toast.success('Loaded evaluator demo profile for Aarav Sharma.');
      navigate('/dashboard');
    } catch {
      toast.error('Failed to initialize demo mode.');
    }
  };

  return (
    <div className="pivot-landing-root">
      <div className="pivot-atmosphere" aria-hidden="true" />
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* HERO SECTION */}
        <section
          style={{
            padding: '4.5rem 1.5rem 3.5rem',
            textAlign: 'center',
            maxWidth: 1200,
            margin: '0 auto',
            position: 'relative'
          }}
        >
          {/* Eyebrow badge */}
          <div
            className="pivot-eyebrow"
            style={{
              justifyContent: 'center',
              marginBottom: '1.4rem'
            }}
          >
            <span className="pivot-live-dot" /> PRODUCT SPACE AI HACKATHON <span className="pivot-eyebrow-slash">/</span> PROBLEM 5: CAREER PIVOT COACH
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              fontWeight: 680,
              letterSpacing: '-0.05em',
              lineHeight: 1.05,
              color: '#ffffff',
              margin: '0 auto 1.4rem',
              maxWidth: 960
            }}
          >
            Stop Learning Randomly.<br />
            <em
              style={{
                color: 'var(--pivot-lime, #d8ff68)',
                fontStyle: 'normal',
                fontFamily: 'var(--font-serif)',
                fontWeight: 500
              }}
            >
              Build Skills That Get You Hired.
            </em>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.02rem, 2vw, 1.22rem)',
              color: '#bac4d9',
              maxWidth: 740,
              margin: '0 auto 2.5rem',
              lineHeight: 1.6
            }}
          >
            Pivot into a new engineering career with a plan grounded in real job descriptions: map skill gaps, build verifiable proof, practice rubric-scored interviews, and learn from application response patterns.
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <Link to={user ? "/dashboard" : "/demo"} className="pivot-cta-primary">
              <span>Build My Pivot Plan</span>
              <ArrowRight size={17} />
            </Link>

            <button onClick={handleDemo} className="pivot-cta-secondary">
              <Sparkles size={16} color="var(--pivot-lime, #d8ff68)" />
              <span>Explore Demo (Aarav Sharma)</span>
            </button>
          </div>

          {/* COCKPIT PREVIEW WINDOW (MATCHING PIVOT STUDIO UI) */}
          <div className="pivot-preview-window" aria-label="Interactive Pivot Studio Preview">
            <div className="pivot-preview-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#27c93f' }} />
                <span style={{ marginLeft: '0.8rem', fontSize: '0.74rem', color: '#90a0be', fontWeight: 650, letterSpacing: '0.04em' }}>
                  PIVOTCRAFT STUDIO / ROUTE 01 · LIVE COCKPIT
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span className="pivot-label" style={{ color: 'var(--pivot-lime, #d8ff68)', fontSize: '0.64rem' }}>
                  <span className="pivot-live-dot" /> TARGET: AI/ML ENGINEER
                </span>
              </div>
            </div>

            {/* Simulated Route Preview */}
            <div style={{ padding: '2rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1.7fr) minmax(260px, 1fr)', gap: '1.5rem', textAlign: 'left' }}>
              {/* Route Map Card */}
              <div
                style={{
                  background: 'rgba(23, 36, 71, 0.7)',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span className="pivot-label"><MapPin size={13} /> THE PIVOT MAP</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--pivot-mint, #70ead8)', fontWeight: 700 }}>ROUTE 01 · ACTIVE</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#90a0bd', fontWeight: 700, letterSpacing: '0.08em' }}>YOUR FIRST WAYPOINT</div>
                <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: '0.3rem 0 0.5rem', fontWeight: 700 }}>
                  Close the Deep Learning with PyTorch gap
                </h3>
                <p style={{ color: '#9aa9c5', fontSize: '0.82rem', margin: '0 0 1rem', lineHeight: 1.5 }}>
                  High role importance (92%). Start with a focused learning sprint, then turn it into verifiable code proof.
                </p>

                {/* SVG Route Visualization */}
                <div style={{ height: 160, width: '100%', position: 'relative' }}>
                  <svg viewBox="0 0 500 160" style={{ width: '100%', height: '100%' }}>
                    <defs>
                      <linearGradient id="landingRouteGlow" x1="0" y1="1" x2="1" y2="0">
                        <stop stopColor="#d8ff68" />
                        <stop offset="1" stopColor="#70ead8" />
                      </linearGradient>
                    </defs>
                    {/* Path glow */}
                    <path
                      d="M 40 120 C 140 125, 180 65, 260 70 S 370 110, 450 35"
                      fill="none"
                      stroke="#d8ff68"
                      strokeOpacity="0.16"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Dashed Line */}
                    <path
                      d="M 40 120 C 140 125, 180 65, 260 70 S 370 110, 450 35"
                      fill="none"
                      stroke="url(#landingRouteGlow)"
                      strokeWidth="3"
                      strokeDasharray="6 7"
                      strokeLinecap="round"
                    />
                    {/* Points */}
                    <circle cx="40" cy="120" r="7" fill="#d8ff68" stroke="#0c1531" strokeWidth="3" />
                    <circle cx="260" cy="70" r="7" fill="#ff806b" stroke="#0c1531" strokeWidth="3" />
                    <circle cx="450" cy="35" r="8" fill="#70ead8" stroke="#0c1531" strokeWidth="3" />
                    {/* Labels */}
                    <text x="40" y="148" fill="#d8ff68" fontSize="11" fontWeight="700" textAnchor="middle">YOUR SKILLS</text>
                    <text x="260" y="98" fill="#ff806b" fontSize="11" fontWeight="700" textAnchor="middle">PYTORCH GAP</text>
                    <text x="450" y="20" fill="#70ead8" fontSize="11" fontWeight="700" textAnchor="middle">AI/ML ENGINEER</text>
                  </svg>
                </div>
              </div>

              {/* Side Metric Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(255, 128, 107, 0.22), rgba(255, 128, 107, 0.08))',
                    border: '1px solid rgba(255, 128, 107, 0.35)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="pivot-label" style={{ color: '#ff806b', fontSize: '0.64rem' }}>CAREER SIGNAL</span>
                    <span style={{ fontSize: '0.62rem', background: '#ff806b', color: '#101a39', fontWeight: 800, padding: '0.15rem 0.4rem', borderRadius: 99 }}>LIVE</span>
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', margin: '0.3rem 0', letterSpacing: '-0.04em' }}>
                    29<small style={{ fontSize: '1.1rem', color: '#ff806b' }}>%</small>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#d0d7e5' }}>
                    Your current verified skill coverage for AI/ML Engineer.
                  </div>
                </div>

                <div
                  style={{
                    padding: '1.25rem',
                    borderRadius: 16,
                    background: 'linear-gradient(135deg, rgba(112, 234, 216, 0.18), rgba(112, 234, 216, 0.06))',
                    border: '1px solid rgba(112, 234, 216, 0.3)'
                  }}
                >
                  <span className="pivot-label" style={{ color: '#70ead8', fontSize: '0.64rem' }}>THE NEXT MOVE</span>
                  <div style={{ fontSize: '0.98rem', fontWeight: 750, color: '#ffffff', margin: '0.4rem 0 0.3rem' }}>
                    Make PyTorch Mastery Visible
                  </div>
                  <p style={{ fontSize: '0.74rem', color: '#b9cadc', margin: 0 }}>
                    Train a multimodal embedding classifier to match product images with text queries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* THE REAL PIVOT CHALLENGE */}
        <section
          id="problem"
          style={{
            padding: '5rem 1.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(10, 18, 43, 0.5)'
          }}
        >
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="pivot-eyebrow" style={{ justifyContent: 'center', marginBottom: '0.6rem' }}>
                <span className="pivot-live-dot" /> THE REAL PIVOT CHALLENGE
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 650,
                  color: '#ffffff',
                  letterSpacing: '-0.03em'
                }}
              >
                Why Most Career Switchers Struggle for Months
              </h2>
              <p style={{ color: '#9aa9c5', maxWidth: 680, margin: '0.75rem auto 0', fontSize: '1.02rem', lineHeight: 1.5 }}>
                Watching tutorials and collecting generic certificates gives an illusion of momentum. Employers hire for demonstrable role readiness.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <div className="pivot-glass-card">
                <AlertTriangle size={26} color="#ff806b" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>Skill Opacity</h3>
                <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Job postings list 30 buzzwords. Learners can't decipher which core competencies actually decide who gets an interview.
                </p>
              </div>

              <div className="pivot-glass-card">
                <Compass size={26} color="#d8ff68" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>Learning Scatter</h3>
                <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Consuming disparate courses without a dependency-aware plan creates confusion and wastes months on the wrong topics.
                </p>
              </div>

              <div className="pivot-glass-card">
                <FolderGit2 size={26} color="#70ead8" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>The Evidence Gap</h3>
                <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Generic tutorial clones (to-do apps, basic calculators) fail to prove technical depth to engineering hiring managers.
                </p>
              </div>

              <div className="pivot-glass-card">
                <TrendingUp size={26} color="#c8b9ff" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem', fontWeight: 700 }}>Outcome Blindness</h3>
                <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  Applying randomly without recording outcomes means learners never discover which role types offer real conversion momentum.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEM 5: THE CLOSED-LOOP PIVOT ENGINE */}
        <section id="problem-5" style={{ padding: '5.5rem 1.5rem', maxWidth: 1160, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div className="pivot-eyebrow" style={{ justifyContent: 'center', marginBottom: '0.6rem' }}>
              <span className="pivot-live-dot" /> PROBLEM 5 SOLUTION ARCHITECTURE
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 650,
                color: '#ffffff',
                letterSpacing: '-0.03em'
              }}
            >
              How PivotCraft AI Closes the Pivot Loop
            </h2>
            <p style={{ color: '#9aa9c5', maxWidth: 650, margin: '0.75rem auto 0', fontSize: '1.02rem', lineHeight: 1.5 }}>
              From initial resume intake to real-world interview and offer outcomes, every step feeds the next move.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#d8ff68', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>01</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Resume & Target-Role Intake</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Parse existing experience and choose an engineering pivot destination from curated tracks or custom role descriptions.
              </p>
            </div>

            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#70ead8', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>02</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Opportunity Match (JD Analyzer)</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Paste live job descriptions to uncover exact missing skills using a deterministic weighted gap formula (<code>gap × importance</code>).
              </p>
            </div>

            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ff806b', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>03</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Weekly Learning Planner</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Convert high-priority gaps into sequenced weekly milestones with time estimates and curated free resources.
              </p>
            </div>

            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#c8b9ff', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>04</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Project Forge (Portfolio Proof)</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Build tailored, production-grade milestone projects designed specifically to prove mastery of uncovered skill gaps.
              </p>
            </div>

            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#d8ff68', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>05</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Rubric-Scored Interview Arena</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Practice real technical interview questions evaluated against objective rubrics with instant feedback and answer breakdowns.
              </p>
            </div>

            <div className="pivot-glass-card">
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#70ead8', display: 'block', marginBottom: '0.4rem', fontFamily: 'var(--font-sans)' }}>06</span>
              <h3 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.4rem', fontWeight: 700 }}>Application Tracker & Feedback Loop</h3>
              <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Record applications, track interview and offer conversion shares by role type, and dynamically adjust what roles you target.
              </p>
            </div>
          </div>
        </section>

        {/* DETAILED CAPABILITIES */}
        <section
          id="features"
          style={{
            padding: '5rem 1.5rem',
            background: 'rgba(10, 18, 43, 0.5)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ maxWidth: 1160, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <div className="pivot-eyebrow" style={{ justifyContent: 'center', marginBottom: '0.6rem' }}>
                <span className="pivot-live-dot" /> ENTERPRISE-GRADE INTELLIGENCE
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 650,
                  color: '#ffffff',
                  letterSpacing: '-0.03em'
                }}
              >
                Engineered for Explainability & Trust
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <GitCompare size={24} color="var(--pivot-lime, #d8ff68)" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.3rem', fontWeight: 700 }}>Deterministic Gap Algorithm</h4>
                  <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Transparent calculation separating self-reported skills from verified proofs, ranking gaps without hallucination.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Milestone size={24} color="var(--pivot-mint, #70ead8)" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.3rem', fontWeight: 700 }}>Vacancy Flight Simulator</h4>
                  <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Interactive what-if simulations testing candidate competitiveness against industry vacancies before submitting applications.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <Brain size={24} color="#ff806b" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.3rem', fontWeight: 700 }}>AI Career Coach + Offline Fallback</h4>
                  <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Google Gemini 3.8 Flash paired with an offline Deterministic Advisory Engine guarantees 100% platform availability.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <ShieldCheck size={24} color="#c8b9ff" style={{ flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.3rem', fontWeight: 700 }}>Skill Proof Lab & Evidence Ledger</h4>
                  <p style={{ color: '#9aa9c5', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    Server-graded coding challenges verify real competence, recording immutable proof points in a canonical ledger.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section style={{ padding: '6rem 1.5rem', textAlign: 'center', maxWidth: 840, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.2rem)',
              fontWeight: 650,
              color: '#ffffff',
              marginBottom: '1rem',
              letterSpacing: '-0.04em'
            }}
          >
            Your next chapter has a route.
          </h2>
          <p style={{ color: '#9aa9c5', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Stop guessing what employers want. Let PivotCraft AI turn your career transition into measurable, verifiable proof.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={user ? "/dashboard" : "/demo"} className="pivot-cta-primary">
              <span>Enter Pivot Studio</span>
              <ArrowRight size={17} />
            </Link>
            <button onClick={handleDemo} className="pivot-cta-secondary">
              <Sparkles size={16} color="var(--pivot-lime, #d8ff68)" />
              <span>Explore Demo Profile</span>
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className="no-print"
        style={{
          padding: '2rem 1.5rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(8, 15, 36, 0.85)',
          color: '#8c9cb8',
          fontSize: '0.82rem'
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#ffffff', fontWeight: 750 }}>
            <span className="pivot-mark" style={{ width: 24, height: 24, padding: 5 }}>
              <span /><span /><span />
            </span>
            <span>pivotcraft<span className="pivot-wordmark-dot">.</span></span>
          </div>
          <div>PRODUCT SPACE AI HACKATHON &bull; PROBLEM 5: CAREER PIVOT COACH (TEAM CRADUO)</div>
          <div style={{ display: 'flex', gap: '1.2rem' }}>
            <Link to="/demo" style={{ color: 'var(--pivot-lime, #d8ff68)', textDecoration: 'none', fontWeight: 650 }}>
              Launch Demo
            </Link>
            <Link to="/auth" style={{ color: '#9aa9c5', textDecoration: 'none' }}>
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
