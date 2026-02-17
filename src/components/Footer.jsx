import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="relative mt-20">
            <div className="gradient-line" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00F0FF] to-[#8B5CF6] flex items-center justify-center text-xs font-bold text-[#0B0F1A]">
                                SV
                            </div>
                            <span className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                                Study<span className="text-[#00F0FF]">Vault</span>
                            </span>
                        </div>
                        <p className="text-[#94A3B8] text-sm max-w-xs leading-relaxed">
                            All your study resources in one place. Curated by students, for students.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-[#F1F5F9] mb-3">Platform</h4>
                        <div className="flex flex-col gap-2">
                            <Link to="/explore" className="text-sm text-[#94A3B8] hover:text-[#00F0FF] transition-colors">Explore</Link>
                            <Link to="/submit" className="text-sm text-[#94A3B8] hover:text-[#00F0FF] transition-colors">Submit Resource</Link>
                            <Link to="/dashboard" className="text-sm text-[#94A3B8] hover:text-[#00F0FF] transition-colors">Dashboard</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-[#F1F5F9] mb-3">Connect</h4>
                        <div className="flex gap-3">
                            <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors" aria-label="GitHub"><FaGithub size={20} /></a>
                            <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors" aria-label="Twitter"><FaTwitter size={20} /></a>
                            <a href="#" className="text-[#94A3B8] hover:text-[#00F0FF] transition-colors" aria-label="Discord"><FaDiscord size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-[#94A3B8]">© 2026 StudyVault. Built for learners everywhere.</p>
                    <p className="text-xs text-[#94A3B8]/50">Powered by curiosity ✦</p>
                </div>
            </div>
        </footer>
    );
}
