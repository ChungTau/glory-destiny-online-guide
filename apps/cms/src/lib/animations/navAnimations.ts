export const navAnimations = {
  textVariants: {
    open: { opacity: 1, x: 0 },
    minimal: { opacity: 0, x: -10 },
    transition: { opacity: 0, x: -10 }, // Keep labels hidden during transition
  },
  menuVariants: {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  },
  textRevealVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.02, // Start at 200ms, 20ms per character
        duration: 0.2,
        ease: 'easeIn',
      },
    }),
  },
  menuTextRevealVariants: {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.01, // Start at 200ms, 10ms per character
        duration: 0.1,
        ease: 'easeOut',
      },
    }),
  },
};
