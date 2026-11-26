import { motion } from 'framer-motion';
import { usePageTransition } from '../hooks/usePageTransition';

export function AnimatedPage({ children, className = '' }) {
  const { direction, variants } = usePageTransition();

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full min-h-full ${className}`}
    >
      {children}
    </motion.div>
  );
}
