import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiChevronUp, HiPencil } from 'react-icons/hi';
import { mockResources, userProfile } from '../data/mockData';

function getBadgeClass(type) {
    const map = { Video: 'badge-video', Article: 'badge-article', PDF: 'badge-pdf', Course: 'badge-course', Notes: 'badge-notes' };
    return map[type] || 'badge-article';
}

function MiniCard({ resource }) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="glass-card glass-card-hover"
            style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
            <Link to={`/resource/${resource.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ height: 100, background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(139,92,246,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '2rem', opacity: 0.5 }}>
                        {resource.type === 'Video' ? '🎬' : resource.type === 'Article' ? '📝' : resource.type === 'PDF' ? '📄' : resource.type === 'Course' ? '🎓' : '📋'}
                    </span>
                </div>
                <div style={{ padding: '0.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <span className={`badge ${getBadgeClass(resource.type)}`} style={{ marginBottom: 6, alignSelf: 'flex-start' }}>{resource.type}</span>
                    <h4 className="line-clamp-2" style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F1F5F9', marginBottom: 6, lineHeight: 1.4 }}>{resource.title}</h4>
                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.65rem', color: '#94A3B8' }}>
                        <HiChevronUp style={{ color: '#10B981' }} /> {resource.upvotes}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export default function DashboardPage() {
    const [tab, setTab] = useState('saved');
    const saved = mockResources.filter(r => userProfile.savedResources.includes(r.id));
    const contributed = mockResources.filter(r => userProfile.contributions.includes(r.id));

    return (
        <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1.5rem' }}>

                {/* ── Profile Section ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
                >
                    {/* Avatar */}
                    <div style={{
                        width: 72, height: 72, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.5rem', fontWeight: 700, color: '#0B0F1A',
                    }}>
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{userProfile.name}</h2>
                        <p style={{ fontSize: '0.875rem', color: '#94A3B8', marginBottom: 8 }}>{userProfile.bio}</p>
                        <button style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: '#00F0FF', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                            <HiPencil size={12} /> Edit Profile
                        </button>
                    </div>
                </motion.div>

                {/* ── Activity Stats ── */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}
                >
                    {[
                        { label: 'Resources Saved', value: userProfile.savedResources.length, color: '#00F0FF' },
                        { label: 'Contributions', value: userProfile.contributions.length, color: '#8B5CF6' },
                        { label: 'Upvotes Received', value: userProfile.upvotesReceived, color: '#10B981' },
                    ].map(s => (
                        <div key={s.label} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color, marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                            <p style={{ fontSize: '0.75rem', color: '#94A3B8' }}>{s.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* ── Tabs ── */}
                <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
                    {['saved', 'contributions'].map(t => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            style={{
                                padding: '8px 16px', borderRadius: 12, fontSize: '0.875rem', fontWeight: 500,
                                cursor: 'pointer', transition: 'all 200ms',
                                background: tab === t ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.05)',
                                color: tab === t ? '#00F0FF' : '#94A3B8',
                                border: tab === t ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                            }}
                        >
                            {t === 'saved' ? 'My Saved Resources' : 'My Contributions'}
                        </button>
                    ))}
                </div>

                {/* ── Resource Grid ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                    {(tab === 'saved' ? saved : contributed).map((r, i) => (
                        <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                            <MiniCard resource={r} />
                        </motion.div>
                    ))}
                </div>

                {(tab === 'saved' ? saved : contributed).length === 0 && (
                    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                        <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>{tab === 'saved' ? '📚' : '📤'}</p>
                        <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: 8 }}>{tab === 'saved' ? 'No saved resources yet.' : 'No contributions yet.'}</p>
                        <Link to="/explore" style={{ color: '#00F0FF', fontSize: '0.875rem', textDecoration: 'none' }}>Browse Resources →</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
