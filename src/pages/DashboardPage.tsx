import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import { useToast } from '../context/ToastContext.js';
import { api } from '../services/api.js';
import type { CareerReadinessScore, LearningActivityLog, OpportunityMatchResult, ProjectRecommendation, RoadmapResult, SkillGapAnalysisResult } from '../types/index.js';
import { ArrowDownRight, ArrowRight, ArrowUpRight, BriefcaseBusiness, Check, Compass, Crosshair, Layers3, Map, ScanSearch, Sparkles, Timer, WandSparkles } from 'lucide-react';
import { PivotLogoMark } from '../components/PivotLogo.js';

function initials(name: string): string {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]?.toUpperCase()).join('') || 'Y';
}

export const DashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const toast = useToast();
  const [readiness, setReadiness] = useState<CareerReadinessScore | null>(null);
  const [gaps, setGaps] = useState<SkillGapAnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<RoadmapResult | null>(null);
  const [projects, setProjects] = useState<ProjectRecommendation[]>([]);
  const [activities, setActivities] = useState<LearningActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoursPerWeek, setHoursPerWeek] = useState(profile?.weeklyHours || 8);
  const [jobDraft, setJobDraft] = useState('');
  const [flightMatch, setFlightMatch] = useState<OpportunityMatchResult | null>(null);
  const [scanBusy, setScanBusy] = useState(false);
  const [focusMissingSkill, setFocusMissingSkill] = useState('');

  const loadDashboard = useCallback(async () => {
    try {
      const [readinessRes, gapsRes, roadmapRes, projectsRes, activitiesRes] = await Promise.all([
        api.readiness.get(), api.analysis.get(), api.roadmap.get(), api.projects.get(), api.activities.getAll()
      ]);
      setReadiness(readinessRes.readiness);
      setGaps(gapsRes.analysis);
      setRoadmap(roadmapRes.roadmap);
      setProjects(projectsRes.projects);
      setActivities(activitiesRes.activities);
    } catch (error: any) {
      toast.error(error?.message || 'Could not load your career route. Try refreshing the page.');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const runFlightSimulation = async (event: React.FormEvent) => {
    event.preventDefault();
    if (jobDraft.trim().length < 80) {
      toast.info('Paste a few lines from the job description so the role scan has real requirements to compare.');
      return;
    }
    try {
      setScanBusy(true);
      const result = await api.opportunityMatch.evaluate({ description: jobDraft.trim() });
      setFlightMatch(result.match);
      setFocusMissingSkill(result.match.requiredSkillsMissing[0]?.skillId || result.match.preferredSkillsMissing[0]?.skillId || '');
    } catch (error: any) {
      toast.error(error?.message || 'The role scan could not be completed.');
    } finally {
      setScanBusy(false);
    }
  };

  useEffect(() => { void loadDashboard(); }, [loadDashboard]);
  useEffect(() => { if (profile?.weeklyHours) setHoursPerWeek(profile.weeklyHours); }, [profile?.weeklyHours]);

  const openGaps = useMemo(() => (gaps?.items || [])
    .filter(item => item.currentLevel < item.requiredLevel)
    .sort((a, b) => b.priorityScore - a.priorityScore), [gaps]);
  const topGap = openGaps[0];
  const nextProject = projects.find(project => project.userStatus !== 'completed') || projects[0];
  const roadmapTasks = roadmap?.stages.flatMap(stage => stage.tasks) || [];
  const completedRoadmap = roadmapTasks.filter(task => task.status === 'completed').length;
  const totalRoadmap = roadmapTasks.length;
  const totalGapHours = openGaps.reduce((sum, item) => sum + item.estimatedLearningHours, 0);
  const weeksEstimate = Math.max(1, Math.ceil(totalGapHours / Math.max(1, hoursPerWeek)));
  const progressPercent = readiness?.overallScore || gaps?.overallCoveragePercentage || 0;
  const displayName = profile?.fullName || user?.name || 'there';
  const roleTitle = gaps?.roleTitle || 'your next role';
  const timeGreeting = new Date().getHours() < 12 ? 'MORNING' : new Date().getHours() < 18 ? 'AFTERNOON' : 'EVENING';
  const recentActivity = activities[0];

  if (loading) {
    return <main className="pivot-dashboard pivot-loading" role="status" aria-live="polite">
      <div className="pivot-loader-orbit"><span /><span /><span /></div>
      <p>Drawing your career map…</p>
      <small>Finding the clearest next step from your current skills</small>
    </main>;
  }

  return (
    <main className="pivot-dashboard">
      <div className="pivot-atmosphere" aria-hidden="true" />
      <header className="pivot-topbar">
        <Link to="/dashboard" className="pivot-wordmark" aria-label="PivotCraft home">
          <PivotLogoMark size={30} />
          <span>pivotcraft<span className="pivot-wordmark-dot">.</span></span>
        </Link>
        <nav className="pivot-topnav" aria-label="Quick navigation">
          <Link to="/analysis">Skill map</Link>
          <Link to="/weekly-planner">My plan</Link>
          <Link to="/applications">Applications</Link>
        </nav>
        <Link to="/profile" className="pivot-profile" aria-label={`Profile for ${displayName}`}>
          <span>{initials(displayName)}</span><small>MY SPACE</small>
        </Link>
      </header>

      <div className="pivot-shell">
        <section className="pivot-welcome">
          <div>
            <div className="pivot-eyebrow"><span className="pivot-live-dot" /> YOUR PIVOT STUDIO <span className="pivot-eyebrow-slash">/</span> {timeGreeting}</div>
            <h1>Your next chapter<br /><em>has a route.</em></h1>
            <p>Hi {displayName.split(' ')[0]} — we turned your goal into a map. Here’s the next move, in plain English.</p>
          </div>
          <div className="pivot-target-chip">
            <span className="pivot-target-icon"><BriefcaseBusiness size={17} /></span>
            <span><small>YOUR NORTH STAR</small><strong>{roleTitle}</strong></span>
            <Link to="/careers" aria-label="Change target role"><ArrowUpRight size={16} /></Link>
          </div>
        </section>

        <section className="pivot-command-grid" aria-label="Your career overview">
          <article className="pivot-route-card">
            <div className="pivot-card-topline">
              <span className="pivot-label"><Map size={14} /> THE PIVOT MAP</span>
              <span className="pivot-map-id">ROUTE 0{topGap ? '1' : '2'} <span>·</span> LIVE</span>
            </div>
            <div className="pivot-map-stage">
              <div className="pivot-map-copy">
                <div className="pivot-route-kicker">YOUR FIRST WAYPOINT</div>
                <h2>{topGap ? `Close the ${topGap.name} gap` : 'Your core skills are mapped'}</h2>
                <p>{topGap ? `${topGap.reason || `${topGap.name} is a priority for ${roleTitle}.`} Start with a focused learning sprint, then turn it into proof.` : 'Choose a new job description to keep your role map current and discover the next opportunity.'}</p>
                <Link to={topGap ? '/analysis' : '/opportunity-match'} className="pivot-primary-link">
                  {topGap ? 'See why this matters' : 'Analyze a job description'} <ArrowRight size={16} />
                </Link>
                <div className="pivot-map-legend"><span><i className="legend-current" /> YOU ARE HERE</span><span><i className="legend-next" /> NEXT PROOF POINT</span></div>
              </div>
              <div className="pivot-terrain" aria-label={`Career route toward ${roleTitle}`}>
                <svg viewBox="0 0 590 360" role="img" aria-labelledby="map-title map-desc">
                  <title id="map-title">Your career pivot route</title>
                  <desc id="map-desc">A topographic map marks your current skills, the next skill gap, and your target role.</desc>
                  <defs>
                    <linearGradient id="routeGlow" x1="0" y1="1" x2="1" y2="0"><stop stopColor="#d8ff68" /><stop offset="1" stopColor="#5de4d4" /></linearGradient>
                    <radialGradient id="nodeGlow"><stop stopColor="#e5ff92" stopOpacity=".8" /><stop offset="1" stopColor="#e5ff92" stopOpacity="0" /></radialGradient>
                  </defs>
                  <g className="terrain-contours" fill="none" stroke="#fff" strokeOpacity=".1" strokeWidth="1.2">
                    <path d="M-20 85C83 25 123 114 215 73s141-53 214-5 97 57 193 2"/><path d="M-13 109c105-60 145 28 237-13s141-53 214-5 97 57 193 2"/>
                    <path d="M-5 136c105-60 145 28 237-13s141-53 214-5 97 57 193 2"/><path d="M-18 246c80 32 147-29 217-9s118 76 206 43 110-21 188 23"/>
                    <path d="M-9 270c80 32 147-29 217-9s118 76 206 43 110-21 188 23"/><path d="M7 295c80 32 147-29 217-9s118 76 206 43 110-21 188 23"/>
                    <path d="M77-20c49 83 5 113 47 166s106 47 124 116-29 86-5 124"/><path d="M102-20c49 83 5 113 47 166s106 47 124 116-29 86-5 124"/>
                  </g>
                  <path d="M48 283C133 287 146 205 237 218s81 55 155-1 98-58 153-134" fill="none" stroke="#d8ff68" strokeOpacity=".16" strokeWidth="20" strokeLinecap="round" />
                  <path d="M48 283C133 287 146 205 237 218s81 55 155-1 98-58 153-134" fill="none" stroke="url(#routeGlow)" strokeWidth="3" strokeDasharray="8 9" strokeLinecap="round" className="route-dash" />
                  <circle cx="48" cy="283" r="36" fill="url(#nodeGlow)"/><circle cx="48" cy="283" r="8" fill="#d8ff68" stroke="#0a1735" strokeWidth="4"/>
                  <circle cx="237" cy="218" r="27" fill="url(#nodeGlow)"/><circle cx="237" cy="218" r="7" fill="#ff806b" stroke="#0a1735" strokeWidth="4" className="map-pulse"/>
                  <circle cx="392" cy="217" r="6" fill="#73e9dc" stroke="#0a1735" strokeWidth="4"/>
                  <circle cx="545" cy="83" r="39" fill="url(#nodeGlow)"/><circle cx="545" cy="83" r="9" fill="#d8ff68" stroke="#0a1735" strokeWidth="4"/>
                  <g className="map-tag map-tag-you"><rect x="18" y="315" width="112" height="25" rx="12"/><text x="74" y="332" textAnchor="middle">YOUR SKILLS</text></g>
                  <g className="map-tag map-tag-gap"><rect x="177" y="166" width="132" height="27" rx="13"/><text x="243" y="184" textAnchor="middle">{topGap?.name?.toUpperCase().slice(0, 18) || 'NEXT SKILL'}</text></g>
                  <g className="map-tag"><rect x="436" y="34" width="139" height="27" rx="13"/><text x="505" y="52" textAnchor="middle">TARGET ROLE</text></g>
                  <text x="398" y="243" className="map-coordinate">01 / BUILD PROOF</text>
                </svg>
                <div className="pivot-terrain-stamp"><Sparkles size={14} /> NOT A STRAIGHT LINE. A GOOD ONE.</div>
              </div>
            </div>
            <div className="pivot-route-footer">
              <span><b>01</b> Map the gap</span><span className="route-footer-line"/><span><b>02</b> Build proof</span><span className="route-footer-line"/><span><b>03</b> Tell your story</span>
            </div>
          </article>

          <aside className="pivot-side-stack">
            <article className="pivot-score-card">
              <div className="pivot-score-top"><span className="pivot-label"><Compass size={14} /> CAREER SIGNAL</span><span className="pivot-score-delta">{readiness?.delta ? `+${readiness.delta}` : 'LIVE'}</span></div>
              <div className="pivot-score-number">{Math.round(progressPercent)}<span>%</span></div>
              <div className="pivot-score-meter"><i style={{ width: `${Math.max(0, Math.min(100, progressPercent))}%` }} /></div>
              <p>Your current skill coverage for <b>{roleTitle}</b>. It updates as you add evidence.</p>
              <Link to="/report">How is this calculated? <ArrowUpRight size={13} /></Link>
            </article>

            <article className="pivot-next-card">
              <div className="pivot-next-orbit"><WandSparkles size={20} /></div>
              <div className="pivot-next-content">
                <span className="pivot-label">THE NEXT MOVE</span>
                <h3>{topGap ? `Make ${topGap.name} visible` : nextProject?.title || 'Add a target job'}</h3>
                <p>{topGap ? topGap.nextRecommendedAction : nextProject ? nextProject.whyItMatters : 'A job description helps us map the skills employers ask for.'}</p>
                <Link to={topGap ? '/roadmap' : nextProject ? '/projects' : '/opportunity-match'} className="pivot-next-cta">{topGap ? 'Open your learning route' : nextProject ? 'See this project' : 'Start with a job description'} <ArrowRight size={15} /></Link>
              </div>
            </article>
          </aside>
        </section>

        <section className="pivot-flightlab" aria-labelledby="pivot-flightlab-title">
          <div className="pivot-flightlab-heading">
            <div>
              <div className="pivot-flightlab-kicker"><Crosshair size={15} /> THE VACANCY FLIGHT SIMULATOR <span>LIVE ROLE / YOUR EVIDENCE</span></div>
              <h2 id="pivot-flightlab-title">Before you apply,<br /><em>stress-test the role.</em></h2>
              <p>Use an actual job post. We’ll compare its stated requirements with your recorded skills, then show what one focused proof sprint could change.</p>
            </div>
            <div className="pivot-flightlab-orbit" aria-hidden="true"><span className="orbit-core"/><span className="orbit-ring orbit-ring-one"/><span className="orbit-ring orbit-ring-two"/><i>ROLE<br/>SIGNAL</i></div>
          </div>
          <form onSubmit={runFlightSimulation} className="pivot-flightlab-form">
            <label htmlFor="pivot-job-description">PASTE THE JOB DESCRIPTION</label>
            <textarea id="pivot-job-description" value={jobDraft} onChange={event => setJobDraft(event.target.value)} placeholder="Paste the requirements, responsibilities, and skills from a role you’re considering…" rows={4} />
            <div className="pivot-flightlab-form-footer"><span><ScanSearch size={14}/> Compared with your saved profile · not a hiring score</span><button type="submit" disabled={scanBusy || !jobDraft.trim()}>{scanBusy ? 'Mapping the role…' : 'Run the role scan'} <ArrowRight size={15}/></button></div>
          </form>

          {flightMatch ? (() => {
            const requiredTotal = flightMatch.requiredSkillsMatched.length + flightMatch.requiredSkillsMissing.length;
            const preferredTotal = flightMatch.preferredSkillsMatched.length + flightMatch.preferredSkillsMissing.length;
            const allGaps = [...flightMatch.requiredSkillsMissing, ...flightMatch.preferredSkillsMissing];
            const selectedGap = allGaps.find(skill => skill.skillId === focusMissingSkill);
            const exactScenarioLift = selectedGap
              ? Math.round((selectedGap.requirementType === 'required' ? (requiredTotal ? .75 / requiredTotal : 0) : (preferredTotal ? .25 / preferredTotal : 0)) * 100)
              : 0;
            const afterProof = Math.min(100, flightMatch.overallSkillAlignmentPercentage + exactScenarioLift);
            return <div className="pivot-flightlab-results" aria-live="polite">
              <div className="flightlab-score-panel">
                <span className="pivot-label">EVIDENCE ALIGNMENT · {flightMatch.company || flightMatch.jobTitle}</span>
                <div className="flightlab-score-row"><strong>{flightMatch.overallSkillAlignmentPercentage}<small>%</small></strong><div><span className="flightlab-eligibility">{flightMatch.statedRequirementsEligibility}</span><span className="flightlab-role-title">{flightMatch.jobTitle}</span></div></div>
                <div className="flightlab-bar"><span style={{ width: `${flightMatch.overallSkillAlignmentPercentage}%` }}/><i style={{ left: `${afterProof}%` }}/></div>
                <div className="flightlab-bar-legend"><span><i/> Recorded evidence now</span><span><i/> After one proof sprint*</span></div>
                <p>This is a skills-to-requirements comparison, not a hiring prediction. Experience, timing, competition, and interviews also matter.</p>
              </div>
              <div className="flightlab-proof-panel">
                <div className="flightlab-proof-heading"><span className="pivot-label">ONE CHANGE, TRACEABLE IMPACT</span><span className="flightlab-proof-count">{allGaps.length} signals to strengthen</span></div>
                {allGaps.length ? <>
                  <label htmlFor="flightlab-gap">Choose one missing requirement to prove</label>
                  <select id="flightlab-gap" value={focusMissingSkill} onChange={event => setFocusMissingSkill(event.target.value)}>{allGaps.map(skill => <option key={`${skill.requirementType}-${skill.skillId}`} value={skill.skillId}>{skill.name} · {skill.requirementType}</option>)}</select>
                  <div className="flightlab-counterfactual"><span className="flightlab-counter-icon"><Sparkles size={17}/></span><div><small>IF YOU ADD EVIDENCE FOR THIS SKILL</small><strong>{flightMatch.overallSkillAlignmentPercentage}% <ArrowRight size={14}/> {afterProof}%</strong></div><span className="flightlab-lift">+{exactScenarioLift} pts</span></div>
                  <p className="flightlab-explanation">*What-if uses the match engine’s 75% required / 25% preferred weighting and assumes this skill is demonstrated at the stated level. A course alone does not count as proof.</p>
                  <div className="flightlab-buttons"><Link to="/proof-of-skill">Prove a skill <ArrowUpRight size={14}/></Link><Link to="/project-forge">Build a project <ArrowUpRight size={14}/></Link></div>
                </> : <div className="flightlab-no-gaps"><span><Check size={16}/></span><div><strong>No missing skills detected in this posting.</strong><p>Try another role or strengthen your interview story.</p></div><Link to="/interview-arena">Practice interview <ArrowRight size={14}/></Link></div>}
                <div className="flightlab-trace">{flightMatch.explainabilityTrace.slice(0, 2).map(item => <span key={item.dimension}><b>{item.dimension}</b>{item.sourceEvidence}</span>)}</div>
              </div>
            </div>;
          })() : <div className="pivot-flightlab-empty"><span><BriefcaseBusiness size={18}/></span><div><strong>Bring a real opportunity into the simulator.</strong><p>The scan returns matched skills, missing evidence, and a transparent one-skill what-if.</p></div></div>}
        </section>

        <section className="pivot-bottom-grid">
          <article className="pivot-simulator-card">
            <div className="pivot-sim-heading">
              <div><span className="pivot-label"><Layers3 size={14} /> SMALL WHAT-IF, BIG CLARITY</span><h2>Give your goal a calendar.</h2></div>
              <Link to="/career-twin" className="pivot-icon-link" aria-label="Open full career simulator"><ArrowUpRight size={18} /></Link>
            </div>
            <p className="pivot-sim-intro">Try a weekly study rhythm. This is a planning estimate, not a job guarantee.</p>
            <div className="pivot-slider-row">
              <label htmlFor="pivot-hours">Hours I can give this each week</label><output htmlFor="pivot-hours">{hoursPerWeek}<small> hrs</small></output>
            </div>
            <input id="pivot-hours" className="pivot-range" type="range" min="2" max="30" step="1" value={hoursPerWeek} onChange={event => setHoursPerWeek(Number(event.target.value))} style={{ '--range-fill': `${((hoursPerWeek - 2) / 28) * 100}%` } as React.CSSProperties} />
            <div className="pivot-range-scale"><span>2 hrs · gentle</span><span>30 hrs · intensive</span></div>
            <div className="pivot-estimate">
              <span className="pivot-estimate-icon"><Timer size={18} /></span>
              <div><small>ESTIMATED TIME TO WORK THROUGH CURRENT SKILL GAPS</small><strong>{openGaps.length ? `${weeksEstimate} ${weeksEstimate === 1 ? 'week' : 'weeks'}` : 'No open skill gaps'}</strong></div>
              <span className="pivot-estimate-hours">{openGaps.length ? `~${totalGapHours} learning hrs` : 'Nice work'}</span>
            </div>
          </article>

          <article className="pivot-progress-card">
            <div className="pivot-progress-top"><span className="pivot-label"><Sparkles size={14} /> MOMENTUM, NOT PERFECTION</span><span className="pivot-progress-spark">✳</span></div>
            <h2>You’ve already<br /><em>started moving.</em></h2>
            <div className="pivot-progress-track"><span style={{ width: `${totalRoadmap ? (completedRoadmap / totalRoadmap) * 100 : 0}%` }} /></div>
            <div className="pivot-progress-detail"><b>{completedRoadmap}</b> of {totalRoadmap} learning steps checked off <span>{totalRoadmap ? `${Math.round((completedRoadmap / totalRoadmap) * 100)}%` : 'READY'}</span></div>
            <div className="pivot-activity-note">
              <span className="pivot-activity-icon"><Check size={15} /></span>
              <span>{recentActivity ? <><b>Last spark:</b> {recentActivity.activityType.replace(/_/g, ' ')} · {new Date(recentActivity.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</> : <><b>Your first step is waiting.</b> Pick one small action and make it yours.</>}</span>
            </div>
            <Link to="/weekly-planner" className="pivot-text-link">See this week’s plan <ArrowRight size={15} /></Link>
          </article>
        </section>

        <section className="pivot-quickstart">
          <div className="pivot-quickstart-title"><span className="pivot-label">NEW HERE? START HERE</span><span>Three moves. No jargon.</span></div>
          <Link to="/opportunity-match" className="pivot-step"><span className="pivot-step-number">01</span><span><b>Pick a real job</b><small>Paste a job description</small></span><ArrowDownRight size={17} /></Link>
          <Link to="/analysis" className="pivot-step"><span className="pivot-step-number step-coral">02</span><span><b>Find your strongest gap</b><small>See what matters most</small></span><ArrowDownRight size={17} /></Link>
          <Link to="/projects" className="pivot-step"><span className="pivot-step-number step-lavender">03</span><span><b>Make proof employers can see</b><small>Build one focused project</small></span><ArrowDownRight size={17} /></Link>
        </section>

        <footer className="pivot-footer"><span>PIVOTCRAFT STUDIO <span className="pivot-footer-star">✳</span> CAREER PIVOT, MADE PERSONAL</span><Link to="/applications"><span>After the learning comes the leap</span> <ArrowUpRight size={13} /></Link></footer>
      </div>
    </main>
  );
};

export default DashboardPage;
