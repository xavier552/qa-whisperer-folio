import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useClickSound from "@/hooks/useClickSound";

const WIN_MESSAGES = [
  "Great QA catches bugs before users do.",
  "Regression complete. Release approved.",
  "All critical defects resolved. Ship it.",
  "Production ready. Well tested.",
  "Zero critical bugs. Excellent validation.",
];

const LOSE_MESSAGES = [
  "Critical bug escaped to production.",
  "More test coverage needed.",
  "Edge cases were not validated.",
  "Regression testing incomplete.",
  "Test early. Test often.",
];

const CANVAS_W = 400;
const CANVAS_H = 600;
const PLAYER_W = 40;
const PLAYER_H = 30;
const BULLET_R = 3;
const BUG_SIZE = 28;

interface Bug {
  x: number;
  y: number;
  speed: number;
  type: number;
}

interface Bullet {
  x: number;
  y: number;
}

const BugHunt = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const playClick = useClickSound();
  const animRef = useRef<number>(0);
  const keysRef = useRef<Set<string>>(new Set());

  const [gameState, setGameState] = useState<"playing" | "win" | "lose">("playing");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [endMessage, setEndMessage] = useState("");
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("bughunt_highscore") || "0", 10);
  });

  const gameRef = useRef({
    playerX: CANVAS_W / 2 - PLAYER_W / 2,
    bullets: [] as Bullet[],
    bugs: [] as Bug[],
    score: 0,
    lives: 3,
    level: 1,
    spawnTimer: 0,
    bugsKilled: 0,
    gameState: "playing" as string,
    lastShot: 0,
  });

  const spawnBug = useCallback(() => {
    const g = gameRef.current;
    const speed = 1 + g.level * 0.5 + Math.random() * g.level * 0.3;
    g.bugs.push({
      x: Math.random() * (CANVAS_W - BUG_SIZE),
      y: -BUG_SIZE,
      speed,
      type: Math.floor(Math.random() * 4),
    });
  }, []);

  const resetGame = useCallback(() => {
    const g = gameRef.current;
    g.playerX = CANVAS_W / 2 - PLAYER_W / 2;
    g.bullets = [];
    g.bugs = [];
    g.score = 0;
    g.lives = 3;
    g.level = 1;
    g.spawnTimer = 0;
    g.bugsKilled = 0;
    g.gameState = "playing";
    g.lastShot = 0;
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState("playing");
  }, []);

  const shoot = useCallback(() => {
    const g = gameRef.current;
    const now = Date.now();
    if (now - g.lastShot < 200) return;
    g.lastShot = now;
    g.bullets.push({ x: g.playerX + PLAYER_W / 2, y: CANVAS_H - PLAYER_H - 10 });
  }, []);

  // Touch controls
  const moveLeft = useCallback(() => {
    gameRef.current.playerX = Math.max(0, gameRef.current.playerX - 20);
  }, []);
  const moveRight = useCallback(() => {
    gameRef.current.playerX = Math.min(CANVAS_W - PLAYER_W, gameRef.current.playerX + 20);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key.toLowerCase());
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        shoot();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current.delete(e.key.toLowerCase());
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [shoot]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const bugEmojis = ["🐛", "⚠️", "❌", "🐞"];

    const gameLoop = () => {
      const g = gameRef.current;
      if (g.gameState !== "playing") return;

      // Input
      const keys = keysRef.current;
      const speed = 5;
      if (keys.has("arrowleft") || keys.has("a")) g.playerX = Math.max(0, g.playerX - speed);
      if (keys.has("arrowright") || keys.has("d")) g.playerX = Math.min(CANVAS_W - PLAYER_W, g.playerX + speed);

      // Spawn
      g.spawnTimer++;
      const spawnRate = Math.max(20, 60 - g.level * 8);
      if (g.spawnTimer >= spawnRate) {
        spawnBug();
        g.spawnTimer = 0;
      }

      // Update bullets
      g.bullets = g.bullets.filter((b) => {
        b.y -= 8;
        return b.y > -10;
      });

      // Update bugs
      g.bugs = g.bugs.filter((bug) => {
        bug.y += bug.speed;
        if (bug.y > CANVAS_H) {
          g.lives--;
          setLives(g.lives);
          if (g.lives <= 0) {
            g.gameState = "lose";
            const msg = LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)];
            setEndMessage(msg);
            setGameState("lose");
            if (g.score > highScore) {
              setHighScore(g.score);
              localStorage.setItem("bughunt_highscore", g.score.toString());
            }
          }
          return false;
        }
        return true;
      });

      // Collision detection
      g.bugs = g.bugs.filter((bug) => {
        for (let i = g.bullets.length - 1; i >= 0; i--) {
          const b = g.bullets[i];
          if (
            b.x > bug.x &&
            b.x < bug.x + BUG_SIZE &&
            b.y > bug.y &&
            b.y < bug.y + BUG_SIZE
          ) {
            g.bullets.splice(i, 1);
            g.score += 10 * g.level;
            g.bugsKilled++;
            setScore(g.score);
            // Level up every 10 kills
            if (g.bugsKilled % 10 === 0) {
              g.level++;
              setLevel(g.level);
              if (g.level > 5) {
                g.gameState = "win";
                const msg = WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)];
                setEndMessage(msg);
                setGameState("win");
                if (g.score > highScore) {
                  setHighScore(g.score);
                  localStorage.setItem("bughunt_highscore", g.score.toString());
                }
              }
            }
            return false;
          }
        }
        return true;
      });

      // Draw
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Background grid
      ctx.strokeStyle = "hsla(72, 100%, 50%, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i < CANVAS_W; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, CANVAS_H);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_H; i += 40) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(CANVAS_W, i);
        ctx.stroke();
      }

      // Player (crosshair ship)
      const px = g.playerX;
      const py = CANVAS_H - PLAYER_H - 10;
      ctx.fillStyle = "hsl(72, 100%, 50%)";
      ctx.beginPath();
      ctx.moveTo(px + PLAYER_W / 2, py);
      ctx.lineTo(px + PLAYER_W, py + PLAYER_H);
      ctx.lineTo(px, py + PLAYER_H);
      ctx.closePath();
      ctx.fill();
      ctx.shadowColor = "hsl(72, 100%, 50%)";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Bullets
      ctx.fillStyle = "hsl(72, 100%, 50%)";
      g.bullets.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, BULLET_R, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowColor = "hsl(72, 100%, 50%)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Bugs
      ctx.font = `${BUG_SIZE}px serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      g.bugs.forEach((bug) => {
        ctx.fillText(bugEmojis[bug.type], bug.x + BUG_SIZE / 2, bug.y + BUG_SIZE / 2);
      });

      animRef.current = requestAnimationFrame(gameLoop);
    };

    animRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animRef.current);
  }, [spawnBug, highScore]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => { playClick(); navigate("/"); }}
            className="text-muted-foreground hover:text-neon transition-colors flex items-center gap-1 text-sm"
          >
            <ArrowLeft size={16} /> Back to Portfolio
          </button>
          <span className="text-xs text-muted-foreground font-mono">High Score: {highScore}</span>
        </div>

        <div className="flex items-center justify-between mb-3 text-sm font-mono">
          <span className="text-neon">Score: {score}</span>
          <span className="text-foreground">Level {level}</span>
          <span className="text-destructive">
            {"❤️".repeat(lives)}{"🖤".repeat(Math.max(0, 3 - lives))}
          </span>
        </div>

        <div className="relative border border-border rounded-lg overflow-hidden mx-auto" style={{ width: CANVAS_W, maxWidth: "100%" }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="bg-background block w-full"
            style={{ aspectRatio: `${CANVAS_W}/${CANVAS_H}` }}
            onClick={shoot}
          />

          <AnimatePresence>
            {gameState !== "playing" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-background/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center"
              >
                <p className="text-4xl mb-2">{gameState === "win" ? "🏆" : "💥"}</p>
                <h3 className="text-2xl font-bold mb-2">
                  {gameState === "win" ? "Victory!" : "Game Over"}
                </h3>
                <p className="text-neon text-xl font-bold mb-2">Final Score: {score}</p>
                <p className="text-sm text-muted-foreground italic mb-6 max-w-xs">
                  "{endMessage}"
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => { playClick(); resetGame(); }}
                    className="bg-neon text-primary-foreground px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-opacity text-sm"
                  >
                    Play Again
                  </button>
                  <button
                    onClick={() => { playClick(); navigate("/"); }}
                    className="border border-border text-muted-foreground px-6 py-2.5 rounded-md font-medium hover:border-neon hover:text-neon transition-all text-sm"
                  >
                    Back to Portfolio
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile touch controls */}
        <div className="flex items-center justify-between mt-4 md:hidden">
          <button
            onTouchStart={(e) => { e.preventDefault(); moveLeft(); }}
            onClick={moveLeft}
            className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center active:border-neon active:text-neon transition-colors"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); shoot(); }}
            onClick={shoot}
            className="w-20 h-20 bg-neon/10 border-2 border-neon rounded-full flex items-center justify-center text-neon active:bg-neon active:text-primary-foreground transition-colors"
          >
            <Crosshair size={28} />
          </button>
          <button
            onTouchStart={(e) => { e.preventDefault(); moveRight(); }}
            onClick={moveRight}
            className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center active:border-neon active:text-neon transition-colors"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4 hidden md:block">
          ← → or A/D to move • Space to shoot
        </p>
      </div>
    </div>
  );
};

export default BugHunt;
