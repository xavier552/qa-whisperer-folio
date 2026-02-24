import { ArrowLeft, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SubPageHeader = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    const lastSection = sessionStorage.getItem("lastSection") || "home";
    navigate("/#" + lastSection);
  };

  const handleResumeClick = () => {
    navigate("/#resume");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-12">
        <button
          onClick={handleBackToHome}
          className="flex items-center gap-2 text-sm font-mono text-neon hover:opacity-80 transition-opacity"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>
        <button
          onClick={handleResumeClick}
          className="flex items-center gap-2 text-sm font-mono text-neon hover:opacity-80 transition-opacity"
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex items-center gap-1.5"
          >
            <FileText size={13} />
            Download Resume
          </motion.span>
        </button>
      </div>
    </div>
  );
};

export default SubPageHeader;
