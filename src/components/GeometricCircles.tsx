const GeometricCircles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large main circle */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow"
        width="900"
        height="900"
        viewBox="0 0 900 900"
        fill="none"
      >
        <circle
          cx="450"
          cy="450"
          r="440"
          stroke="hsl(72 100% 50% / 0.35)"
          strokeWidth="1.2"
          strokeDasharray="2200"
          className="animate-draw-circle"
        />
      </svg>

      {/* Smaller accent circle */}
      <svg
        className="absolute top-[10%] right-[-5%] animate-pulse-neon"
        width="400"
        height="400"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle
          cx="200"
          cy="200"
          r="195"
          stroke="hsl(72 100% 50% / 0.28)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Bottom left circle */}
      <svg
        className="absolute bottom-[-10%] left-[-5%] animate-pulse-neon"
        style={{ animationDelay: "1.5s" }}
        width="500"
        height="500"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle
          cx="250"
          cy="250"
          r="245"
          stroke="hsl(72 100% 50% / 0.22)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Decorative lines */}
      <svg
        className="absolute top-[20%] right-[10%]"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
      >
        <line
          x1="0"
          y1="100"
          x2="100"
          y2="0"
          stroke="hsl(72 100% 50% / 0.4)"
          strokeWidth="1"
        />
      </svg>

      <svg
        className="absolute bottom-[20%] left-[5%]"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
      >
        <line
          x1="0"
          y1="80"
          x2="80"
          y2="0"
          stroke="hsl(72 100% 50% / 0.3)"
          strokeWidth="1"
        />
      </svg>

      {/* Soft radial glows for depth */}
      <div className="absolute top-[15%] left-[20%] w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,hsl(72_100%_50%/0.12),transparent_70%)] blur-2xl" />
      <div className="absolute bottom-[10%] right-[10%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,hsl(90_100%_55%/0.08),transparent_70%)] blur-3xl" />
    </div>
  );
};

export default GeometricCircles;
