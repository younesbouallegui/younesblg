import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import WorkflowsSection from '@/components/WorkflowsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceSection from '@/components/ExperienceSection';
import CertificatesSection from '@/components/CertificatesSection';
import LanguagesSection from '@/components/LanguagesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkflowsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <LanguagesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
