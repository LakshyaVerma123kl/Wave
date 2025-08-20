import { useState, useEffect, useRef } from "react";

export const useWaveAnimation = (isPlaying) => {
  const [animationTime, setAnimationTime] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setAnimationTime((prev) => prev + 0.1);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  return animationTime;
};
