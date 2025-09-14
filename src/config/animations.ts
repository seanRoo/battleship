export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.4, 0, 0.2, 1],
} as const;

export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
} as const;

export const DELAY = {
  stagger: 0.2,
  quick: 0.1,
} as const;

export const TRANSITIONS = {
  panel: { duration: DURATION.normal, ease: EASING.smooth },
  panelSlow: { duration: DURATION.slow, ease: EASING.smooth },
  fast: { duration: DURATION.fast, ease: EASING.smooth },
} as const;

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAY.stagger,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: TRANSITIONS.panel,
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: TRANSITIONS.panel,
};

export const scaleIn = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: DURATION.normal, ease: EASING.bounce },
};

export const interactive = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: TRANSITIONS.fast,
};

export const sunkExplosion = {
  animate: {
    scale: [1, 1.1, 1],
  },
  transition: { duration: DURATION.slow, ease: EASING.smooth },
};
