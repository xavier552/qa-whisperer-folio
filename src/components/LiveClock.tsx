import { useState, useEffect, useCallback } from "react";
import { Clock, Monitor, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemInfo {
  os: string;
  browser: string;
  deviceType: string;
  resolution: string;
  language: string;
  platform: string;
  online: boolean;
  networkSpeed: string;
}

const getOS = (ua: string): string => {
  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows NT 6/.test(ua)) return "Windows 7/8";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Unknown OS";
};

const getBrowser = (ua: string): string => {
  if (/Edg\//.test(ua)) return `Edge ${ua.match(/Edg\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  if (/OPR\//.test(ua)) return `Opera ${ua.match(/OPR\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  if (/Chrome\//.test(ua)) return `Chrome ${ua.match(/Chrome\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  if (/Firefox\//.test(ua)) return `Firefox ${ua.match(/Firefox\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return `Safari ${ua.match(/Version\/([\d.]+)/)?.[1]?.split(".")[0] ?? ""}`;
  return "Unknown";
};

const getDeviceType = (ua: string): string => {
  if (/Tablet|iPad/.test(ua)) return "Tablet";
  if (/Mobile|Android|iPhone/.test(ua)) return "Mobile";
  return "Desktop";
};

const LiveClock = () => {
  const [now, setNow] = useState(new Date());
  const [showInfo, setShowInfo] = useState(false);
  const [sysInfo, setSysInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const gatherInfo = useCallback(async () => {
    const ua = navigator.userAgent;
    let networkSpeed = "Unknown";

    // Network speed via navigator.connection
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      const dl = conn.downlink;
      const eff = conn.effectiveType;
      networkSpeed = dl ? `~${dl} Mbps (${eff ?? ""})` : eff ?? "Unknown";
    } else {
      // Fallback: fetch small resource and measure
      try {
        const start = performance.now();
        await fetch("https://www.cloudflare.com/cdn-cgi/trace", { cache: "no-store", signal: AbortSignal.timeout(4000) });
        const dur = (performance.now() - start) / 1000;
        // 1KB ~ 8Kbits / dur
        networkSpeed = dur < 0.5 ? "Fast" : dur < 2 ? "Moderate" : "Slow";
      } catch {
        networkSpeed = navigator.onLine ? "Online" : "Offline";
      }
    }

    setSysInfo({
      os: getOS(ua),
      browser: getBrowser(ua),
      deviceType: getDeviceType(ua),
      resolution: `${window.screen.width}×${window.screen.height}`,
      language: navigator.language,
      platform: navigator.platform || "Unknown",
      online: navigator.onLine,
      networkSpeed,
    });
  }, []);

  const handleToggle = useCallback(() => {
    if (!showInfo && !sysInfo) gatherInfo();
    setShowInfo((v) => !v);
  }, [showInfo, sysInfo, gatherInfo]);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const rows: { label: string; value: string }[] = sysInfo
    ? [
        { label: "OS", value: sysInfo.os },
        { label: "Browser", value: sysInfo.browser },
        { label: "Device", value: sysInfo.deviceType },
        { label: "Resolution", value: sysInfo.resolution },
        { label: "Language", value: sysInfo.language },
        { label: "Platform", value: sysInfo.platform },
        { label: "Status", value: sysInfo.online ? "Online ●" : "Offline ○" },
        { label: "Network", value: sysInfo.networkSpeed },
      ]
    : [];

  return (
    <div className="fixed bottom-3 right-3 z-40 flex flex-col items-end gap-1.5">
      {/* System Info Panel */}
      <AnimatePresence>
        {showInfo && sysInfo && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="bg-card/95 backdrop-blur-md border border-border rounded-lg p-3 w-56 text-[10px] font-mono"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-neon tracking-widest uppercase text-[9px]">System Info</span>
              <button onClick={() => setShowInfo(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={10} />
              </button>
            </div>
            <div className="space-y-1">
              {rows.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-2">
                  <span className="text-muted-foreground shrink-0">{label}</span>
                  <span className={`text-foreground truncate text-right ${label === "Status" && sysInfo.online ? "text-neon" : ""}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clock bar */}
      <div className="bg-card/80 backdrop-blur-md border border-border rounded-md px-2.5 py-1.5 flex items-center gap-2 text-[10px] font-mono">
        <div className="flex items-center gap-1 text-neon">
          <Clock size={10} />
          <span>{time}</span>
        </div>
        <div className="w-px h-3 bg-border" />
        <span className="text-muted-foreground">{date}</span>
        <div className="w-px h-3 bg-border" />
        <button
          onClick={handleToggle}
          className="text-muted-foreground hover:text-neon transition-colors"
          title="System Info"
        >
          <Monitor size={10} />
        </button>
      </div>
    </div>
  );
};

export default LiveClock;
