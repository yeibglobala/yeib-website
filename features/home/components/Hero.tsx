import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero({ isActive = true }: { isActive?: boolean }) {
  // If we're using framer-motion and this is inside a carousel (if isActive is used that way),
  // we can use AnimatePresence or just animate based on isActive.
  // Actually, since this is the main hero, let's just trigger based on isActive.

  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/asset/hero-section-background-pattern.png")' }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white max-w-[940px] flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
        >
          <h1 className="mb-8 md:mb-12 font-asul text-4xl sm:text-5xl md:text-6xl lg:text-[72px] leading-[1.2] md:leading-[1.1] font-bold text-white drop-shadow-md">
            The Institutional Bridge Between Capital and Ambition
          </h1>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/apply" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-[var(--color-tiger-orange)] text-white hover:bg-[var(--color-tiger-orange)]/90 hover:scale-105 transition-all shadow-xl border border-[var(--color-tiger-orange)]">
              Apply for Funding
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10 hover:scale-105 transition-all">
              Read Our Approach
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
