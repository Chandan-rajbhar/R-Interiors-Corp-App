import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

const TAB_ROUTES = ['/home', '/about', '/services', '/gallery', '/contact'];

export function usePageTransition() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [navState, setNavState] = useState({
    prevPath: location.pathname,
    direction: 1,
  });

  useEffect(() => {
    setNavState((prev) => {
      if (prev.prevPath === location.pathname) return prev;
      const prevIdx = TAB_ROUTES.indexOf(prev.prevPath);
      const currIdx = TAB_ROUTES.indexOf(location.pathname);

      let nextDirection = 1;
      if (prevIdx !== -1 && currIdx !== -1) {
        nextDirection = currIdx >= prevIdx ? 1 : -1;
      } else if (currIdx !== -1 && prevIdx === -1) {
        nextDirection = -1;
      }

      return {
        prevPath: location.pathname,
        direction: nextDirection,
      };
    });
  }, [location.pathname]);

  const variants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        initial: (dir) => ({
          opacity: 0,
          x: dir > 0 ? 24 : -24,
        }),
        animate: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          },
        },
        exit: (dir) => ({
          opacity: 0,
          x: dir > 0 ? -18 : 18,
          transition: {
            duration: 0.18,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      };

  return {
    direction: navState.direction,
    variants,
    shouldReduceMotion,
  };
}
