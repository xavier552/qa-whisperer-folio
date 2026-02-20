import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

const LensCursor = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseleave", handleLeave);
      document.addEventListener("mouseenter", handleEnter);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isMobile, visible, x, y]);

  if (isMobile) return null;

  return (
    <>
      {/* Magnifying glass lens ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x,
          y,
          width: 38,
          height: 38,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
          border: "1.5px solid hsl(72 100% 50% / 0.55)",
          boxShadow: "inset 0 0 12px hsl(72 100% 50% / 0.08)",
          backdropFilter: "blur(0.5px)",
        }}
      />
      {/* Handle line extending bottom-right */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x,
          y,
          opacity: visible ? 0.55 : 0,
          translateX: "calc(-50% + 13px)",
          translateY: "calc(-50% + 13px)",
          width: 10,
          height: 1.5,
          borderRadius: 2,
          backgroundColor: "hsl(72 100% 50%)",
          rotate: 45,
          transformOrigin: "left center",
        }}
      />
      {/* Inner dot center */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-neon"
        style={{
          x,
          y,
          width: 4,
          height: 4,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 0.7 : 0,
        }}
      />
    </>
  );
};

export default LensCursor;
