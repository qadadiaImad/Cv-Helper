/**
 * Framer Motion Animation Library
 * 
 * Reusable animation variants and configurations for consistent
 * motion design throughout the CV-Helper application.
 * 
 * Usage:
 * import { fadeIn, buttonTap } from '@/lib/animations'
 * <motion.div variants={fadeIn} initial="initial" animate="animate" />
 * <motion.button {...buttonTap}>Click me</motion.button>
 */

import { Variants, Transition } from 'framer-motion'

/**
 * TRANSITION CONFIGURATIONS
 * Reusable transition settings
 */

export const transitions = {
  // Spring physics for natural movement
  spring: {
    type: 'spring',
    stiffness: 400,
    damping: 30,
  } as Transition,
  
  springBouncy: {
    type: 'spring',
    stiffness: 500,
    damping: 25,
  } as Transition,
  
  springSmooth: {
    type: 'spring',
    stiffness: 300,
    damping: 35,
  } as Transition,
  
  // Tween for precise timing
  fast: {
    type: 'tween',
    duration: 0.15,
    ease: 'easeOut',
  } as Transition,
  
  normal: {
    type: 'tween',
    duration: 0.3,
    ease: 'easeInOut',
  } as Transition,
  
  slow: {
    type: 'tween',
    duration: 0.5,
    ease: 'easeInOut',
  } as Transition,
}

/**
 * FADE ANIMATIONS
 * Opacity-based transitions
 */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: transitions.normal,
  },
  exit: { 
    opacity: 0,
    transition: transitions.fast,
  },
}

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.spring,
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: transitions.fast,
  },
}

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: transitions.spring,
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: transitions.fast,
  },
}

/**
 * SLIDE ANIMATIONS
 * Directional movement transitions
 */

export const slideUp: Variants = {
  initial: { y: '100%', opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: transitions.springSmooth,
  },
  exit: { 
    y: '-100%', 
    opacity: 0,
    transition: transitions.normal,
  },
}

export const slideInRight: Variants = {
  initial: { x: 100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: transitions.spring,
  },
  exit: { 
    x: -100, 
    opacity: 0,
    transition: transitions.normal,
  },
}

export const slideInLeft: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: transitions.spring,
  },
  exit: { 
    x: 100, 
    opacity: 0,
    transition: transitions.normal,
  },
}

/**
 * SCALE ANIMATIONS
 * Size-based transformations
 */

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: transitions.springBouncy,
  },
  exit: { 
    scale: 0.8, 
    opacity: 0,
    transition: transitions.fast,
  },
}

export const scaleInCenter: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: transitions.springBouncy,
  },
  exit: { 
    scale: 0, 
    opacity: 0,
    transition: transitions.fast,
  },
}

export const pulseScale: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * STAGGER ANIMATIONS
 * Sequential animations for children
 */

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
}

export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const staggerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

/**
 * INTERACTION ANIMATIONS
 * Hover, tap, and drag states
 */

// Button interactions
export const buttonTap = {
  whileTap: { scale: 0.95 },
  whileHover: { scale: 1.02 },
  transition: transitions.spring,
}

export const buttonPress = {
  whileTap: { scale: 0.98, opacity: 0.8 },
  transition: transitions.fast,
}

export const buttonHover = {
  whileHover: { 
    y: -2,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: transitions.spring,
  },
  whileTap: { y: 0 },
}

// Card interactions
export const cardHover = {
  whileHover: { 
    y: -4,
    scale: 1.02,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: transitions.spring,
  },
}

export const cardPress = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: transitions.spring,
}

// Icon interactions
export const iconSpin = {
  whileHover: { 
    rotate: 360,
    transition: { duration: 0.5, ease: 'linear' },
  },
}

export const iconBounce = {
  whileHover: { 
    y: [-2, 0, -2],
    transition: { 
      duration: 0.5, 
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * PAGE TRANSITIONS
 * Full-page navigation animations
 */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

export const pageSlide: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: { 
    x: '-100%',
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
}

/**
 * MODAL/DIALOG ANIMATIONS
 * Overlay and content animations
 */

export const modalOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const modalContent: Variants = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    y: 0,
    transition: transitions.springBouncy,
  },
  exit: { 
    scale: 0.9, 
    opacity: 0,
    y: 20,
    transition: transitions.fast,
  },
}

export const drawerFromRight: Variants = {
  initial: { x: '100%' },
  animate: { 
    x: 0,
    transition: transitions.springSmooth,
  },
  exit: { 
    x: '100%',
    transition: transitions.normal,
  },
}

export const drawerFromLeft: Variants = {
  initial: { x: '-100%' },
  animate: { 
    x: 0,
    transition: transitions.springSmooth,
  },
  exit: { 
    x: '-100%',
    transition: transitions.normal,
  },
}

/**
 * LOADING ANIMATIONS
 * Spinners, skeletons, and progress indicators
 */

export const spinnerRotate = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
}

export const skeletonPulse: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

export const progressBar: Variants = {
  initial: { width: '0%' },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
}

/**
 * NOTIFICATION ANIMATIONS
 * Toasts and alerts
 */

export const toastSlideIn: Variants = {
  initial: { x: '100%', opacity: 0 },
  animate: { 
    x: 0, 
    opacity: 1,
    transition: transitions.spring,
  },
  exit: { 
    x: '100%', 
    opacity: 0,
    transition: transitions.normal,
  },
}

export const toastFromTop: Variants = {
  initial: { y: '-100%', opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: transitions.springBouncy,
  },
  exit: { 
    y: '-100%', 
    opacity: 0,
    transition: transitions.fast,
  },
}

/**
 * SPECIAL EFFECTS
 * Unique animations for specific use cases
 */

export const rippleEffect = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { 
    scale: 2, 
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

export const shakeAnimation = {
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
}

export const floatingAnimation: Variants = {
  animate: {
    y: [-10, 0, -10],
    transition: {
      duration: 3,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
}

/**
 * PRESET COMBINATIONS
 * Common animation patterns
 */

export const fadeInUpStagger = {
  container: staggerContainer,
  item: fadeInUp,
}

export const scaleInStagger = {
  container: staggerContainer,
  item: scaleIn,
}

export const slideInStagger = {
  container: staggerFast,
  item: slideInRight,
}

/**
 * UTILITY FUNCTIONS
 */

/** Create custom stagger with configurable delay */
export function customStagger(staggerDelay: number = 0.1): Variants {
  return {
    animate: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }
}

/** Create custom fade with configurable duration */
export function customFade(duration: number = 0.3): Variants {
  return {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration },
    },
    exit: { 
      opacity: 0,
      transition: { duration: duration * 0.5 },
    },
  }
}

export default {
  // Basic
  fadeIn,
  fadeInUp,
  fadeInDown,
  slideUp,
  slideInRight,
  slideInLeft,
  scaleIn,
  scaleInCenter,
  
  // Stagger
  staggerContainer,
  staggerFast,
  staggerSlow,
  
  // Interactions
  buttonTap,
  buttonPress,
  buttonHover,
  cardHover,
  cardPress,
  iconSpin,
  iconBounce,
  
  // Pages
  pageTransition,
  pageSlide,
  
  // Modals
  modalOverlay,
  modalContent,
  drawerFromRight,
  drawerFromLeft,
  
  // Loading
  spinnerRotate,
  skeletonPulse,
  progressBar,
  
  // Notifications
  toastSlideIn,
  toastFromTop,
  
  // Effects
  rippleEffect,
  shakeAnimation,
  floatingAnimation,
  
  // Presets
  fadeInUpStagger,
  scaleInStagger,
  slideInStagger,
}
