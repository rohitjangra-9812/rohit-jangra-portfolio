import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroSection } from './components/HeroSection';
import { MarqueeRibbon } from './components/MarqueeRibbon';
import { AboutCredentialsSection } from './components/AboutCredentialsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#060911] text-slate-100 flex flex-col">
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MarqueeRibbon />
        <AboutCredentialsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
