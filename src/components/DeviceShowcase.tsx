import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const PREVIEW_URL = window.location.origin;

interface Device {
  name: string;
  width: number;
  height: number;
  screenW: number;
  screenH: number;
  borderRadius: string;
  bezel: { top: number; bottom: number; left: number; right: number };
  notch?: boolean;
  isLaptop?: boolean;
}

const devices: Device[] = [
  {
    name: "iPhone 17 Pro Max",
    width: 200,
    height: 420,
    screenW: 180,
    screenH: 388,
    borderRadius: "28px",
    bezel: { top: 16, bottom: 16, left: 10, right: 10 },
    notch: true,
  },
  {
    name: "Samsung S26",
    width: 195,
    height: 410,
    screenW: 179,
    screenH: 386,
    borderRadius: "22px",
    bezel: { top: 12, bottom: 12, left: 8, right: 8 },
  },
  {
    name: "MacBook Pro",
    width: 380,
    height: 250,
    screenW: 356,
    screenH: 222,
    borderRadius: "12px",
    bezel: { top: 14, bottom: 14, left: 12, right: 12 },
    isLaptop: true,
  },
];

const DeviceFrame = ({
  device,
  zIndex,
  rotation,
  offsetX,
  offsetY,
  scale,
}: {
  device: Device;
  zIndex: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
  scale: number;
}) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ zIndex }}
      animate={{
        x: offsetX,
        y: offsetY,
        rotate: rotation,
        scale,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
      whileHover={{ scale: scale * 1.05, zIndex: 50, rotate: 0 }}
    >
      <div
        className="relative bg-[hsl(0,0%,12%)] shadow-2xl overflow-hidden"
        style={{
          width: device.width,
          height: device.height,
          borderRadius: device.borderRadius,
          border: "2px solid hsl(0 0% 20%)",
        }}
      >
        {/* Notch for iPhone */}
        {device.notch && (
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-20 h-5 bg-[hsl(0,0%,8%)] rounded-b-xl z-10" />
        )}

        {/* Screen */}
        <div
          className="absolute overflow-hidden bg-background"
          style={{
            top: device.bezel.top,
            left: device.bezel.left,
            width: device.screenW,
            height: device.screenH,
            borderRadius: `calc(${device.borderRadius} - 6px)`,
          }}
        >
          <iframe
            src={PREVIEW_URL}
            title={`${device.name} preview`}
            className="border-0 origin-top-left"
            style={{
              width: device.isLaptop ? 1440 : 390,
              height: device.isLaptop ? 900 : 844,
              transform: `scale(${device.screenW / (device.isLaptop ? 1440 : 390)})`,
              pointerEvents: "none",
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>

        {/* Device label */}
        <div
          className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-muted-foreground/40 font-mono whitespace-nowrap"
          style={{ zIndex: 5 }}
        >
          {device.name}
        </div>
      </div>

      {/* Laptop base/keyboard */}
      {device.isLaptop && (
        <div className="relative mx-auto" style={{ width: device.width + 40 }}>
          <div
            className="h-3 bg-[hsl(0,0%,14%)] rounded-b-lg mx-auto border-x-2 border-b-2 border-[hsl(0,0%,20%)]"
            style={{ width: device.width + 40 }}
          />
          <div
            className="h-1 bg-[hsl(0,0%,18%)] rounded-b-sm mx-auto"
            style={{ width: device.width - 40 }}
          />
        </div>
      )}
    </motion.div>
  );
};

/* Positions for the 3 cards — swap on interval */
const layouts = [
  // Layout 0: MacBook center, phones on sides
  [
    { idx: 1, x: -180, y: 20, rot: -6, scale: 0.85, z: 2 },   // Samsung left
    { idx: 0, x: 170, y: 20, rot: 5, scale: 0.85, z: 2 },    // iPhone right
    { idx: 2, x: -10, y: -10, rot: 0, scale: 0.95, z: 3 },   // MacBook center
  ],
  // Layout 1: iPhone center, others behind
  [
    { idx: 0, x: 0, y: 0, rot: 0, scale: 1, z: 3 },           // iPhone center
    { idx: 1, x: -160, y: 30, rot: -8, scale: 0.75, z: 1 },   // Samsung left
    { idx: 2, x: 80, y: 50, rot: 4, scale: 0.7, z: 1 },       // MacBook right
  ],
  // Layout 2: Samsung center
  [
    { idx: 1, x: 0, y: 0, rot: 0, scale: 1, z: 3 },           // Samsung center
    { idx: 0, x: 160, y: 30, rot: 7, scale: 0.75, z: 1 },     // iPhone right
    { idx: 2, x: -100, y: 50, rot: -4, scale: 0.7, z: 1 },    // MacBook left
  ],
];

const DeviceShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [layoutIdx, setLayoutIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLayoutIdx((prev) => (prev + 1) % layouts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentLayout = layouts[layoutIdx];

  return (
    <div ref={ref} className="w-full flex justify-center py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-2xl h-[340px] md:h-[420px] flex items-center justify-center"
      >
        {currentLayout.map((pos) => (
          <DeviceFrame
            key={devices[pos.idx].name}
            device={devices[pos.idx]}
            zIndex={pos.z}
            rotation={pos.rot}
            offsetX={pos.x}
            offsetY={pos.y}
            scale={pos.scale}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default DeviceShowcase;
