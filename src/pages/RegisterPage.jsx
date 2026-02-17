import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';

function FloatingShape({ style }) {
    return (
        <motion.div
            className="absolute rounded-2xl border border-white/5 bg-white/[0.02]"
            animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 6 + Math.random() * 4, ease: 'easeInOut' }}
            style={style}
        />
    );
}

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            <FloatingShape style={{ width: 90, height: 90, top: '12%', right: '12%', opacity: 0.3 }} />
            <FloatingShape style={{ width: 70, height: 70, bottom: '25%', left: '15%', opacity: 0.2, borderRadius: '50%' }} />
            <FloatingShape style={{ width: 110, height: 110, top: '55%', left: '8%', opacity: 0.15 }} />
            <FloatingShape style={{ width: 50, height: 50, top: '20%', left: '30%', opacity: 0.2, borderRadius: '50%' }} />

            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="glass-card p-8 sm:p-10 w-full max-w-md relative z-10">

                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] flex items-center justify-center text-lg font-bold text-[#0B0F1A] mx-auto mb-4">SV</div>
                    <h1 className="text-2xl font-bold mb-1">Create Account</h1>
                    <p className="text-sm text-[#94A3B8]">Join the StudyVault community</p>
                </div>

                <div className="flex gap-3 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] hover:border-white/20 transition-colors">
                        <FaGoogle /> Google
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] hover:border-white/20 transition-colors">
                        <FaGithub /> GitHub
                    </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="text-xs text-[#94A3B8]">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 outline-none focus:border-[#00F0FF]/40 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 outline-none focus:border-[#00F0FF]/40 transition-colors" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 outline-none focus:border-[#00F0FF]/40 transition-colors" />
                    </div>
                </div>

                <button className="btn-neon btn-neon-primary w-full mb-4">Create Account</button>

                <p className="text-center text-sm text-[#94A3B8]">
                    Already have an account? <Link to="/login" className="text-[#00F0FF] hover:underline">Sign In</Link>
                </p>
            </motion.div>
        </div>
    );
}
