import { motion } from 'framer-motion';
import { ArrowRight, Terminal, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import profileLight from '@/assets/profile-light.jpg';
import profileDark from '@/assets/profile-dark.jpg';

const Scene3D = lazy(() => import('./Scene3D'));

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-background" />}>
        <Scene3D />
      </Suspense>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'var(--gradient-hero)' }} />
      <div className="absolute inset-0 grid-background opacity-30 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-8">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.6 }} className="relative w-44 h-44 md:w-56 md:h-56 mx-auto">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-xl opacity-60" />
            <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-primary via-accent to-primary">
              <div className="w-full h-full rounded-full bg-background" />
            </div>
            <img src={profileLight} alt="Profile" className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top dark:hidden" />
            <img src={profileDark} alt="Profile" className="absolute inset-1 w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top hidden dark:block" />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="inline-flex items-center gap-2 glass-card px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">{t('hero.available')}</span>
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="block text-foreground">{t('hero.title1')}</span>
            <span className="block gradient-text">{t('hero.title2')}</span>
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }} className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            {t('hero.tagline')}
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="hero" size="lg" className="group">
              <Terminal className="w-5 h-5 me-2" />
              {t('hero.viewProjects')}
              <ArrowRight className="w-4 h-4 ms-2 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
            </Button>
            <Button variant="heroOutline" size="lg" className="group">
              <GitBranch className="w-5 h-5 me-2" />
              {t('hero.myWorkflows')}
            </Button>
          </motion.div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
