import { useState, useRef, useCallback } from 'react';
import styles from './experience-card.module.css';

export function ExperienceCard3D({ exp }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.15 });
  }, [isFlipped]);

  const handleMouseLeave = useCallback(() => {
    setTransform('');
    setGlare({ x: 50, y: 50, opacity: 0 });
    setIsHovering(false);
  }, []);

  return (
    <div
      className={styles.wrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovering(true)}
    >
      <div
        ref={cardRef}
        className={styles.card}
        data-flipped={isFlipped}
        data-hovering={isHovering}
        style={{
          transform: isFlipped ? 'perspective(800px) rotateY(180deg)' : transform || 'perspective(800px) rotateX(0deg) rotateY(0deg)',
          '--accent': exp.accentColor,
          '--glare-x': `${glare.x}%`,
          '--glare-y': `${glare.y}%`,
          '--glare-opacity': glare.opacity,
          '--glow-angle': `${glare.x * 3.6}deg`,
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Edge glow */}
        <div className={styles.edgeGlow} data-visible={isHovering} />

        {/* Glare */}
        <div className={styles.glare} />

        {/* ─── Front ──────────────────────────── */}
        <div className={styles.front} style={{ background: exp.gradient }}>
          <div className={styles.gridPattern} />
          <div className={styles.frontContent}>
            <div className={styles.topRow}>
              <div className={styles.badge} data-current={exp.current}>
                {exp.current && <span className={styles.badgeDot} />}
                <span>{exp.current ? 'CURRENT' : exp.duration.split(' - ')[0].toUpperCase()}</span>
              </div>
              <span className={styles.duration}>{exp.duration}</span>
            </div>

            <h3 className={styles.company}>{exp.company}</h3>
            <p className={styles.role}>{exp.role}</p>

            <div className={styles.tags}>
              {exp.tags.map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          <div className={styles.flipHint}>
            <span>Click to flip</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 014-4h14" />
              <path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 01-4 4H3" />
            </svg>
          </div>
        </div>

        {/* ─── Back ───────────────────────────── */}
        <div className={styles.back} style={{ background: exp.gradient }}>
          <div className={styles.gridPattern} />
          <div className={styles.backContent}>
            <div className={styles.backHeader}>
              <h4 className={styles.backTitle} style={{ color: exp.accentColor }}>KEY ACHIEVEMENTS</h4>
              <span className={styles.backHint}>Click to flip back</span>
            </div>
            <div className={styles.highlights}>
              {exp.highlights.map((h, j) => (
                <div key={j} className={styles.highlightRow}>
                  <span className={styles.highlightNum} style={{ background: `${exp.accentColor}18`, color: exp.accentColor, borderColor: `${exp.accentColor}30` }}>
                    {j + 1}
                  </span>
                  <p className={styles.highlightText}>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
