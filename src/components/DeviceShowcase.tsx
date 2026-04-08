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
  isDesktop?: boolean;
  isFold?: boolean;
  nativeW: number;
  nativeH: number;
}

const devices: Device[] = [
  {
    name: "Samsung Tab",
    width: 220,
    height: 310,
    screenW: 200,
    screenH: 280,
    borderRadius: "16px",
    bezel: { top: 15, bottom: 15, left: 10, right: 10 },
    nativeW: 800,
    nativeH: 1280,
  },
  {
    name: "iPhone 17 Pro Max",
    width: 180,
    height: 380,
    screenW: 164,
    screenH: 352,
    borderRadius: "28px",
    bezel: { top: 14, bottom: 14, left: 8, right: 8 },
    notch: true,
    nativeW: 430,
    nativeH: 932,
  },
  {
    name: "MacBook M5",
    width: 340,
    height: 220,
    screenW: 318,
    screenH: 198,
    borderRadius: "10px",
    bezel: { top: 12, bottom: 10, left: 11, right: 11 },
    isLaptop: true,
    nativeW: 1440,
    nativeH: 900,
  },
  {
    name: "Desktop Monitor",
    width: 380,
    height: 240,
    screenW: 360,
    screenH: 216,
    borderRadius: "8px",
    bezel: { top: 12, bottom: 12, left: 10, right: 10 },
    isDesktop: true,
    nativeW: 1920,
    nativeH: 1080,
  },
];

const DeviceFrame = ({ device, isActive }: { device: Device; isActive: boolean }) => {
  const scale = device.screenW / device.nativeW;

  return (
    <motion.div
      className="flex flex-col items-center shrink-0"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-[10px] font-mono text-muted-foreground mb-2 tracking-wider uppercase">
        {device.name}
      </span>
      <motion.div
        animate={{ scale: isActive ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
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
          {device.notch && (
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-[hsl(0,0%,8%)] rounded-b-xl z-10" />
          )}
          <div
            className="absolute overflow-hidden bg-background"
            style={{
              top: device.bezel.top,
              left: device.bezel.left,
              width: device.screenW,
              height: device.screenH,
              borderRadius: `calc(${device.borderRadius} - 4px)`,
            }}
          >
            <iframe
              src={PREVIEW_URL}
              title={`${device.name} preview`}
              className="border-0 origin-top-left"
              style={{
                width: device.nativeW,
                height: device.nativeH,
                transform: `scale(${scale})`,
                pointerEvents: "none",
              }}
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
        {/* Laptop/Desktop stand */}
        {(device.isLaptop || device.isDesktop) && (
          <div className="flex flex-col items-center">
            <div
              className="h-3 bg-[hsl(0,0%,14%)] rounded-b-lg border-x-2 border-b-2 border-[hsl(0,0%,20%)]"
              style={{ width: device.width + (device.isDesktop ? 20 : 40) }}
            />
            {device.isDesktop && (
              <>
                <div className="w-4 h-8 bg-[hsl(0,0%,16%)] border-x border-[hsl(0,0%,20%)]" />
                <div className="w-20 h-2 bg-[hsl(0,0%,14%)] rounded-sm border border-[hsl(0,0%,20%)]" />
              </>
            )}
            {device.isLaptop && (
              <div
                className="h-1 bg-[hsl(0,0%,18%)] rounded-b-sm"
                style={{ width: device.width - 40 }}
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const DeviceShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % devices.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="w-full py-4 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Device indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {devices.map((d, i) => (
            <button
              key={d.name}
              onClick={() => setActiveIdx(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-8 bg-neon" : "w-3 bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Devices grid - scrollable on mobile, grid on desktop */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-end justify-center gap-6 md:gap-10 lg:gap-14 min-w-max mx-auto px-4">
            {devices.map((device, i) => (
              <DeviceFrame key={device.name} device={device} isActive={i === activeIdx} />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeviceShowcase;
