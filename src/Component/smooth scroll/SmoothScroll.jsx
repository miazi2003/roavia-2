import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css'; // Recommended base styles for Lenis

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = () => {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Adjust speed (default is usually 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smoothWheel: true,
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP Ticker to Lenis
    // This ensures animations are perfectly synced with the scroll
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    // 4. Disable lag smoothing in GSAP to prevent jumpy scrolls
    gsap.ticker.lagSmoothing(0);

    // Cleanup function when component unmounts
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SmoothScroll;