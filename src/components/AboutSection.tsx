import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Server, GitMerge, Cloud } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    { icon: Zap, title: t('about.automationFirst'), description: t('about.automationFirstDesc') },
    { icon: Server, title: t('about.infrastructure'), description: t('about.infrastructureDesc') },
    { icon: GitMerge, title: t('about.cicdExpert'), description: t('about.cicdExpertDesc') },
    { icon: Cloud, title: t('about.cloudNative'), description: t('about.cloudNativeDesc') }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }} />
      
      <div ref={ref} className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')} <span className="gradient-text">{t('about.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('about.description')}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass-card-hover p-6 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
