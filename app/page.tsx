import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import TechStack from "@/components/TechStack";
import { Mail } from "lucide-react";

export default function Home() {
  return (
    <main className="w-full relative flex flex-col items-center bg-transparent z-10">
      <Hero />
      <ProjectGallery />
      <TechStack />

      {/* Footer / CTA Section */}
      <footer id="contact" className="w-full pt-16 pb-12 px-4 flex flex-col items-center justify-center relative overflow-hidden z-20">

        {/* Background glow for the card */}
        <div className="absolute top-1/2 left-[15%] -translate-y-[40%] w-[350px] h-[350px] bg-accent-purple/20 blur-[80px] rounded-full pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen dark:bg-accent-purple/15" />
        <div className="absolute top-1/2 right-[15%] -translate-y-[60%] w-[350px] h-[350px] bg-accent-cyan/20 blur-[80px] rounded-full pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen dark:bg-accent-cyan/15" />

        <div className="relative w-full max-w-5xl rounded-[2.5rem] p-[1px] bg-gradient-to-br from-accent-purple/25 via-white/10 to-accent-cyan/25 dark:from-accent-cyan/30 dark:via-white/5 dark:to-accent-purple/30 mb-16 shadow-[0_20px_60px_rgba(124,92,191,0.12)] dark:shadow-[0_30px_80px_rgba(168,85,247,0.15)] z-10">

          {/* Outer GAP layer */}
          <div className="w-full h-full bg-white/50 dark:bg-[#030305] backdrop-blur-3xl rounded-[2.5rem] p-2.5 md:p-4 flex flex-col items-center justify-center relative shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.02)]">

            {/* Inner FRAME layer */}
            <div className="w-full h-full bg-white/70 dark:bg-[#07070a] rounded-[2rem] p-12 md:p-20 flex flex-col items-center justify-center text-center relative overflow-hidden border border-white/90 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_8px_32px_rgba(124,92,191,0.08)] dark:shadow-[inset_0_40px_100px_rgba(0,0,0,0.8)] backdrop-blur-sm">

              {/* Corner glass reflection inside */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-accent-cyan/20 rounded-full blur-[50px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-accent-purple/20 rounded-full blur-[50px] pointer-events-none z-0 mix-blend-multiply dark:mix-blend-screen" />

              {/* Abstract Face image inside card */}
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img src="/Mario.jpeg" className="w-full h-full object-cover object-[center_62%] opacity-[0.15] dark:opacity-[0.15] mix-blend-multiply dark:mix-blend-luminosity grayscale" style={{ maskImage: "radial-gradient(circle at center, black 30%, transparent 85%)", WebkitMaskImage: "radial-gradient(circle at center, black 30%, transparent 85%)" }} alt="Mario" />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center w-full">
                <h4 className="text-accent-cyan text-[10px] md:text-xs mb-4 font-bold tracking-[0.2em] uppercase">What's Next?</h4>
                <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tighter mb-6 text-foreground text-center leading-[1.1]">
                  LET'S BUILD SOMETHING <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-cyan">EXTRAORDINARY</span>
                </h2>
                <p className="text-muted text-sm md:text-base max-w-xl text-center mb-12">
                  Whether you have a project in mind, need a Full Stack Developer for your team, or just want to say hi, my inbox is always open.
                </p>

                <div className="w-full flex justify-center relative items-center mt-2">
                  <a href="mailto:mario98.mo@gmail.com" className="bg-foreground text-background font-bold px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center gap-3">
                    GET IN TOUCH <Mail size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] text-[#71717a] font-bold tracking-[0.2em] uppercase px-6 lg:px-12 gap-8 z-10">
          <span>© 2026 MARIO ORTEGA. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
            <span className="hover:text-white cursor-pointer transition-colors">TERMS</span>
            <span className="hover:text-white cursor-pointer transition-colors">SITEMAP</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
