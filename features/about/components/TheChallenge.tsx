import { FadeIn } from "@/components/ui/FadeIn";

export function TheChallenge() {
  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <FadeIn direction="up">
          <div className="bg-[var(--color-evergreen)] rounded-[2rem] p-10 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('/asset/logo-icon-section-background-pattern.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
            
            <div className="relative z-10">
              <span className="text-[var(--color-tiger-orange)] font-bold tracking-widest text-sm capitalize mb-8 block">
                If you&apos;ve got 5 seconds...
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight max-w-4xl">
                Ambition was never the problem.<br />Access was.
              </h2>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl font-medium">
                Despite possessing immense potential, Nigerian youth and women entrepreneurs frequently face systemic barriers to affordable finance, mentorship, and support structures needed to scale their businesses sustainably and competitively.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
