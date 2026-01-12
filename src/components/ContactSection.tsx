import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Mail, MapPin, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function ContactSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    toast.success(t('contact.success'), { description: t('contact.successDesc') });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }} />
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('contact.title')} <span className="gradient-text">{t('contact.titleHighlight')}</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('contact.description')}</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="space-y-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><Mail className="w-6 h-6 text-primary" /></div>
                <div><h3 className="font-display font-semibold">{t('contact.email')}</h3><p className="text-muted-foreground">hello@devops.engineer</p></div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"><MapPin className="w-6 h-6 text-primary" /></div>
                <div><h3 className="font-display font-semibold">{t('contact.location')}</h3><p className="text-muted-foreground">{t('contact.locationValue')}</p></div>
              </div>
            </div>
            <div className="flex gap-4">
              <motion.a href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="glass-card-hover w-12 h-12 flex items-center justify-center"><Linkedin className="w-5 h-5" /></motion.a>
              <motion.a href="#" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="glass-card-hover w-12 h-12 flex items-center justify-center"><Github className="w-5 h-5" /></motion.a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}>
            <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label htmlFor="name" className="text-sm text-muted-foreground mb-2 block">{t('contact.name')}</label><Input id="name" name="name" placeholder={t('contact.namePlaceholder')} required className="bg-muted/50 border-glass-border focus:border-primary" /></div>
                <div><label htmlFor="email" className="text-sm text-muted-foreground mb-2 block">{t('contact.emailLabel')}</label><Input id="email" name="email" type="email" placeholder={t('contact.emailPlaceholder')} required className="bg-muted/50 border-glass-border focus:border-primary" /></div>
              </div>
              <div><label htmlFor="subject" className="text-sm text-muted-foreground mb-2 block">{t('contact.subject')}</label><Input id="subject" name="subject" placeholder={t('contact.subjectPlaceholder')} required className="bg-muted/50 border-glass-border focus:border-primary" /></div>
              <div><label htmlFor="message" className="text-sm text-muted-foreground mb-2 block">{t('contact.message')}</label><Textarea id="message" name="message" placeholder={t('contact.messagePlaceholder')} rows={5} required className="bg-muted/50 border-glass-border focus:border-primary resize-none" /></div>
              <Button type="submit" variant="hero" size="lg" className="w-full group" disabled={isSubmitting}>
                {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" /> : <><Send className="w-5 h-5 me-2" />{t('contact.send')}</>}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
