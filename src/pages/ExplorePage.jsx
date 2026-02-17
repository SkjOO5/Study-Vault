import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineBookmark, HiBookmark, HiChevronUp, HiSearch } from 'react-icons/hi';
import { mockResources, subjects } from '../data/mockData';

const types = ['All', 'Video', 'Article', 'PDF', 'Course', 'Notes'];
const sortOptions = ['Most Popular', 'Newest', 'Most Saved'];

function getBadgeClass(type) {
    const map = { Video: 'badge-video', Article: 'badge-article', PDF: 'badge-pdf', Course: 'badge-course', Notes: 'badge-notes' };
    return map[type] || 'badge-article';
}

function ResourceCard({ resource, index }) {
    const [saved, setSaved] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 100, damping: 15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass-card glass-card-hover"
            style={{ overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
        >
            <Link to={`/resource/${resource.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {resource.thumbnail ? (
                    <div style={{ height: 160, overflow: 'hidden' }}>
                        <img
                            src={resource.thumbnail}
                            alt={resource.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 500ms' }}
                        />
                    </div>
                ) : (
                    <div style={{ height: 120, background: 'linear-gradient(135deg, rgba(0,240,255,0.08), rgba(139,92,246,0.08))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontSize: '2.5rem', opacity: 0.5 }}>
                            {resource.type === 'Video' ? '🎬' : resource.type === 'Article' ? '📝' : resource.type === 'PDF' ? '📄' : resource.type === 'Course' ? '🎓' : '📋'}
                        </span>
                    </div>
                )}
            </Link>

            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span className={`badge ${getBadgeClass(resource.type)}`}>{resource.type}</span>
                    <button
                        onClick={(e) => { e.preventDefault(); setSaved(!saved); }}
                        style={{ background: 'none', border: 'none', color: saved ? '#00F0FF' : '#94A3B8', cursor: 'pointer', padding: 2, transition: 'color 200ms' }}
                        aria-label="Save resource"
                    >
                        {saved ? <HiBookmark size={18} /> : <HiOutlineBookmark size={18} />}
                    </button>
                </div>

                <Link to={`/resource/${resource.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className="line-clamp-2" style={{ fontWeight: 600, fontSize: '0.875rem', color: '#F1F5F9', marginBottom: 8, lineHeight: 1.4 }}>
                        {resource.title}
                    </h3>
                </Link>

                <p className="line-clamp-2" style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: 12, lineHeight: 1.5 }}>{resource.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                    <span style={{ fontSize: '0.625rem', padding: '2px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: '#94A3B8' }}>{resource.subject}</span>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <HiChevronUp style={{ color: '#10B981' }} />
                        <span>{resource.upvotes}</span>
                    </div>
                    <span>{resource.contributor.name}</span>
                </div>
            </div>
        </motion.div>
    );
}

/* Skeleton Loading Card */
function SkeletonCard() {
    return (
        <div className="glass-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: 120, background: 'rgba(255,255,255,0.03)' }} />
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ height: 12, width: 64, background: 'rgba(255,255,255,0.08)', borderRadius: 999 }} />
                <div style={{ height: 16, width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
                <div style={{ height: 12, width: '75%', background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ height: 12, width: 48, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
                    <div style={{ height: 12, width: 80, background: 'rgba(255,255,255,0.08)', borderRadius: 4 }} />
                </div>
            </div>
        </div>
    );
}

export default function ExplorePage() {
    const [search, setSearch] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedSubject, setSelectedSubject] = useState('All');
    const [sortBy, setSortBy] = useState('Most Popular');
    const [visibleCount, setVisibleCount] = useState(8);
    const [loading, setLoading] = useState(false);

    const filtered = useMemo(() => {
        let res = [...mockResources];
        if (search) res = res.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.tags.some(t => t.toLowerCase().includes(search.toLowerCase())));
        if (selectedType !== 'All') res = res.filter(r => r.type === selectedType);
        if (selectedSubject !== 'All') res = res.filter(r => r.subject === selectedSubject);
        if (sortBy === 'Most Popular') res.sort((a, b) => b.upvotes - a.upvotes);
        else if (sortBy === 'Newest') res.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        else if (sortBy === 'Most Saved') res.sort((a, b) => b.saves - a.saves);
        return res;
    }, [search, selectedType, selectedSubject, sortBy]);

    const visible = filtered.slice(0, visibleCount);

    const loadMore = () => {
        setLoading(true);
        setTimeout(() => {
            setVisibleCount((c) => c + 4);
            setLoading(false);
        }, 800);
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: '2rem' }}
                >
                    <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Explore <span style={{ color: '#00F0FF' }}>Resources</span>
                    </h1>
                    <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Discover the best study materials curated by students worldwide.</p>
                </motion.div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass-card"
                    style={{ padding: '1.25rem', marginBottom: '2rem' }}
                >
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                        {/* Search */}
                        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
                            <HiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
                            <input
                                type="text"
                                placeholder="Search resources..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{ width: '100%', paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '0.875rem', outline: 'none' }}
                            />
                        </div>

                        {/* Type Filter */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                            {types.map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setSelectedType(t)}
                                    style={{
                                        padding: '6px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 500,
                                        cursor: 'pointer', transition: 'all 200ms',
                                        background: selectedType === t ? 'rgba(0,240,255,0.12)' : 'rgba(255,255,255,0.05)',
                                        color: selectedType === t ? '#00F0FF' : '#94A3B8',
                                        border: selectedType === t ? '1px solid rgba(0,240,255,0.3)' : '1px solid transparent',
                                    }}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {/* Subject */}
                        <select
                            value={selectedSubject}
                            onChange={(e) => setSelectedSubject(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
                        >
                            <option value="All">All Subjects</option>
                            {subjects.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#F1F5F9', fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
                        >
                            {sortOptions.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Results Count */}
                <p style={{ fontSize: '0.75rem', color: '#94A3B8', marginBottom: '1.25rem' }}>Showing {visible.length} of {filtered.length} resources</p>

                {/* Resource Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.25rem' }}>
                    {visible.map((resource, i) => (
                        <ResourceCard key={resource.id} resource={resource} index={i} />
                    ))}
                    {loading && Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} />)}
                </div>

                {/* Load More */}
                {visibleCount < filtered.length && !loading && (
                    <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                        <button onClick={loadMore} className="btn-neon btn-neon-outline">
                            Load More
                        </button>
                    </div>
                )}

                {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                        <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔍</p>
                        <p style={{ color: '#94A3B8' }}>No resources found. Try adjusting your filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
