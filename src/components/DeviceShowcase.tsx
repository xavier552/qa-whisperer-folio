import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const PREVIEW_URL = window.location.origin;

interface Device {
  name: string;
  screenW: number;
  screenH: number;
  frameW: number;
  frameH: number;
  borderRadius: string;
  nativeW: number;
  nativeH: number;
  type: "tablet" | "phone" | "laptop" | "desktop";
}

const devices: Device[] = [
  {
    name: "Samsung Tab",
    frameW: 200,
    frameH: 290,
    screenW: 184,
    screenH: 268,
    borderRadius: "16px",
    nativeW: 800,
    nativeH: 1280,
    type: "tablet",
  },
  {
    name: "iPhone 17 Pro Max",
    frameW: 170,
    frameH: 360,
    screenW: 154,
    screenH: 330,
    borderRadius: "28px",
    nativeW: 430,
    nativeH: 932,
    type: "phone",
  },
  {
    name: "MacBook M5",
    frameW: 320,
    frameH: 210,
    screenW: 300,
    screenH: 188,
    borderRadius: "10px",
    nativeW: 1440,
    nativeH: 900,
    type: "laptop",
  },
  {
    name: "Desktop Monitor",
    frameW: 360,
    frameH: 220,
    screenW: 340,
    screenH: 200,
    borderRadius: "6px",
    nativeW: 1920,
    nativeH: 1080,
    type: "desktop",
  },
];

const DeviceFrame = ({ device }: { device: Device }) => {
  const scale = device.screenW / device.nativeW;

  return (
    <div className="flex flex-col items-center gap-2 md:gap-3">
      <span className="text-[10px] md:text-xs font-mono text-muted-foreground/60 tracking-wider uppercase">
        {device.name}
      </span>

      <div
        className="relative bg-[hsl(0,0%,10%)] shadow-2xl overflow-hidden"
        style={{
          width: device.frameW,
          height: device.frameH,
          borderRadius: device.borderRadius,
          border: "2px solid hsl(0 0% 18%)",
        }}
      >
        {device.type === "phone" && (
          <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-[hsl(0,0%,6%)] rounded-b-xl z-10" />
        )}

        <div
          className="absolute overflow-hidden bg-background"
          style={{
            top: (device.frameH - device.screenH) / 2,
            left: (device.frameW - device.screenW) / 2,
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

      {device.type === "laptop" && (
        <div className="relative -mt-1">
          <div
            className="h-2.5 bg-[hsl(0,0%,12%)] rounded-b-lg border-x-2 border-b-2 border-[hsl(0,0%,18%)]"
            style={{ width: device.frameW + 30 }}
          />
          <div
            className="h-1 bg-[hsl(0,0%,16%)] rounded-b-sm mx-auto"
            style={{ width: device.frameW - 60 }}
          />
        </div>
      )}

      {device.type === "desktop" && (
        <div className="flex flex-col items-center -mt-1">
          <div className="w-4 h-6 bg-[hsl(0,0%,14%)] border-x border-[hsl(0,0%,18%)]" />
          <div className="w-16 h-1.5 bg-[hsl(0,0%,12%)] rounded-md border border-[hsl(0,0%,18%)]" />
        </div>
      )}
    </div>
  );
};

const DeviceShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIdx, setActiveIdx] = useState(0);

  const pairs = [
    [0, 1], // Tab + iPhone
    [2, 3], // MacBook + Desktop
    [1, 2], // iPhone + MacBook
    [0, 3], // Tab + Desktop
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % pairs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentPair = pairs[activeIdx];

  return (
    <div ref={ref} className="w-full flex justify-center py-4 md:py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-3xl"
      >
        {/* Simulator header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[hsl(0,0%,8%)] border border-border rounded-t-xl">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-[hsl(40,80%,50%)]/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-neon/60" />
          </div>
          <span className="text-[10px] font-mono text-muted-foreground/50 ml-2">
            Device Simulator — {devices[currentPair[0]].name} & {devices[currentPair[1]].name}
          </span>
        </div>

        {/* Device display area */}
        <div className="bg-[hsl(0,0%,6%)] border-x border-b border-border rounded-b-xl p-4 sm:p-6 md:p-10 min-h-[300px] md:min-h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-10 md:gap-14 lg:gap-16"
            >
              {currentPair.map((deviceIdx) => (
                <motion.div
                  key={devices[deviceIdx].name}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="cursor-default"
                >
                  <DeviceFrame device={devices[deviceIdx]} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-3">
          {pairs.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === activeIdx ? "bg-neon" : "bg-border hover:bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DeviceShowcase;
