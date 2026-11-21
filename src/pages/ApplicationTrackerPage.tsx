import React, { useEffect, useMemo, useState } from 'react';
import { BriefcaseBusiness, Plus, TrendingUp, Trash2, Target } from 'lucide-react';

type Outcome = 'Applied' | 'Interview' | 'Offer' | 'Rejected' | 'No response';
type Application = {
  id: string;
  company: string;
  role: string;
  roleType: string;
  date: string;
  outcome: Outcome;
};

const STORAGE_KEY = 'skillforge-career-applications-v1';
function readApplications(): Application[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed as Application[] : [];
  } catch {
    return [];
  }
}

export const ApplicationTrackerPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>(readApplications);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [roleType, setRoleType] = useState('Product');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const insights = useMemo(() => {
    const grouped = new Map<string, { total: number; positive: number; pending: number }>();
    for (const app of applications) {
      const row = grouped.get(app.roleType) ?? { total: 0, positive: 0, pending: 0 };
      row.total += 1;
      if (app.outcome === 'Interview' || app.outcome === 'Offer') row.positive += 1;
      if (app.outcome === 'Applied') row.pending += 1;
      grouped.set(app.roleType, row);
    }
    return [...grouped.entries()].map(([name, stats]) => ({ name, ...stats, rate: stats.total ? Math.round((stats.positive / stats.total) * 100) : 0 }))
      .sort((a, b) => b.rate - a.rate || b.total - a.total);
  }, [applications]);

  const addApplication = (event: React.FormEvent) => {
    event.preventDefault();
    if (!company.trim() || !role.trim()) return;
    setApplications(current => [{ id: crypto.randomUUID(), company: company.trim(), role: role.trim(), roleType, date, outcome: 'Applied' }, ...current]);
    setCompany('');
    setRole('');
  };

  const updateOutcome = (id: string, outcome: Outcome) => setApplications(current => current.map(app => app.id === id ? { ...app, outcome } : app));

  return (
    <div className="os-page-container">
      <header className="os-header">
        <div className="os-header-left">
          <div className="os-header-icon"><BriefcaseBusiness size={24} /></div>
          <div>
            <h1 className="os-header-title">Application Tracker</h1>
            <p className="os-header-subtitle">Track outcomes by role type. Your response patterns help focus the next part of your career pivot.</p>
          </div>
        </div>
        <span className="os-chip os-chip-accent">{applications.length} applications tracked</span>
      </header>

      <div className="application-tracker-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(260px, 0.7fr)', gap: '1.25rem', alignItems: 'start' }}>
        <section className="card">
          <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Log an application</h2>
          <form onSubmit={addApplication} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.8rem' }}>
            <input className="form-input" aria-label="Company" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} required />
            <input className="form-input" aria-label="Target role" placeholder="Target role" value={role} onChange={e => setRole(e.target.value)} required />
            <select className="form-select" aria-label="Role type" value={roleType} onChange={e => setRoleType(e.target.value)}>
              <option>Product</option><option>Engineering</option><option>Analytics</option><option>Design</option><option>Marketing</option><option>Other</option>
            </select>
            <input className="form-input" aria-label="Application date" type="date" value={date} onChange={e => setDate(e.target.value)} required />
            <button className="btn btn-primary" type="submit" style={{ gridColumn: '1 / -1', justifySelf: 'start' }}><Plus size={16} /> Add application</button>
          </form>
        </section>

        <section className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}><TrendingUp size={19} color="var(--color-accent)" /> Response patterns</h2>
          {insights.length ? <div style={{ display: 'grid', gap: '0.75rem' }}>
            {insights.map(row => <div key={row.name} style={{ border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontWeight: 700 }}><span>{row.name}</span><span>{row.rate}%</span></div>
              <div className="progress-container" style={{ margin: '0.45rem 0' }}><div className="progress-bar" style={{ width: `${row.rate}%` }} /></div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{row.positive} interview/offer outcomes from {row.total} tracked · {row.pending} awaiting response</div>
            </div>)}
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', margin: 0 }}>Based on your tracked outcomes only. Add more applications to make the pattern more useful.</p>
          </div> : <p style={{ color: 'var(--text-muted)' }}>Log applications to see which role types are getting responses.</p>}
        </section>
      </div>

      <section className="card" style={{ marginTop: '1.25rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: 0 }}><Target size={19} color="var(--color-accent)" /> Your pipeline</h2>
        {applications.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>Your application history will appear here.</p> : <div style={{ display: 'grid', gap: '0.65rem' }}>
          {applications.map(app => <article key={app.id} className="application-tracker-row" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) auto auto', alignItems: 'center', gap: '1rem', padding: '0.8rem 0', borderTop: '1px solid var(--border-subtle)' }}>
            <div><strong>{app.role}</strong><div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{app.company} · {app.roleType} · {new Date(`${app.date}T00:00:00`).toLocaleDateString()}</div></div>
            <select className="form-select" aria-label={`Outcome for ${app.company}`} value={app.outcome} onChange={e => updateOutcome(app.id, e.target.value as Outcome)}>{['Applied', 'Interview', 'Offer', 'Rejected', 'No response'].map(status => <option key={status}>{status}</option>)}</select>
            <button className="btn btn-ghost btn-sm" aria-label={`Remove ${app.company}`} onClick={() => setApplications(current => current.filter(item => item.id !== app.id))}><Trash2 size={15} /></button>
          </article>)}
        </div>}
      </section>
    </div>
  );
};
