import React from 'react';
import './technologies.css';
import styles from '../../modules/styles.module.css';
import IconShape from '../../components/IconShape';
import Icon4k from '../../assets/icons/4k-icon.svg';
import IconAi from '../../assets/icons/ai-icon.svg';
import IconDrone from '../../assets/icons/drone-icon.svg';
import IconStream from '../../assets/icons/stream-icon.svg';
import IconFpv from '../../assets/icons/fpv-icon.svg';
import { useTranslation } from 'react-i18next';
import GraphPaper from '../../components/GraphPaper';
import { motion } from 'framer-motion';
import imageUrl from '../../assets/drone_sketch.png';



const technologies = [
  {
    iconPath: `${Icon4k}`,
    title: 'high_resolution',
    description:
      'We can capture stunning aerial footage that will help you showcase your business or project.',
  },
  {
    iconPath: `${IconDrone}`,
    title: 'High-speed',
    description:
      'high-speed drone technology, which can capture footage at high speeds for action shots, sports events, and more.',
  },
  {
    iconPath: `${IconStream}`,
    title: 'Real-time streaming',
    description: 'you can join our flights and see the footages in real-time.',
  },
  {
    iconPath: `${IconFpv}`,
    title: 'FPV',
    description:
      'FPV technology allows for precise and immersive control of the drone.',
  },
  {
    iconPath: `${IconAi}`,
    title: 'AI and machine learning',
    description:
      'AI and machine learning algorithms for image and data analysis.',
  },
];

export default function Technologies() {
  const { t } = useTranslation();

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


      <div style={{ maxWidth: '1080px', margin: '0 auto', position: 'relative', height: '720px' }}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
      >
        <GraphPaper/>
      </motion.div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <motion.img
          src={imageUrl}
          alt="Graph Image"
          style={{ width: '100%', height: 'auto' }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
        />
      </div>
    </div>
  
    </div>
  );
}
