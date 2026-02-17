import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'linear-gradient(rgba(11,15,26,0), rgba(11,15,26,0.3))' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1.5rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>

                    {/* ── Brand ── */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', marginBottom: '1rem' }}>
                            <div style={{
                                width: 32, height: 32, borderRadius: 8,
                                background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.75rem', fontWeight: 700, color: '#0B0F1A',
                                flexShrink: 0,
                            }}>
                                SV
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif" }}>
                                Study<span style={{ color: '#00F0FF' }}>Vault</span>
                            </span>
                        </Link>
                        <p style={{ color: '#94A3B8', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px' }}>
                            All your study resources in one place. Curated by students, for students. Join the community and start learning today.
                        </p>
                    </div>

                    {/* ── Platform Links ── */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Platform</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <Link to="/explore" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Explore</Link>
                            <Link to="/submit" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Submit Resource</Link>
                            <Link to="/dashboard" style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'}>Dashboard</Link>
                        </div>
                    </div>

                    {/* ── Connect ── */}
                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#F1F5F9', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connect</h4>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: '#94A3B8', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'} aria-label="GitHub"><FaGithub size={20} /></a>
                            <a href="#" style={{ color: '#94A3B8', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'} aria-label="Twitter"><FaTwitter size={20} /></a>
                            <a href="#" style={{ color: '#94A3B8', transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = '#00F0FF'} onMouseLeave={e => e.target.style.color = '#94A3B8'} aria-label="Discord"><FaDiscord size={20} /></a>
                        </div>
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '1rem', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.75rem', color: '#64748B' }}>© 2026 StudyVault. Built for learners everywhere.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Privacy Policy</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
