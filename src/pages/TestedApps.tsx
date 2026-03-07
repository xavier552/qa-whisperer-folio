import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, Apple, ShoppingBag, X, Layers } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";

type AppEntry = {
  name: string;
  android: boolean;
  ios: boolean;
};

const confirmedBoth: string[] = [
  "Med7 Online", "Kalki India", "Lea Clothing Co", "FNP KSA", "FNP Qatar",
  "Juicy Chemistry", "Toffe Coffee Roasters", "Adore by Priyanka", "House of Masaba",
  "Itsy Bitsy", "Nuskhe by Paras", "All Things Baby", "Voyage Eyewear", "Adil Qadri",
  "Earth Rhythm", "Kalki UK", "Halamama", "R For Rabbit", "Thrive", "Yallamomz",
  "Sugar Cosmetics", "Outzidr", "Blue Island", "Recode Studio", "FYXX",
  "United Vintage", "Dudes Boutique", "TKMC", "Baby Forest", "Blue Spinach",
];

const androidOnly: string[] = [
  "Zouk", "Westside", "The Face Shop", "The Better Flour", "Star Delite",
  "Preethi Shapewear", "Amydus", "Jai Bros", "Mcaffeine", "Gritstones",
  "Cyber Dog", "Tyaani", "Unniyarcha", "JustLilThings", "Maverick Tattoo",
];

const needsVerification: string[] = [
  "Fashor", "Trendia", "Koskii", "Levi's India", "Avimee Herbal", "Aristobrat",
  "Studd Muffyn", "Loolia Closet Lebanon", "Loolia Closet Egypt", "Loolia Closet Jordan",
  "SohatiCare Lebanon", "SohatiCare Egypt", "SohatiCare Jordan", "Nursery Live",
  "Care n Cure", "Sportpodium", "Farm Shop", "Anveshan", "Faces Canada",
  "Sri Sri Tattva", "Boat",
];

const allApps: AppEntry[] = [
  ...confirmedBoth.map((name) => ({ name, android: true, ios: true })),
  ...androidOnly.map((name) => ({ name, android: true, ios: false })),
  ...needsVerification.map((name) => ({ name, android: true, ios: false })),
];

const getInitials = (name: string) => {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
};

const AppCard = ({ app, index }: { app: AppEntry; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.02 * index, duration: 0.4 }}
    whileHover={{ y: -4, transition: { duration: 0.2 } }}
    className="bg-card border border-border rounded-xl p-4 hover:border-neon/40 transition-colors group"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors text-neon font-bold text-xs">
        {getInitials(app.name)}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm group-hover:text-neon transition-colors truncate">
          {app.name}
        </h3>
        <div className="flex items-center gap-3 mt-1">
          <span className="inline-flex items-center gap-1 text-[11px] text-neon/80">
            <Smartphone size={10} />
            Android ✓
          </span>
          {app.ios && (
            <span className="inline-flex items-center gap-1 text-[11px] text-neon/80">
              <Apple size={10} />
              iOS ✓
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const TestedApps = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Manual Testing Portfolio
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">Tested Apps</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Shopify-based mobile applications tested across Android & iOS platforms with comprehensive QA coverage.
          </p>
        </motion.div>

        {/* Appmaker Projects Block */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="w-full bg-card border border-border rounded-2xl p-8 text-left hover:border-neon/50 transition-all group cursor-pointer mb-8"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center group-hover:bg-neon/20 transition-colors">
              <Layers className="text-neon" size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold group-hover:text-neon transition-colors">Appmaker Projects</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Tested mobile apps built using Appmaker platform — {allApps.length} apps
              </p>
            </div>
            <ShoppingBag className="text-neon/40 ml-auto group-hover:text-neon transition-colors" size={24} />
          </div>
        </motion.button>

        {/* 3D Animated Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-background/85 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />

              {/* Modal */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, rotateX: 8 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.9, opacity: 0, rotateX: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
                className="relative bg-card border border-border rounded-[20px] w-[85%] max-w-6xl h-[80vh] flex flex-col overflow-hidden z-10"
                style={{ perspective: "1200px" }}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
                  <div>
                    <h2 className="text-xl font-bold">Appmaker Projects</h2>
                    <p className="text-sm text-muted-foreground mt-1">{allApps.length} tested applications</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Scrollable Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {allApps.map((app, i) => (
                      <AppCard key={app.name} app={app} index={i} />
                    ))}
                  </div>
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
