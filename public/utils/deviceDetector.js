// Deteksi mobile
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

// Higher Order Component
import { useState, useEffect } from 'react';

export const withMobileOptimization = (Component) => {
  return (props) => {
    const [reducedMotion, setReducedMotion] = useState(false);
    
    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaQuery.matches);
    }, []);
    
    return <Component {...props} reducedMotion={reducedMotion} />;
  };
};