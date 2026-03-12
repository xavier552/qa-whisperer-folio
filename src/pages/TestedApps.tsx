import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Layers, LayoutGrid, List, ExternalLink } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";
import FadeInUp from "@/components/FadeInUp";

type AppEntry = {
  name: string;
};

const allApps: AppEntry[] = [
  "Sugar Cosmetics", "Westside", "House of Masaba", "Mcaffeine", "Juicy Chemistry",
  "Kalki India", "The Face Shop", "Voyage Eyewear", "Zouk", "Amydus",
  "R For Rabbit", "Earth Rhythm", "Adil Qadri", "Blue Island", "Cyber Dog",
  "Kalki UK", "FNP Qatar", "FNP KSA", "JustLilThings", "Tyaani",
  "Baby Forest", "Outzidr", "FYXX", "United Vintage", "Recode Studio",
  "Thrive", "Gritstones", "All Things Baby", "Med7 Online", "Lea Clothing Co",
  "Toffe Coffee Roasters", "Adore by Priyanka", "Itsy Bitsy", "Nuskhe by Paras",
  "Halamama", "Yallamomz", "Dudes Boutique", "TKMC", "Blue Spinach",
  "The Better Flour", "Star Delite", "Preethi Shapewear", "Jai Bros",
  "Unniyarcha", "Maverick Tattoo", "Fashor", "Trendia", "Koskii",
  "Levi's India", "Avimee Herbal", "Aristobrat", "Studd Muffyn",
  "Loolia Closet Lebanon", "Loolia Closet Egypt", "Loolia Closet Jordan",
  "SohatiCare Lebanon", "SohatiCare Egypt", "SohatiCare Jordan",
  "Nursery Live", "Care n Cure", "Sportpodium", "Farm Shop", "Anveshan",
  "Faces Canada", "Sri Sri Tattva", "Boat",
].map((name) => ({ name }));

const getInitials = (name: string) =>
  name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();

const AppCardGrid = ({ app, index }: { app: AppEntry; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.02 * index, duration: 0.4 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-card border border-border rounded-xl p-4 hover:border-neon/40 transition-colors group flex flex-col items-center text-center gap-3"
  >
    <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors text-neon font-bold text-sm">
      {getInitials(app.name)}
    </div>
    <h3 className="font-semibold text-sm group-hover:text-neon transition-colors leading-tight">
      {app.name}
    </h3>
  </motion.div>
);

const AppCardList = ({ app, index }: { app: AppEntry; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.02 * index, duration: 0.3 }}
    className="bg-card border border-border rounded-lg px-4 py-3 hover:border-neon/40 transition-colors group flex items-center gap-3"
  >
    <div className="w-9 h-9 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors text-neon font-bold text-xs">
      {getInitials(app.name)}
    </div>
    <h3 className="font-semibold text-sm group-hover:text-neon transition-colors">
      {app.name}
    </h3>
  </motion.div>
);

const TestedApps = () => {
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = allApps.filter((app) =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-20">
        <FadeInUp className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Inside the QA Lab</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            A collection of real-world applications and platforms I have tested while ensuring stability, usability, and product quality.
          </p>
        </FadeInUp>

        {/* Appmaker Works Block */}
        <FadeInUp delay={0.2}>
          <motion.button
            whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowModal(true)}
            className="w-full bg-card border border-border rounded-2xl p-8 text-left hover:border-neon/50 transition-all group cursor-pointer mb-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
                <Layers className="text-neon" size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-bold group-hover:text-neon transition-colors">
                  <a
                    href="https://appmaker.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hover:underline inline-flex items-center gap-1.5"
                  >
                    Appmaker
                    <ExternalLink size={14} className="opacity-50" />
                  </a>{" "}
                  Works
                </h2>
                <p className="text-sm text-muted-foreground mt-1 max-w-xl">
                  Mobile applications built using the Appmaker platform that I have tested across Android and iOS devices, ensuring functionality, usability, and release quality.
                </p>
              </div>
            </div>
          </motion.button>
        </FadeInUp>

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              <motion.div className="absolute inset-0 bg-background/85 backdrop-blur-md" />
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 8 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateX: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-card border border-border rounded-[20px] w-[85%] max-w-6xl h-[80vh] flex flex-col overflow-hidden z-10"
              >
                <div className="flex flex-col gap-4 p-6 border-b border-border shrink-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold">Appmaker Works</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        60+ applications tested across Android and iOS platforms.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors shrink-0"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Search apps..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted/50 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                      />
                    </div>
                    <div className="flex gap-1 border border-border rounded-lg p-0.5 shrink-0">
                      <button
                        onClick={() => setView("grid")}
                        className={`p-2 rounded-md transition-colors ${view === "grid" ? "bg-neon/10 text-neon" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <LayoutGrid size={16} />
                      </button>
                      <button
                        onClick={() => setView("list")}
                        className={`p-2 rounded-md transition-colors ${view === "list" ? "bg-neon/10 text-neon" : "text-muted-foreground hover:text-foreground"}`}
                      >
                        <List size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  {filtered.length === 0 ? (
                    <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                      No apps found matching "{search}"
                    </div>
                  ) : view === "grid" ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filtered.map((app, i) => (
                        <AppCardGrid key={app.name} app={app} index={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {filtered.map((app, i) => (
                        <AppCardList key={app.name} app={app} index={i} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestedApps;
