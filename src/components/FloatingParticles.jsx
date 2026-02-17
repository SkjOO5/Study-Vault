import { useMemo } from 'react';

const PARTICLE_COUNT = 18;

export default function FloatingParticles() {
    const particles = useMemo(() => {
        return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
            const size = Math.random() * 6 + 2;
            const left = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 15 + 12;
            const isAccent = Math.random() > 0.5;
            return (
                <span
                    key={i}
                    className="particle"
                    style={{
                        width: size,
                        height: size,
                        left: `${left}%`,
                        bottom: '-10px',
                        background: isAccent ? '#8B5CF6' : '#00F0FF',
                        animationDelay: `${delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            );
        });
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {particles}
        </div>
    );
}
