import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    title: 'Senior DevOps Engineer',
    company: 'Tech Innovators Inc.',
    period: '2022 - Present',
    description: 'Leading infrastructure automation initiatives and managing cloud-native deployments across multi-region clusters.',
  },
  {
    title: 'DevOps Engineer',
    company: 'CloudScale Solutions',
    period: '2020 - 2022',
    description: 'Designed and implemented CI/CD pipelines, reducing deployment time by 70% and improving system reliability.',
  },
  {
    title: 'Automation Engineer',
    company: 'Digital Systems Corp',
    period: '2018 - 2020',
    description: 'Built workflow automation solutions using n8n and Python, automating 200+ business processes.',
  },
  {
    title: 'Systems Administrator',
    company: 'StartupHub',
    period: '2016 - 2018',
    description: 'Managed Linux infrastructure and initiated the transition to containerized deployments.',
  },
];

function TimelineItem({ experience, index, isLast }: { 
  experience: typeof experiences[0]; 
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-8 md:pl-0">
      {/* Timeline line */}
      {!isLast && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute left-3 md:left-1/2 top-12 w-0.5 h-full bg-gradient-to-b from-primary to-transparent origin-top"
          style={{ transform: 'translateX(-50%)' }}
        />
      )}

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left side - Date (visible on md+) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="hidden md:flex justify-end items-center gap-2 text-muted-foreground"
        >
          <Calendar className="w-4 h-4" />
          <span>{experience.period}</span>
        </motion.div>

        {/* Timeline dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center"
          style={{ transform: 'translateX(-50%)' }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="glass-card-hover p-6"
        >
          {/* Mobile date */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2 md:hidden">
            <Calendar className="w-4 h-4" />
            <span>{experience.period}</span>
          </div>
          
          <div className="flex items-center gap-2 text-primary text-sm mb-1">
            <Briefcase className="w-4 h-4" />
            <span>{experience.company}</span>
          </div>
          <h3 className="font-display text-xl font-semibold mb-2">{experience.title}</h3>
          <p className="text-muted-foreground text-sm">{experience.description}</p>
        </motion.div>
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-32 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
      />
      
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            My journey in DevOps and automation engineering
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <TimelineItem 
              key={experience.company} 
              experience={experience} 
              index={index}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
