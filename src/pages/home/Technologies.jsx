import React, { useRef, useState, useEffect } from 'react';
import './technologies.css';
import styles from '../../modules/styles.module.css';
import { useTranslation } from 'react-i18next';
import GraphPaper from '../../components/GraphPaper';
import { motion } from 'framer-motion';
import imageUrl from '../../assets/drone_sketch.png';

// Custom hook for intersection observer
const useIntersectionObserver = (options) => {
  const [hasIntersected, setHasIntersected] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, hasIntersected];
};

export default function Technologies() {
  const { t } = useTranslation();
  const [ref, hasIntersected] = useIntersectionObserver({ threshold: 0.2 });

  return (
    <div
      style={{
        maxWidth: '1080px',
        margin: '120px auto',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="text-tech-container">
        <h1 className={styles.title_primary}>{t('our_technologies')}</h1>
        <p className={styles.text}>{t('our_technologies_description')}</p>
      </div>

      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        >
          <GraphPaper />
        </motion.div>
        <div style={{ position: 'relative', zIndex: 1 }} ref={ref}>
          {hasIntersected && (
            <motion.img
              src={imageUrl}
              alt="Graph Image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -20, 0] }}
              transition={{
                opacity: { duration: 2, delay: 0.5 },
                y: { duration: 4, repeat: Infinity, repeatType: "mirror" }
              }}
              style={{ width: '100%', height: 'auto' }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
