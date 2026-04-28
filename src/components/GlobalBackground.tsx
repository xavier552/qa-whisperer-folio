import { useEffect, useState } from "react";
import GeometricCircles from "./GeometricCircles";

const GlobalBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(72 100% 50% / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(72 100% 50% / 0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          transform: `translate3d(${mouse.x * -8}px, ${mouse.y * -8 + scrollY * -0.05}px, 0)`,
        }}
      />

      {/* Parallax circles layer */}
      <div
        style={{
          transform: `translate3d(${mouse.x * 12}px, ${scrollY * -0.15 + mouse.y * 12}px, 0)`,
          willChange: "transform",
        }}
        className="absolute inset-0"
      >
        <GeometricCircles />
      </div>

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(0_0%_4%/0.6)_100%)]" />
    </div>
  );
};

export default GlobalBackground;
