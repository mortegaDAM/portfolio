import Hero from "@/components/Hero";
import ProjectGallery from "@/components/ProjectGallery";
import TechStack from "@/components/TechStack";
import { ArrowRight } from "lucide-react";

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
                 <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1200&auto=format&fit=crop" className="w-[80%] h-[80%] object-cover opacity-[0.05] dark:opacity-[0.25] mix-blend-multiply dark:mix-blend-luminosity brightness-110 dark:brightness-50 grayscale dark:grayscale-0" style={{ maskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 10%, transparent 60%)" }} alt="Face" />
               </div>
               
               {/* Content */}
               <div className="relative z-10 flex flex-col items-center w-full">
                 <h4 className="text-foreground text-xs md:text-sm mb-3 font-medium tracking-wide">Next Project</h4>
                 <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">
                   NEXUS ANALYTICS
                 </h2>
                 <span className="text-accent-purple text-[9px] md:text-[10px] tracking-[0.4em] font-bold uppercase mb-12 drop-shadow-[0_0_15px_rgba(var(--accent-purple-rgb),0.5)]">SAAS / DASHBOARD</span>
                 
                 <div className="w-full flex justify-center relative items-center mt-2">
                   <button className="bg-transparent border border-foreground text-foreground px-8 py-3.5 rounded-full text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase hover:scale-105 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:bg-foreground dark:text-background dark:border-none dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300">
                     VIEW PROJECT
                   </button>
                   
                   {/* Right arrow button */}
                   <div className="absolute right-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center text-foreground/50 hover:bg-black/5 dark:hover:bg-white/10 hover:text-foreground transition-all duration-300 cursor-pointer mr-0 md:mr-4 shadow-sm dark:shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
                     <ArrowRight size={18} strokeWidth={1.5} />
                   </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] text-[#71717a] font-bold tracking-[0.2em] uppercase px-6 lg:px-12 gap-8 z-10">
           <span>© 2024 AURA NOIR. ALL RIGHTS RESERVED.</span>
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
