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
  // Actual viewport dimensions the website should render at
  viewportW: number;
  viewportH: number;
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
    viewportW: 390,   // iPhone viewport width
    viewportH: 844,
  },
  {
    name: "Samsung S26",
    width: 195,
    height: 410,
    screenW: 179,
    screenH: 386,
    borderRadius: "22px",
    bezel: { top: 12, bottom: 12, left: 8, right: 8 },
    viewportW: 360,   // Android viewport width
    viewportH: 800,
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
    viewportW: 1440,  // Desktop viewport width
    viewportH: 900,
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
  // Scale factor: how much to shrink the full viewport to fit the screen area
  const scaleX = device.screenW / device.viewportW;
  const scaleY = device.screenH / device.viewportH;
  const iframeScale = Math.min(scaleX, scaleY);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ zIndex }}
      animate={{ x: offsetX, y: offsetY, rotate: rotation, scale }}
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
              // Set iframe to exact viewport dimensions → browser renders correct breakpoint
              width: device.viewportW,
              height: device.viewportH,
              // Scale down visually to fit the screen area
              transform: `scale(${iframeScale})`,
              transformOrigin: "top left",
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
export default DeviceShowcase;
