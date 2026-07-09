import { motion, useScroll, useSpring } from "framer-motion";

const ArticleProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-neon z-[60] shadow-[0_0_12px_hsl(72_100%_50%/0.7)]"
      aria-hidden="true"
    />
  );
};

export default ArticleProgress;