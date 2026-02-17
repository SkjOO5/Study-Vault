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

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            <FloatingShape style={{ width: 80, height: 80, top: '15%', left: '10%', opacity: 0.3 }} />
            <FloatingShape style={{ width: 120, height: 120, top: '60%', right: '8%', opacity: 0.2, borderRadius: '50%' }} />
            <FloatingShape style={{ width: 60, height: 60, bottom: '20%', left: '20%', opacity: 0.25 }} />
            <FloatingShape style={{ width: 100, height: 100, top: '10%', right: '25%', opacity: 0.15, borderRadius: '50%' }} />

            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                className="glass-card p-8 sm:p-10 w-full max-w-md relative z-10">

                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] flex items-center justify-center text-lg font-bold text-[#0B0F1A] mx-auto mb-4">SV</div>
                    <h1 className="text-2xl font-bold mb-1">Welcome Back</h1>
                    <p className="text-sm text-[#94A3B8]">Sign in to your StudyVault account</p>
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

                <button className="btn-neon btn-neon-primary w-full mb-4">Sign In</button>

                <p className="text-center text-sm text-[#94A3B8]">
                    Don't have an account? <Link to="/register" className="text-[#00F0FF] hover:underline">Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
}
