import { Github, Linkedin } from "lucide-react";
import useClickSound from "@/hooks/useClickSound";

const Footer = () => {
  const playClick = useClickSound();

  return (
    <footer className="border-t border-border py-8 px-6 mb-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © 2026 <span className="text-neon">Xavier Varghese</span> — Built with passion for quality.
        </p>
        <div className="flex items-center gap-4">
          {[
            { Icon: Github, href: "https://github.com/xavier552" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/xavier-varghese-0b617624a" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="text-muted-foreground hover:text-neon transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
