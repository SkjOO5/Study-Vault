import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';
import { subjects } from '../data/mockData';

const types = ['Video', 'Article', 'PDF', 'Course', 'Notes'];
const tagOpts = ['AI', 'Machine Learning', 'Web Dev', 'React', 'Python', 'JavaScript', 'Data Science', 'Algorithms', 'Math', 'Physics', 'Design', 'Databases'];
const steps = ['Basic Info', 'Details', 'Review & Submit'];

export default function SubmitPage() {
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);
    const [errs, setErrs] = useState({});
    const [form, setForm] = useState({ title: '', url: '', description: '', category: '', type: '', tags: [], thumbnail: '' });

    const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrs(e => ({ ...e, [k]: undefined })); };
    const toggleTag = (t) => setForm(f => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter(x => x !== t) : [...f.tags, t] }));

    const validate = () => {
        const e = {};
        if (step === 0) {
            if (!form.title.trim()) e.title = 'Required';
            if (!form.url.trim()) e.url = 'Required';
            else if (!/^https?:\/\/.+/.test(form.url)) e.url = 'Invalid URL';
        }
        if (step === 1) {
            if (!form.description.trim()) e.description = 'Required';
            if (!form.category) e.category = 'Required';
            if (!form.type) e.type = 'Required';
        }
        setErrs(e);
        return !Object.keys(e).length;
    };

    const inputStyle = {
        width: '100%', padding: '10px 16px', borderRadius: 12,
        background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
        color: '#F1F5F9', fontSize: '0.875rem', outline: 'none', transition: 'border-color 200ms'
    };

    const labelStyle = { display: 'block', fontSize: '0.875rem', fontWeight: 500, marginBottom: 8, color: '#F1F5F9' };
    const errorStyle = { fontSize: '0.75rem', color: '#EF4444', marginTop: 4 };

    if (done) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '5rem' }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    style={{ textAlign: 'center', position: 'relative', width: '100%', maxWidth: 400, padding: '0 1rem' }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', border: '2px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}
                    >
                        <HiCheck style={{ color: '#10B981', fontSize: '2rem' }} />
                    </motion.div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>Resource Submitted! 🎉</h2>
                    <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Thank you for contributing.</p>
                    <button
                        onClick={() => { setDone(false); setStep(0); setForm({ title: '', url: '', description: '', category: '', type: '', tags: [], thumbnail: '' }); }}
                        className="btn-neon btn-neon-primary"
                    >
                        Submit Another
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '3rem' }}>
            <div style={{ maxWidth: '42rem', margin: '0 auto', padding: '0 1.5rem' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Submit a <span style={{ color: '#8B5CF6' }}>Resource</span>
                    </h1>
                    <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Share a helpful study resource with the community.</p>
                </motion.div>

                {/* ── Progress ── */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', position: 'relative' }}>
                    {/* Background Line */}
                    <div style={{ position: 'absolute', top: 14, left: 20, right: 20, height: 2, background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />

                    {/* Active Line (approximate based on step) */}
                    <div style={{
                        position: 'absolute', top: 14, left: 20, height: 2, background: 'linear-gradient(90deg, #00F0FF, #8B5CF6)', zIndex: 0, transition: 'width 500ms ease',
                        width: step === 0 ? '0%' : step === 1 ? '50%' : '100%'
                    }} />

                    {steps.map((l, i) => (
                        <div key={l} style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                            <div style={{
                                width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700,
                                background: i <= step ? 'linear-gradient(135deg, #00F0FF, #8B5CF6)' : '#0B0F1A',
                                color: i <= step ? '#0B0F1A' : '#94A3B8',
                                border: i <= step ? 'none' : '1px solid rgba(255,255,255,0.15)',
                                transition: 'all 300ms'
                            }}>
                                {i < step ? <HiCheck /> : i + 1}
                            </div>
                            <p style={{ fontSize: '0.75rem', color: i <= step ? '#F1F5F9' : '#94A3B8', fontWeight: i <= step ? 600 : 400 }}>{l}</p>
                        </div>
                    ))}
                </div>

                {/* ── Form Card ── */}
                <motion.div className="glass-card" style={{ padding: '2rem' }}>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={labelStyle}>Title *</label>
                                    <input
                                        value={form.title} onChange={e => set('title', e.target.value)}
                                        placeholder="e.g., Intro to Machine Learning"
                                        style={inputStyle}
                                    />
                                    {errs.title && <p style={errorStyle}>{errs.title}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>URL *</label>
                                    <input
                                        value={form.url} onChange={e => set('url', e.target.value)}
                                        placeholder="https://..."
                                        style={inputStyle}
                                    />
                                    {errs.url && <p style={errorStyle}>{errs.url}</p>}
                                </div>
                                <div>
                                    <label style={labelStyle}>Thumbnail URL (optional)</label>
                                    <input
                                        value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)}
                                        placeholder="https://..."
                                        style={inputStyle}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <div>
                                    <label style={labelStyle}>Description *</label>
                                    <textarea
                                        value={form.description} onChange={e => set('description', e.target.value)}
                                        rows={4} placeholder="Describe this resource..."
                                        style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
                                    />
                                    {errs.description && <p style={errorStyle}>{errs.description}</p>}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div>
                                        <label style={labelStyle}>Category *</label>
                                        <select
                                            value={form.category} onChange={e => set('category', e.target.value)}
                                            style={{ ...inputStyle, cursor: 'pointer' }}
                                        >
                                            <option value="">Select...</option>
                                            {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                        {errs.category && <p style={errorStyle}>{errs.category}</p>}
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Type *</label>
                                        <select
                                            value={form.type} onChange={e => set('type', e.target.value)}
                                            style={{ ...inputStyle, cursor: 'pointer' }}
                                        >
                                            <option value="">Select...</option>
                                            {types.map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        {errs.type && <p style={errorStyle}>{errs.type}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>Tags</label>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {tagOpts.map(t => (
                                            <button
                                                key={t} onClick={() => toggleTag(t)}
                                                type="button"
                                                style={{
                                                    padding: '6px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer',
                                                    background: form.tags.includes(t) ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.05)',
                                                    color: form.tags.includes(t) ? '#8B5CF6' : '#94A3B8',
                                                    border: form.tags.includes(t) ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(255,255,255,0.1)',
                                                    transition: 'all 200ms'
                                                }}
                                            >
                                                {form.tags.includes(t) && '✓ '} {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#F1F5F9' }}>Review Your Submission</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: 12 }}>
                                    {[
                                        ['Title', form.title],
                                        ['URL', form.url],
                                        ['Description', form.description],
                                        ['Category', form.category],
                                        ['Type', form.type],
                                        ['Tags', form.tags.join(', ') || 'None'],
                                        ['Thumbnail', form.thumbnail || 'None']
                                    ].map(([l, v]) => (
                                        <div key={l} style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
                                            <span style={{ color: '#94A3B8', width: 100, flexShrink: 0 }}>{l}:</span>
                                            <span style={{ color: '#F1F5F9', wordBreak: 'break-all' }}>{v}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Navigation Buttons ── */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        {step > 0 ? (
                            <button
                                onClick={() => setStep(s => s - 1)}
                                className="btn-neon btn-neon-outline"
                                style={{ fontSize: '0.875rem', padding: '0.5rem 1.25rem' }}
                            >
                                ← Back
                            </button>
                        ) : <div />}

                        {step < 2 ? (
                            <button
                                onClick={() => { if (validate()) setStep(s => s + 1) }}
                                className="btn-neon btn-neon-primary"
                                style={{ fontSize: '0.875rem', padding: '0.5rem 1.5rem' }}
                            >
                                Next →
                            </button>
                        ) : (
                            <button
                                onClick={() => setDone(true)}
                                className="btn-neon btn-neon-primary"
                                style={{ fontSize: '0.875rem', padding: '0.5rem 1.5rem' }}
                            >
                                Submit Resource 🚀
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
