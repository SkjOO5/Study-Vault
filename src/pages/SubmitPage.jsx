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
        if (step === 0) { if (!form.title.trim()) e.title = 'Required'; if (!form.url.trim()) e.url = 'Required'; else if (!/^https?:\/\/.+/.test(form.url)) e.url = 'Invalid URL'; }
        if (step === 1) { if (!form.description.trim()) e.description = 'Required'; if (!form.category) e.category = 'Required'; if (!form.type) e.type = 'Required'; }
        setErrs(e); return !Object.keys(e).length;
    };

    if (done) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }} className="text-center relative">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 rounded-full bg-[#10B981]/15 border-2 border-[#10B981] flex items-center justify-center mx-auto mb-6">
                        <HiCheck className="text-[#10B981] text-3xl" />
                    </motion.div>
                    <h2 className="text-2xl font-bold mb-2">Resource Submitted! 🎉</h2>
                    <p className="text-[#94A3B8] text-sm mb-6">Thank you for contributing.</p>
                    <button onClick={() => { setDone(false); setStep(0); setForm({ title: '', url: '', description: '', category: '', type: '', tags: [], thumbnail: '' }); }} className="btn-neon btn-neon-primary">Submit Another</button>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ background: ['#00F0FF', '#8B5CF6', '#10B981', '#f87171', '#fb923c'][i % 5], left: `${50 + (Math.random() - 0.5) * 60}%`, top: '40%' }}
                            initial={{ opacity: 1, y: 0, x: 0 }} animate={{ opacity: 0, y: Math.random() * -300 - 50, x: (Math.random() - 0.5) * 400 }} transition={{ duration: 1.5, delay: i * 0.05, ease: 'easeOut' }} />
                    ))}
                </motion.div>
            </div>
        );
    }

    const inp = "w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 outline-none focus:border-[#00F0FF]/40 transition-colors";

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-2xl mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h1 className="text-3xl font-bold mb-2">Submit a <span className="text-[#8B5CF6]">Resource</span></h1>
                    <p className="text-[#94A3B8] text-sm mb-8">Share a helpful study resource with the community.</p>
                </motion.div>

                {/* Progress */}
                <div className="flex items-center gap-2 mb-8">
                    {steps.map((l, i) => (
                        <div key={l} className="flex-1">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= step ? 'bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] text-[#0B0F1A]' : 'bg-white/5 text-[#94A3B8] border border-white/10'}`}>
                                    {i < step ? <HiCheck /> : i + 1}
                                </div>
                                {i < steps.length - 1 && <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${i < step ? 'bg-gradient-to-r from-[#00F0FF] to-[#8B5CF6]' : 'bg-white/10'}`} />}
                            </div>
                            <p className={`text-[10px] mt-1 ${i <= step ? 'text-[#F1F5F9]' : 'text-[#94A3B8]'}`}>{l}</p>
                        </div>
                    ))}
                </div>

                <motion.div className="glass-card p-6 sm:p-8">
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                <div><label className="block text-sm font-medium mb-1.5">Title *</label><input value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g., Intro to Machine Learning" className={inp} />{errs.title && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#EF4444] mt-1">{errs.title}</motion.p>}</div>
                                <div><label className="block text-sm font-medium mb-1.5">URL *</label><input value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://..." className={inp} />{errs.url && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#EF4444] mt-1">{errs.url}</motion.p>}</div>
                                <div><label className="block text-sm font-medium mb-1.5">Thumbnail URL (optional)</label><input value={form.thumbnail} onChange={e => set('thumbnail', e.target.value)} placeholder="https://..." className={inp} /></div>
                            </motion.div>
                        )}
                        {step === 1 && (
                            <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                                <div><label className="block text-sm font-medium mb-1.5">Description *</label><textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4} placeholder="Describe this resource..." className={`${inp} resize-none`} />{errs.description && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#EF4444] mt-1">{errs.description}</motion.p>}</div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div><label className="block text-sm font-medium mb-1.5">Category *</label><select value={form.category} onChange={e => set('category', e.target.value)} className={`${inp} cursor-pointer`}><option value="">Select...</option>{subjects.map(s => <option key={s} value={s}>{s}</option>)}</select>{errs.category && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#EF4444] mt-1">{errs.category}</motion.p>}</div>
                                    <div><label className="block text-sm font-medium mb-1.5">Type *</label><select value={form.type} onChange={e => set('type', e.target.value)} className={`${inp} cursor-pointer`}><option value="">Select...</option>{types.map(t => <option key={t} value={t}>{t}</option>)}</select>{errs.type && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#EF4444] mt-1">{errs.type}</motion.p>}</div>
                                </div>
                                <div><label className="block text-sm font-medium mb-2">Tags</label><div className="flex flex-wrap gap-2">{tagOpts.map(t => <button key={t} onClick={() => toggleTag(t)} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${form.tags.includes(t) ? 'bg-[#8B5CF6]/20 text-[#8B5CF6] border border-[#8B5CF6]/40' : 'bg-white/5 text-[#94A3B8] border border-white/10 hover:border-white/20'}`}>{form.tags.includes(t) && '✓ '}{t}</button>)}</div></div>
                            </motion.div>
                        )}
                        {step === 2 && (
                            <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-3">
                                <h3 className="text-lg font-semibold mb-2">Review Your Submission</h3>
                                {[['Title', form.title], ['URL', form.url], ['Description', form.description], ['Category', form.category], ['Type', form.type], ['Tags', form.tags.join(', ') || 'None'], ['Thumbnail', form.thumbnail || 'None']].map(([l, v]) => (
                                    <div key={l} className="flex gap-3 text-sm"><span className="text-[#94A3B8] w-24 shrink-0">{l}:</span><span className="text-[#F1F5F9] break-all">{v}</span></div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-between mt-8 pt-6 border-t border-white/5">
                        {step > 0 ? <button onClick={() => setStep(s => s - 1)} className="btn-neon btn-neon-outline !text-sm">← Back</button> : <div />}
                        {step < 2 ? <button onClick={() => { if (validate()) setStep(s => s + 1) }} className="btn-neon btn-neon-primary !text-sm">Next →</button>
                            : <button onClick={() => setDone(true)} className="btn-neon btn-neon-primary !text-sm">Submit Resource 🚀</button>}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
