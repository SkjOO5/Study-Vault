import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiChevronUp, HiChevronDown, HiExternalLink, HiCalendar, HiTag, HiUser } from 'react-icons/hi';
import { mockResources } from '../data/mockData';

function getBadgeClass(type) {
    const map = { Video: 'badge-video', Article: 'badge-article', PDF: 'badge-pdf', Course: 'badge-course', Notes: 'badge-notes' };
    return map[type] || 'badge-article';
}

export default function ResourceDetailPage() {
    const { id } = useParams();
    const resource = mockResources.find((r) => r.id === Number(id));
    const [upvotes, setUpvotes] = useState(resource?.upvotes || 0);
    const [downvotes, setDownvotes] = useState(resource?.downvotes || 0);
    const [voted, setVoted] = useState(null); // 'up' | 'down' | null
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(resource?.comments || []);

    if (!resource) {
        return (
            <div className="min-h-screen flex items-center justify-center pt-20">
                <div className="text-center">
                    <p className="text-5xl mb-4">😕</p>
                    <h2 className="text-2xl font-bold mb-2">Resource Not Found</h2>
                    <Link to="/explore" className="text-[#00F0FF] text-sm hover:underline">← Back to Explore</Link>
                </div>
            </div>
        );
    }

    const handleVote = (dir) => {
        if (voted === dir) {
            if (dir === 'up') setUpvotes((v) => v - 1);
            else setDownvotes((v) => v - 1);
            setVoted(null);
        } else {
            if (voted === 'up') setUpvotes((v) => v - 1);
            if (voted === 'down') setDownvotes((v) => v - 1);
            if (dir === 'up') setUpvotes((v) => v + 1);
            else setDownvotes((v) => v + 1);
            setVoted(dir);
        }
    };

    const addComment = () => {
        if (!commentText.trim()) return;
        setComments([...comments, { id: Date.now(), user: 'You', text: commentText, date: new Date().toISOString().split('T')[0] }]);
        setCommentText('');
    };

    const isYouTube = resource.url.includes('youtube.com') || resource.url.includes('youtu.be');
    const youtubeId = isYouTube ? resource.url.split('v=')[1]?.split('&')[0] : null;

    const related = mockResources.filter((r) => r.id !== resource.id && (r.subject === resource.subject || r.type === resource.type)).slice(0, 6);

    return (
        <div className="min-h-screen pt-24 pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link to="/explore" className="inline-flex items-center gap-1 text-sm text-[#94A3B8] hover:text-[#00F0FF] transition-colors mb-6">
                        ← Back to Explore
                    </Link>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className="glass-card p-6 sm:p-8"
                >
                    {/* Header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className={`badge ${getBadgeClass(resource.type)}`}>{resource.type}</span>
                        <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                            <HiCalendar /> {resource.dateAdded}
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">{resource.title}</h1>

                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">{resource.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {resource.tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/20">
                                <HiTag size={10} /> {tag}
                            </span>
                        ))}
                    </div>

                    {/* Info Row */}
                    <div className="flex flex-wrap gap-4 text-sm text-[#94A3B8] mb-6">
                        <span className="flex items-center gap-1.5">
                            <HiUser /> {resource.contributor.name}
                        </span>
                        <span className="flex items-center gap-1">
                            Subject: <strong className="text-[#F1F5F9]">{resource.subject}</strong>
                        </span>
                    </div>

                    {/* Visit Link */}
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-neon btn-neon-primary inline-flex items-center gap-2 !text-sm mb-8"
                    >
                        Visit Resource <HiExternalLink />
                    </a>

                    {/* Embedded Preview */}
                    {isYouTube && youtubeId && (
                        <div className="mb-8 rounded-2xl overflow-hidden aspect-video">
                            <iframe
                                src={`https://www.youtube.com/embed/${youtubeId}`}
                                title={resource.title}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                                allowFullScreen
                            />
                        </div>
                    )}

                    {resource.type === 'PDF' && (
                        <div className="mb-8 glass-card p-6 text-center">
                            <p className="text-[#94A3B8] text-sm mb-3">📄 PDF Preview</p>
                            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-[#00F0FF] text-sm hover:underline">
                                Open PDF in new tab →
                            </a>
                        </div>
                    )}

                    {/* Votes */}
                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/5">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote('up')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${voted === 'up'
                                    ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                                    : 'bg-white/5 text-[#94A3B8] border border-white/10 hover:border-[#10B981]/30'
                                }`}
                        >
                            <HiChevronUp size={20} />
                            <motion.span key={upvotes} initial={{ y: -5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                {upvotes}
                            </motion.span>
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleVote('down')}
                            className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-all ${voted === 'down'
                                    ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                                    : 'bg-white/5 text-[#94A3B8] border border-white/10 hover:border-[#EF4444]/30'
                                }`}
                        >
                            <HiChevronDown size={20} />
                            <motion.span key={downvotes} initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                                {downvotes}
                            </motion.span>
                        </motion.button>
                    </div>

                    {/* Comments */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Comments ({comments.length})</h3>

                        <div className="flex gap-3 mb-6">
                            <input
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && addComment()}
                                placeholder="Add a comment..."
                                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-[#F1F5F9] placeholder-[#94A3B8]/50 outline-none focus:border-[#00F0FF]/40 transition-colors"
                            />
                            <button onClick={addComment} className="btn-neon btn-neon-primary !py-2 !px-5 !text-sm">
                                Post
                            </button>
                        </div>

                        <div className="space-y-3">
                            {comments.map((c, i) => (
                                <motion.div
                                    key={c.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="glass-card p-4"
                                >
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-sm font-medium text-[#F1F5F9]">{c.user}</span>
                                        <span className="text-xs text-[#94A3B8]">{c.date}</span>
                                    </div>
                                    <p className="text-sm text-[#94A3B8]">{c.text}</p>
                                </motion.div>
                            ))}
                            {comments.length === 0 && (
                                <p className="text-sm text-[#94A3B8] text-center py-6">No comments yet. Be the first to discuss!</p>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Related Resources */}
                {related.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 100, damping: 15 }}
                        className="mt-12"
                    >
                        <h3 className="text-xl font-bold mb-5">Related Resources</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none">
                            {related.map((r) => (
                                <Link to={`/resource/${r.id}`} key={r.id} className="flex-shrink-0 w-64">
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        className="glass-card glass-card-hover p-4 h-full"
                                    >
                                        <span className={`badge ${getBadgeClass(r.type)} mb-2`}>{r.type}</span>
                                        <h4 className="text-sm font-semibold text-[#F1F5F9] line-clamp-2 mb-2">{r.title}</h4>
                                        <p className="text-xs text-[#94A3B8] line-clamp-2">{r.description}</p>
                                        <div className="flex items-center gap-1 mt-3 text-xs text-[#94A3B8]">
                                            <HiChevronUp className="text-[#10B981]" /> {r.upvotes}
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
