import { Navigation } from '@/components/Navigation';
import { ContactSidebar } from '@/components/ContactSidebar';
import { PageOverlay } from '@/components/PageOverlay';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { WorkExperience } from '@/sections/WorkExperience';
import { Skills } from '@/sections/Skills';
import { Achievements } from '@/sections/Achievements';
import { Portfolio } from '@/sections/Portfolio';
import { Publications } from '@/sections/Publications';
import { Education } from '@/sections/Education';
import { Documents } from '@/sections/Documents';
import { Footer } from '@/sections/Footer';
import { usePageLoad } from '@/hooks/usePageLoad';
import { useLanguage } from '@/contexts/LanguageContext';
import { siteConfig } from '@/config';

export default function Home() {
  const { showOverlay } = usePageLoad(500);
  const { language } = useLanguage();

  const title = siteConfig.title[language];
  document.title = title;

  return (
    <div className="min-h-screen bg-white">
      <PageOverlay isVisible={showOverlay} title={title} />
      <Navigation />
      <ContactSidebar />
      <main>
        <Hero />
        <About />
        <WorkExperience />
        <Skills />
        <Achievements />
        <Portfolio />
        <Publications />
        <Education />
        <Documents />
      </main>
      <Footer />
    </div>
  );
}
