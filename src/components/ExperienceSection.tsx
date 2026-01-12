import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function TimelineItem({ experience, index, isLast }: { experience: { title: string; company: string; period: string; description: string }; index: number; isLast: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative ps-8 md:ps-0">
      {!isLast && <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ duration: 0.8, delay: 0.3 }} className="absolute start-3 md:start-1/2 top-12 w-0.5 h-full bg-gradient-to-b from-primary to-transparent origin-top" style={{ transform: 'translateX(-50%)' }} />}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="hidden md:flex justify-end items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" /><span>{experience.period}</span>
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.2 }} className="absolute start-0 md:start-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center" style={{ transform: 'translateX(-50%)' }}>
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }} className="glass-card-hover p-6">
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2 md:hidden"><Calendar className="w-4 h-4" /><span>{experience.period}</span></div>
          <div className="flex items-center gap-2 text-primary text-sm mb-1"><Briefcase className="w-4 h-4" /><span>{experience.company}</span></div>
          <h3 className="font-display text-xl font-semibold mb-2">{experience.title}</h3>
          <p className="text-muted-foreground text-sm">{experience.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    { title: t('experience.seniorTitle'), company: t('experience.seniorCompany'), period: t('experience.seniorPeriod'), description: t('experience.seniorDesc') },
    { title: t('experience.devopsTitle'), company: t('experience.devopsCompany'), period: t('experience.devopsPeriod'), description: t('experience.devopsDesc') },
    { title: t('experience.automationTitle'), company: t('experience.automationCompany'), period: t('experience.automationPeriod'), description: t('experience.automationDesc') },
    { title: t('experience.sysadminTitle'), company: t('experience.sysadminCompany'), period: t('experience.sysadminPeriod'), description: t('experience.sysadminDesc') },
  ];

  return (
    <section id="experience" className="py-32 relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('experience.title')} <span className="gradient-text">{t('experience.titleHighlight')}</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('experience.description')}</p>
        </motion.div>
        <div className="space-y-12 max-w-4xl mx-auto">
          {experiences.map((experience, index) => <TimelineItem key={experience.company} experience={experience} index={index} isLast={index === experiences.length - 1} />)}
        </div>
      </div>
    </section>
  );
}
