import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo, useEffect } from "react";
import { Mail, Send, Linkedin, Github, CheckCircle, Calendar, Clock, ChevronLeft, ChevronRight, X, MapPin, CloudSun } from "lucide-react";
import { format, addDays, isBefore, startOfDay } from "date-fns";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "Website",
  "Design System",
  "Others",
];

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM",
];

const PlaneSendAnimation = ({ onComplete }: { onComplete: () => void }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="text-center">
      <motion.div
        initial={{ x: -100, y: 50, opacity: 0, rotate: -10 }}
        animate={{
          x: [-100, 0, 0, 200],
          y: [50, 0, -10, -80],
          opacity: [0, 1, 1, 0],
          rotate: [-10, 0, 0, -20],
        }}
        transition={{ duration: 2, ease: "easeInOut" }}
        onAnimationComplete={onComplete}
        className="text-5xl mb-4"
      >
        <Send className="text-neon" size={48} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col items-center gap-2"
      >
        <CheckCircle className="text-neon" size={32} />
        <p className="text-lg font-semibold">Message Sent!</p>
        <p className="text-sm text-muted-foreground">I'll get back to you soon.</p>
      </motion.div>
    </div>
  </motion.div>
);

const EmailIcon = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center shrink-0 cursor-pointer overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div key="default" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
              <Mail className="text-neon" size={20} />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="hover" initial={{ opacity: 0, scale: 0.5, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.5 }} transition={{ type: "spring", stiffness: 400, damping: 15 }} className="relative">
            <motion.div animate={{ y: [0, -2, 0], filter: ["drop-shadow(0 0 4px hsl(72 100% 50% / 0.4))", "drop-shadow(0 0 12px hsl(72 100% 50% / 0.7))", "drop-shadow(0 0 4px hsl(72 100% 50% / 0.4))"] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
              <Mail className="text-neon" size={22} />
            </motion.div>
            <motion.div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-neon" initial={{ scale: 0 }} animate={{ scale: [0, 1.2, 1] }} transition={{ delay: 0.15, duration: 0.3 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Mini Calendar ─── */
const MiniCalendar = ({ selectedDate, onSelect }: { selectedDate: Date | null; onSelect: (d: Date) => void }) => {
  const [viewMonth, setViewMonth] = useState(() => addDays(new Date(), 1));
  const minDate = startOfDay(addDays(new Date(), 1));
  const year = viewMonth.getFullYear();
  const month = viewMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(d);
    return arr;
  }, [firstDay, daysInMonth]);
  const canGoPrev = new Date(year, month, 1) > minDate;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => setViewMonth(new Date(year, month - 1, 1))} disabled={!canGoPrev} className="p-1 rounded hover:bg-secondary disabled:opacity-30 transition-colors"><ChevronLeft size={16} /></button>
        <span className="text-sm font-medium">{format(viewMonth, "MMMM yyyy")}</span>
        <button type="button" onClick={() => setViewMonth(new Date(year, month + 1, 1))} className="p-1 rounded hover:bg-secondary transition-colors"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => <span key={d} className="py-1">{d}</span>)}
        {days.map((day, i) => {
          if (day === null) return <span key={`e-${i}`} />;
          const date = new Date(year, month, day);
          const disabled = isBefore(date, minDate);
          const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
          return (
            <button key={day} type="button" disabled={disabled} onClick={() => onSelect(date)}
              className={`py-1.5 rounded text-xs transition-colors ${disabled ? "text-muted-foreground/30 cursor-not-allowed" : isSelected ? "bg-neon text-primary-foreground font-semibold" : "hover:bg-secondary text-foreground"}`}
            >{day}</button>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Typing Text ─── */
const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return <span>{displayed}<span className="animate-pulse">|</span></span>;
};

/* ─── Weather Codes ─── */
const weatherCodes: Record<number, string> = {
  0: "Clear sky", 1: "Mainly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Foggy", 48: "Rime fog", 51: "Light drizzle", 53: "Moderate drizzle",
  55: "Dense drizzle", 61: "Slight rain", 63: "Moderate rain", 65: "Heavy rain",
  71: "Slight snow", 73: "Moderate snow", 75: "Heavy snow", 80: "Slight showers",
  81: "Moderate showers", 82: "Violent showers", 95: "Thunderstorm",
};

type WeatherData = { temp: number; desc: string; pressure: number; humidity: number };

const fetchWeather = (lat: number, lon: number): Promise<WeatherData> =>
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,weather_code&timezone=auto`)
    .then(r => r.json())
    .then(data => ({
      temp: data.current.temperature_2m,
      desc: weatherCodes[data.current.weather_code] || "Unknown",
      pressure: Math.round(data.current.surface_pressure),
      humidity: data.current.relative_humidity_2m,
    }));

/* ─── Weather Block ─── */
const WeatherBlock = () => {
  const [kochiWeather, setKochiWeather] = useState<WeatherData | null>(null);
  const [userWeather, setUserWeather] = useState<WeatherData | null>(null);
  const [userLocation, setUserLocation] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [loadingGeo, setLoadingGeo] = useState(false);

  useEffect(() => {
    fetchWeather(9.9312, 76.2673).then(setKochiWeather).catch(() => {});
  }, []);

  const handleGeoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userWeather) {
      setShowUser(v => !v);
      return;
    }
    if (!navigator.geolocation) {
      setGeoError("Geolocation not supported");
      return;
    }
    setLoadingGeo(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const [weather, geoRes] = await Promise.all([
            fetchWeather(latitude, longitude),
            fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
              .then(r => r.json()).catch(() => null),
          ]);
          setUserWeather(weather);
          setUserLocation(geoRes?.city || geoRes?.locality || `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
          setShowUser(true);
        } catch {
          setGeoError("Failed to fetch weather");
        } finally {
          setLoadingGeo(false);
        }
      },
      () => {
        setGeoError("Location permission denied");
        setLoadingGeo(false);
      },
      { timeout: 10000 }
    );
  };

  const displayWeather = showUser && userWeather ? userWeather : kochiWeather;
  const displayLabel = showUser && userLocation ? userLocation : "Kochi";

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setShowUser(false); }}
    >
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors group cursor-pointer">
        <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center shrink-0 relative">
          <MapPin className="text-neon" size={20} />
          <motion.div
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-neon/80"
            animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0.4, 0.8] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium group-hover:text-neon transition-colors">Location</p>
          <p className="text-xs text-muted-foreground">Kochi, India</p>
        </div>
        <button
          onClick={handleGeoClick}
          className="p-2 rounded-lg hover:bg-neon/10 transition-colors text-muted-foreground hover:text-neon"
          title="Show your local weather"
        >
          {loadingGeo ? (
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <CloudSun size={16} />
            </motion.div>
          ) : (
            <CloudSun size={16} />
          )}
        </button>
      </div>

      {geoError && (
        <p className="text-xs text-destructive px-3 pb-2">{geoError}</p>
      )}

      {/* Weather hover/click preview */}
      <AnimatePresence>
        {isHovered && displayWeather && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 z-30 bg-card/90 backdrop-blur-xl border border-border rounded-xl p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-mono text-neon tracking-wider">
                <TypingText text={`${displayLabel} Today`} />
              </p>
              {showUser && (
                <span className="text-[9px] font-mono text-neon/60 bg-neon/10 px-1.5 py-0.5 rounded">Your Location</span>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold">
                <TypingText text={`${displayWeather.temp}°C`} delay={200} />
              </p>
              <p className="text-sm text-muted-foreground">
                <TypingText text={displayWeather.desc} delay={400} />
              </p>
              <div className="border-t border-border pt-2 mt-2 space-y-1">
                <p className="text-xs text-muted-foreground">
                  <TypingText text={`Pressure: ${displayWeather.pressure} hPa`} delay={600} />
                </p>
                <p className="text-xs text-muted-foreground">
                  <TypingText text={`Humidity: ${displayWeather.humidity}%`} delay={800} />
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Meeting Scheduler ─── */
const MeetingScheduler = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelMsg, setShowCancelMsg] = useState(false);

  const handleSlotSelected = () => {
    if (selectedDate && selectedTime) setShowEmailModal(true);
  };

  const handleEmailSubmit = () => {
    if (!email) { setEmailError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setEmailError("Invalid email address"); return; }
    setEmailError("");
    
    // Send booking notification via mailto
    const subject = encodeURIComponent(`Meeting Booking - ${format(selectedDate!, "PPP")} at ${selectedTime}`);
    const body = encodeURIComponent(`New meeting booking:\n\nDate: ${format(selectedDate!, "PPP")}\nTime: ${selectedTime}\nEmail: ${email}`);
    window.open(`mailto:xaviervarghese468@gmail.com?subject=${subject}&body=${body}`, "_blank");
    
    setShowEmailModal(false);
    setShowConfirmation(true);
    setTimeout(() => { setShowConfirmation(false); setIsOpen(false); setSelectedDate(null); setSelectedTime(null); setEmail(""); }, 3000);
  };

  const handleEmailCancel = () => {
    setShowEmailModal(false);
    setShowCancelMsg(true);
    setTimeout(() => { setShowCancelMsg(false); setIsOpen(false); setSelectedDate(null); setSelectedTime(null); setEmail(""); }, 2000);
  };

  const handleBookingCancel = () => {
    setIsOpen(false); setSelectedDate(null); setSelectedTime(null); setEmail("");
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors group text-left">
        <div className="w-12 h-12 rounded-lg bg-neon/10 flex items-center justify-center shrink-0">
          <Calendar className="text-neon" size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold group-hover:text-neon transition-colors">Let's Talk</p>
          <p className="text-xs text-muted-foreground">Schedule a Call or Meeting</p>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={handleBookingCancel} />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="relative z-10 bg-card border border-border rounded-2xl w-full max-w-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-neon/10 flex items-center justify-center"><Calendar className="text-neon" size={18} /></div>
                  <div><p className="text-sm font-semibold">Let's Talk</p><p className="text-xs text-muted-foreground">Pick a date & time</p></div>
                </div>
                <button onClick={handleBookingCancel} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"><X size={14} /></button>
              </div>

              <AnimatePresence mode="wait">
                {showConfirmation ? (
                  <motion.div key="confirmed" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-8 space-y-3">
                    <CheckCircle className="text-neon mx-auto" size={36} />
                    <p className="text-sm font-medium">I typically respond within 12-24 hours.</p>
                  </motion.div>
                ) : showCancelMsg ? (
                  <motion.div key="cancelled" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-8 space-y-3">
                    <p className="text-sm text-muted-foreground">Booking cancelled. See you next time!</p>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="space-y-4">
                    <MiniCalendar selectedDate={selectedDate} onSelect={setSelectedDate} />
                    {selectedDate && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><Clock size={12} /> Available slots for {format(selectedDate, "MMM d")}</p>
                        <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                          {TIME_SLOTS.map((slot) => (
                            <button key={slot} type="button" onClick={() => setSelectedTime(slot)}
                              className={`text-xs py-2 px-3 rounded-md border transition-colors ${selectedTime === slot ? "border-neon bg-neon/10 text-neon font-medium" : "border-border hover:border-neon/30 text-muted-foreground"}`}
                            >{slot}</button>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-3">
                          <button type="button" onClick={handleBookingCancel} className="flex-1 py-2.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:border-neon/30 transition-colors">Cancel</button>
                          <button type="button" onClick={handleSlotSelected} disabled={!selectedTime} className="flex-1 bg-neon text-primary-foreground py-2.5 rounded-md text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                            <Calendar size={14} /> Continue
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEmailModal && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative z-10 bg-card border border-border rounded-xl w-full max-w-sm p-6 space-y-4">
              <h3 className="text-sm font-semibold">Enter your email</h3>
              <p className="text-xs text-muted-foreground">
                {selectedDate && selectedTime && <>Booking for {format(selectedDate, "PPP")} at {selectedTime}</>}
              </p>
              <div>
                <input type="email" placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  className={`w-full bg-background border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${emailError ? "border-destructive" : "border-border focus:border-neon/50"}`}
                />
                {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
              </div>
              <div className="flex gap-3">
                <button onClick={handleEmailCancel} className="flex-1 py-2.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:border-neon/30 transition-colors">Cancel</button>
                <button onClick={handleEmailSubmit} disabled={!email} className="flex-1 bg-neon text-primary-foreground py-2.5 rounded-md text-sm font-medium disabled:opacity-40 hover:opacity-90 transition-opacity">Submit</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ─── Main Section ─── */
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", company: "", projectType: "", message: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showSendAnimation, setShowSendAnimation] = useState(false);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formState.name.trim()) errors.name = "Name is required";
    if (!formState.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) errors.email = "Invalid email address";
    if (!formState.message.trim()) errors.message = "Message is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Send via mailto
    const subject = encodeURIComponent(`Portfolio Contact: ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nCompany: ${formState.company || "N/A"}\nProject Type: ${formState.projectType || "N/A"}\n\nMessage:\n${formState.message}`
    );
    window.open(`mailto:xaviervarghese468@gmail.com?subject=${subject}&body=${body}`, "_blank");

    setShowSendAnimation(true);
    setFormState({ name: "", email: "", company: "", projectType: "", message: "" });
    setFormErrors({});
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const inputClass = "w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors";
  const errorInputClass = "w-full bg-card border border-destructive rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-destructive transition-colors";

  return (
    <>
      <AnimatePresence>
        {showSendAnimation && <PlaneSendAnimation onComplete={() => setShowSendAnimation(false)} />}
      </AnimatePresence>

      <section id="contact" className="section-padding relative">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
            <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">Have a project in mind or want to discuss QA strategies? I'm open to opportunities worldwide.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.form initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input type="text" placeholder="Your Full Name" value={formState.name} onChange={(e) => handleChange("name", e.target.value)} className={formErrors.name ? errorInputClass : inputClass} />
                {formErrors.name && <p className="text-xs text-destructive mt-1">{formErrors.name}</p>}
              </div>
              <div>
                <input type="email" placeholder="you@email.com" value={formState.email} onChange={(e) => handleChange("email", e.target.value)} className={formErrors.email ? errorInputClass : inputClass} />
                {formErrors.email && <p className="text-xs text-destructive mt-1">{formErrors.email}</p>}
              </div>
              <input type="text" placeholder="Your company (optional)" value={formState.company} onChange={(e) => handleChange("company", e.target.value)} className={inputClass} />
              <div className="relative">
                <select value={formState.projectType} onChange={(e) => handleChange("projectType", e.target.value)} className={`${inputClass} appearance-none cursor-pointer ${!formState.projectType ? "text-muted-foreground" : ""}`}>
                  <option value="" disabled>Select Project Type</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none" />
              </div>
              <div>
                <textarea placeholder="Your Message" rows={4} value={formState.message} onChange={(e) => handleChange("message", e.target.value)} className={`${formErrors.message ? errorInputClass : inputClass} resize-none`} />
                {formErrors.message && <p className="text-xs text-destructive mt-1">{formErrors.message}</p>}
              </div>
              <button type="submit" className="btn-press w-full bg-neon text-primary-foreground py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm">
                <Send size={16} /> Send Message
              </button>
            </motion.form>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }} className="space-y-5">
              <a href="mailto:xaviervarghese468@gmail.com" className="flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors group">
                <EmailIcon />
                <div>
                  <p className="text-sm font-medium group-hover:text-neon transition-colors">Email</p>
                  <p className="text-sm text-muted-foreground break-all">xaviervarghese468@gmail.com</p>
                </div>
              </a>

              <MeetingScheduler />

              <WeatherBlock />

              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Find me on</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/xavier552", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/xavier-varghese-0b617624a", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="btn-press w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-colors">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
