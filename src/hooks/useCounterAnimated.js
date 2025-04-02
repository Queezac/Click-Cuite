import { useEffect, useRef, useState } from "react";

const useCounterAnimated = (targetValue, duration = 500) => {
  const [animatedValue, setAnimatedValue] = useState(targetValue);
  const animationRef = useRef(null);
  const animatedValueRef = useRef(animatedValue);

  useEffect(() => {
    animatedValueRef.current = animatedValue;
  }, [animatedValue]);

  useEffect(() => {
    const startValue = animatedValueRef.current;
    const endValue = targetValue;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = progress;
      const interpolatedValue = Math.floor(
        startValue + (endValue - startValue) * easedProgress
      );

      setAnimatedValue(interpolatedValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationRef.current);
  }, [targetValue, duration]);

  return animatedValue;
};

export default useCounterAnimated;
