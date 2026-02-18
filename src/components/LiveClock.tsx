import { useState, useEffect } from "react";
import { Clock, CalendarDays } from "lucide-react";

const LiveClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

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
    year: "numeric",
  });

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-card/80 backdrop-blur-md border border-border rounded-lg px-4 py-2 flex items-center gap-3 text-xs font-mono">
      <div className="flex items-center gap-1.5 text-neon">
        <Clock size={12} />
        <span>{time}</span>
      </div>
      <div className="w-px h-4 bg-border" />
      <div className="flex items-center gap-1.5 text-muted-foreground">
        <CalendarDays size={12} />
        <span>{date}</span>
      </div>
    </div>
  );
};

export default LiveClock;
