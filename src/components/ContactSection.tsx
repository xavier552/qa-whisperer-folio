import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, Linkedin, Github, CheckCircle } from "lucide-react";

const PlaneSendAnimation = ({ onComplete }: { onComplete: () => void }) => {
  return (
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
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [showSendAnimation, setShowSendAnimation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSendAnimation(true);
    setFormState({ name: "", email: "", message: "" });
  };

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <AnimatePresence>
        {showSendAnimation && (
          <PlaneSendAnimation onComplete={() => setShowSendAnimation(false)} />
        )}
      </AnimatePresence>

      <section id="contact" className="section-padding relative">
        <div className="max-w-4xl mx-auto" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-neon font-mono text-sm tracking-widest uppercase mb-2">Contact</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Have a project in mind or want to discuss QA strategies? I'm open to opportunities worldwide.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-10">
            <motion.form
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                value={formState.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-neon/50 transition-colors resize-none"
                required
              />
              <button
                type="submit"
                className="btn-press w-full bg-neon text-primary-foreground py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm"
              >
                <Send size={16} />
                Send Message
              </button>
            </motion.form>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-5"
            >
              <a
                href="mailto:xaviervarghese468@gmail.com"
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-card transition-colors group"
              >
                <div className="w-10 h-10 rounded-md bg-neon/10 flex items-center justify-center shrink-0">
                  <Mail className="text-neon" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium group-hover:text-neon transition-colors">Email</p>
                  <p className="text-sm text-muted-foreground break-all">xaviervarghese468@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-3">
                <div className="w-10 h-10 rounded-md bg-neon/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-neon" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">Kochi, Kerala, India</p>
                  <p className="text-xs text-muted-foreground">Open to Opportunities Worldwide</p>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Find me on</p>
                <div className="flex gap-3">
                  {[
                    { icon: Github, href: "https://github.com/xavier552", label: "GitHub" },
                    { icon: Linkedin, href: "https://www.linkedin.com/in/xavier-varghese-0b617624a", label: "LinkedIn" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-press w-10 h-10 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-neon hover:border-neon/50 transition-colors"
                    >
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
