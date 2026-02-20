import { useNavigate } from "react-router-dom";
import { Bug } from "lucide-react";

const BugHuntSection = () => {
  const navigate = useNavigate();

  return (
    <section id="bughunt" className="py-12 px-6 md:px-12 lg:px-20 relative border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted-foreground text-sm">
          Think you can catch bugs like a QA engineer?
        </p>
        <button
          onClick={() => navigate("/bug-hunt")}
          className="btn-press inline-flex items-center gap-2 text-sm text-neon hover:text-foreground transition-colors font-mono group"
        >
          <Bug size={14} className="group-hover:animate-pulse" />
          Play the QA Game
          <span className="text-muted-foreground group-hover:text-neon transition-colors">→</span>
        </button>
      </div>
    </section>
  );
};

export default BugHuntSection;
