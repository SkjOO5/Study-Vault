import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';
import { resourceCategories } from '../data/mockData';

/* ─── Animated Counter ─── */
function Counter({ target, suffix = '' }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 2000;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

/* ─── Section Wrapper ─── */
function FadeInSection({ children, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, type: 'spring', stiffness: 100, damping: 15 }}
        >
            {children}
        </motion.div>
    );
}

/* ─── Category icons (consistent SVG-style) ─── */
const categoryIcons = {
    Videos: '🎬',
    Articles: '📝',
    PDFs: '📄',
    Courses: '🎓',
    Notes: '📋',
};

/* ─── Category Card (floating) ─── */
function CategoryCard({ cat, index }) {
    return (
        <motion.div
            className="glass-card glass-card-hover cursor-pointer group"
            style={{ padding: '1.75rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', minHeight: '160px' }}
            animate={{ y: [0, -10, 0] }}
            transition={{
                repeat: Infinity,
                duration: 3 + index * 0.4,
                ease: 'easeInOut',
            }}
            whileHover={{ y: -18, scale: 1.05 }}
        >
            <div
                className="flex items-center justify-center rounded-2xl"
                style={{ width: 56, height: 56, background: `${cat.color}15`, fontSize: '1.75rem' }}
            >
                {categoryIcons[cat.name] || '📚'}
            </div>
            <h3 className="font-semibold text-[#F1F5F9] text-sm text-center">{cat.name}</h3>
            <p className="text-[11px] text-[#94A3B8] text-center">{cat.count.toLocaleString()} resources</p>
            <div
                className="rounded-full transition-all duration-300 group-hover:w-10"
                style={{ height: 2, width: 24, background: cat.color, boxShadow: `0 0 12px ${cat.color}50` }}
            />
        </motion.div>
    );
}

/* ─── Landing Page ─── */
export default function LandingPage() {
    return (
        <div className="relative">
            {/* ════════ Hero Section ════════ */}
            <section
                className="relative flex flex-col items-center justify-center text-center px-4"
                style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}
            >
                {/* Background radial glows */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ width: 600, height: 600, background: 'rgba(0,240,255,0.04)', filter: 'blur(120px)' }} />
                <div className="absolute top-1/2 left-1/3 rounded-full pointer-events-none" style={{ width: 400, height: 400, background: 'rgba(139,92,246,0.04)', filter: 'blur(100px)' }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: 'spring', stiffness: 80 }}
                    className="relative z-10"
                    style={{ maxWidth: '48rem', width: '100%' }}
                >
                    {/* Pill badge */}
                    <motion.div
                        style={{ display: 'inline-block', marginBottom: '1.5rem', padding: '0.375rem 1rem', borderRadius: 9999, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.05em' }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        ✦ Open-source study platform
                    </motion.div>

                    {/* Headline */}
                    <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '1.5rem', fontFamily: "'Space Grotesk', sans-serif" }}>
                        All Your Study Resources.{' '}
                        <span style={{ background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            One Place.
                        </span>
                        <br />
                        <span className="glow-text" style={{ color: '#00F0FF' }}>Zero Chaos.</span>
                    </h1>

                    {/* Subtitle */}
                    <p style={{ color: '#94A3B8', fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)', maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                        Discover, save, and share the best study materials — from lecture videos and articles to PDFs, courses, and notes — all curated by fellow learners.
                    </p>

                    {/* Search Bar */}
                    <div style={{ position: 'relative', maxWidth: '32rem', margin: '0 auto 2.5rem' }}>
                        <HiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontSize: 20 }} />
                        <input
                            type="text"
                            placeholder="Search resources, topics, subjects..."
                            className="search-glow"
                            style={{ width: '100%', paddingLeft: 48, paddingRight: 16, paddingTop: 14, paddingBottom: 14, borderRadius: 16, background: 'rgba(255,255,255,0.05)', color: '#F1F5F9', fontSize: '0.875rem', outline: 'none', backdropFilter: 'blur(12px)' }}
                        />
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/explore" className="btn-neon btn-neon-primary">
                            Explore Resources
                        </Link>
                        <Link to="/submit" className="btn-neon btn-neon-outline">
                            Contribute a Resource
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ════════ Category Cards ════════ */}
            <FadeInSection>
                <section style={{ maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem 4rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Browse by <span style={{ color: '#00F0FF' }}>Category</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.25rem', maxWidth: '56rem', margin: '0 auto' }}
                        className="category-grid"
                    >
                        {resourceCategories.map((cat, i) => (
                            <CategoryCard key={cat.id} cat={cat} index={i} />
                        ))}
                    </div>
                </section>
            </FadeInSection>

            {/* ════════ Stats Counter ════════ */}
            <FadeInSection delay={0.1}>
                <section style={{ maxWidth: '52rem', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
                    <div className="glass-card" style={{ padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', textAlign: 'center' }}>
                        {[
                            { target: 10000, suffix: '+', label: 'Resources' },
                            { target: 500, suffix: '+', label: 'Topics' },
                            { target: 2000, suffix: '+', label: 'Students' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div className="glow-text" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#00F0FF', marginBottom: 4, fontFamily: "'Space Grotesk', sans-serif" }}>
                                    <Counter target={stat.target} suffix={stat.suffix} />
                                </div>
                                <p style={{ color: '#94A3B8', fontSize: '0.85rem' }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </FadeInSection>

            {/* ════════ How It Works ════════ */}
            <FadeInSection delay={0.15}>
                <section style={{ maxWidth: '64rem', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
                    <h2 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 700, textAlign: 'center', marginBottom: '3rem', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                        How It <span style={{ color: '#8B5CF6' }}>Works</span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="how-grid">
                        {[
                            { step: '01', title: 'Discover', desc: 'Browse thousands of curated study resources across any subject.', color: '#00F0FF' },
                            { step: '02', title: 'Save & Organize', desc: 'Bookmark resources to your personal dashboard for quick access.', color: '#8B5CF6' },
                            { step: '03', title: 'Contribute', desc: 'Share your favorite resources and help fellow students succeed.', color: '#10B981' },
                        ].map((item) => (
                            <motion.div
                                key={item.step}
                                className="glass-card"
                                style={{ padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: '200px' }}
                                whileHover={{ y: -8 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                {/* Large background step number */}
                                <span style={{ position: 'absolute', top: -8, right: 4, fontSize: '5rem', fontWeight: 900, opacity: 0.04, color: item.color, lineHeight: 1, pointerEvents: 'none' }}>
                                    {item.step}
                                </span>

                                {/* Step badge */}
                                <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, background: `${item.color}18`, color: item.color, marginBottom: '1rem', flexShrink: 0 }}>
                                    {item.step}
                                </div>

                                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: '1.125rem', color: '#F1F5F9', marginBottom: '0.5rem' }}>{item.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.6 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </FadeInSection>

            {/* ════════ Final CTA ════════ */}
            <FadeInSection delay={0.2}>
                <section style={{ maxWidth: '48rem', margin: '0 auto', padding: '3rem 1.5rem 5rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Ready to{' '}
                        <span style={{ background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Level Up
                        </span>{' '}
                        Your Studies?
                    </h2>
                    <p style={{ color: '#94A3B8', marginBottom: '2rem', maxWidth: '28rem', margin: '0 auto 2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        Join thousands of students who are already using StudyVault to ace their courses.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <Link to="/register" className="btn-neon btn-neon-primary">
                            Get Started — It's Free
                        </Link>
                        <Link to="/explore" className="btn-neon btn-neon-outline">
                            Browse Resources
                        </Link>
                    </div>
                </section>
            </FadeInSection>
        </div>
    );
}
