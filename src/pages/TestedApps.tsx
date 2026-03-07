import { useEffect } from "react";
import { motion } from "framer-motion";
import { Smartphone, Apple, ShoppingBag } from "lucide-react";
import SubPageHeader from "@/components/SubPageHeader";

const testedApps = [
  "Sugar Cosmetics", "Westside", "House of Masaba", "Mcaffeine", "Chumbak",
  "Juicy Chemistry", "Kalki India", "The Face Shop", "Voyage Eyewear", "Zouk",
  "Amydus", "R For Rabbit", "Earth Rhythm", "Adil Qadri", "Blue Island",
  "Cyber Dog", "Kalki UK", "FNP Qatar", "FNP KSA", "JustLilThings",
  "Snooplay", "Tyaani", "Baby Forest", "Outzidr", "FYXX",
  "United Vintage", "Recode Studio", "Thrive.com", "Gritstones", "All Things Baby",
];

const TestedApps = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SubPageHeader />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-neon font-mono text-sm tracking-widest uppercase mb-3">
            Manual Testing Portfolio
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">30+ Tested Apps</h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
            Shopify-based mobile applications tested across Android & iOS platforms with comprehensive QA coverage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testedApps.map((app, i) => (
            <motion.div
              key={app}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03, duration: 0.4 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-card border border-border rounded-xl p-5 hover:border-neon/40 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0 group-hover:bg-neon/20 transition-colors">
                  <ShoppingBag className="text-neon" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm group-hover:text-neon transition-colors truncate">
                    {app}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Smartphone size={11} />
                      Android
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Apple size={11} />
                      iOS
                    </span>
                  </div>
                  <span className="inline-block mt-2 text-[10px] font-mono text-neon/70 bg-neon/5 px-2 py-0.5 rounded">
                    eCommerce
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestedApps;
