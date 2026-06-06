import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [spinAngle, setSpinAngle] = useState(0);

  const handleToggle = () => {
    const nextLang = language === 'en' ? 'bg' : 'en';
    setLanguage(nextLang);
    setSpinAngle(prev => prev + 360);
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileHover={{
        scale: 1.08,
        borderColor: 'rgba(37, 150, 190, 0.6)',
        backgroundColor: 'rgba(37, 150, 190, 0.12)',
        boxShadow: '0 0 20px rgba(37, 150, 190, 0.35)',
      }}
      whileTap={{ scale: 0.92 }}
      style={{
        position: 'relative',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        background: 'rgba(7, 12, 20, 0.65)',
        border: '1px solid rgba(37, 150, 190, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 4px 15px rgba(0,0,0,0.3)',
        outline: 'none',
        padding: 0,
        overflow: 'hidden',
        pointerEvents: 'auto',
      }}
      title={language === 'en' ? 'Премини на български' : 'Switch to English'}
    >
      {/* Spinning Globe Outline */}
      <motion.svg
        animate={{ rotate: spinAngle }}
        transition={{ type: 'spring', stiffness: 140, damping: 14 }}
        width="32px"
        height="32px"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          opacity: 0.5,
          position: 'absolute',
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" style={{ opacity: 0.2 }} />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </motion.svg>

      {/* Floating dynamic text inside */}
      <AnimatePresence mode="wait">
        <motion.span
          key={language}
          initial={{ opacity: 0, scale: 0.6, y: 0.5 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: -0.5 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          style={{
            position: 'relative',
            zIndex: 1,
            fontSize: '11px',
            fontWeight: 800,
            fontFamily: 'var(--font-display)',
            color: '#f0f6fb',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 1,
          }}
        >
          {language}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
