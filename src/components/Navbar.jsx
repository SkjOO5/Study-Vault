import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
    { to: '/explore', label: 'Explore' },
    { to: '/submit', label: 'Submit' },
    { to: '/dashboard', label: 'Dashboard' },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            background: 'rgba(11,15,26,0.75)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
            <div style={{
                maxWidth: '80rem', margin: '0 auto',
                padding: '0 1.5rem',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                height: 64,
            }}>
                {/* ── Logo ── */}
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: 'linear-gradient(135deg, #00F0FF, #8B5CF6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.75rem', fontWeight: 700, color: '#0B0F1A',
                        flexShrink: 0,
                    }}>
                        SV
                    </div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#F1F5F9', fontFamily: "'Space Grotesk', sans-serif" }}>
                        Study<span style={{ color: '#00F0FF' }}>Vault</span>
                    </span>
                </Link>

                {/* ── Desktop Nav Links (centered) ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                style={{
                                    position: 'relative',
                                    padding: '0.5rem 1rem',
                                    fontSize: '0.875rem', fontWeight: 500,
                                    borderRadius: 8,
                                    color: isActive ? '#00F0FF' : '#94A3B8',
                                    textDecoration: 'none',
                                    transition: 'color 200ms',
                                }}
                                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#F1F5F9'; }}
                                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = '#94A3B8'; }}
                            >
                                {link.label}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-indicator"
                                        style={{
                                            position: 'absolute', bottom: -1, left: 8, right: 8,
                                            height: 2, borderRadius: 999,
                                            background: '#00F0FF',
                                            boxShadow: '0 0 8px #00F0FF',
                                        }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* ── Auth Buttons (right) ── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="desktop-nav">
                    <Link
                        to="/login"
                        style={{ fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', padding: '0.375rem 0.75rem', transition: 'color 200ms' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#F1F5F9'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94A3B8'}
                    >
                        Log In
                    </Link>
                    <Link
                        to="/register"
                        className="btn-neon btn-neon-primary"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1.25rem' }}
                    >
                        Sign Up
                    </Link>
                </div>

                {/* ── Mobile Hamburger ── */}
                <button
                    className="mobile-nav-btn"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    style={{
                        display: 'none', /* shown via CSS media query */
                        color: '#F1F5F9', padding: 8, background: 'none', border: 'none', cursor: 'pointer',
                    }}
                >
                    {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
                </button>
            </div>

            {/* ── Mobile Drawer ── */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 250, damping: 30 }}
                        style={{
                            position: 'fixed', top: 64, right: 0, bottom: 0, width: 256,
                            background: 'rgba(11,15,26,0.95)',
                            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                            borderLeft: '1px solid rgba(255,255,255,0.06)',
                            zIndex: 50,
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '0.5rem' }}>
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.to;
                                return (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        style={{
                                            padding: '0.75rem 1rem', borderRadius: 12,
                                            fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none',
                                            color: isActive ? '#00F0FF' : '#94A3B8',
                                            background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                                            transition: 'all 200ms',
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <Link to="/login" onClick={() => setMobileOpen(false)} style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#94A3B8', textDecoration: 'none', borderRadius: 12 }}>
                                    Log In
                                </Link>
                                <Link to="/register" onClick={() => setMobileOpen(false)} className="btn-neon btn-neon-primary" style={{ textAlign: 'center', fontSize: '0.875rem' }}>
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
