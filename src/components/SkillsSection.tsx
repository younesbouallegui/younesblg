import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function SkillCard({ skill, index }: { skill: { name: string; category: string; color: string }; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="perspective-1000">
      <motion.div animate={{ rotateX: isHovered ? 10 : 0, rotateY: isHovered ? -10 : 0, scale: isHovered ? 1.05 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className={`glass-card p-6 cursor-pointer preserve-3d transition-all duration-300 ${isHovered ? 'border-primary/60 glow' : ''}`}>
        <div className="relative z-10">
          <span className={`text-xs uppercase tracking-wider ${skill.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>{skill.category}</span>
          <h3 className="font-display text-xl font-semibold mt-2">{skill.name}</h3>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className={`absolute inset-0 rounded-xl blur-xl -z-10 ${skill.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'}`} />
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'Java', category: t('skills.scripting'), color: 'primary' },
    { name: 'Python', category: t('skills.scripting'), color: 'secondary' },
    { name: 'React', category: t('skills.scripting'), color: 'primary' },
    { name: 'Spring Boot', category: t('skills.iac'), color: 'secondary' },
    { name: 'Git', category: t('skills.versionControl'), color: 'primary' },
    { name: 'GitLab CI/CD', category: t('skills.cicd'), color: 'secondary' },
    { name: 'Jenkins', category: t('skills.cicd'), color: 'primary' },
    { name: 'Docker', category: t('skills.containerization'), color: 'secondary' },
    { name: 'Kubernetes', category: t('skills.orchestration'), color: 'primary' },
    { name: 'Ansible', category: t('skills.automation'), color: 'secondary' },
    { name: 'n8n', category: t('skills.automation'), color: 'primary' },
    { name: 'Nexus', category: t('skills.cloud'), color: 'secondary' },
    { name: 'SonarQube', category: t('skills.systems'), color: 'primary' },
    { name: 'Prometheus', category: t('skills.monitoring'), color: 'secondary' },
    { name: 'Grafana', category: t('skills.monitoring'), color: 'primary' },
    { name: 'Zabbix', category: t('skills.monitoring'), color: 'secondary' },
    { name: 'Unit/Integration/E2E', category: t('skills.versionControl'), color: 'primary' },
    { name: 'ML & Deep Learning', category: t('skills.aiml'), color: 'secondary' },
  ];

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('skills.title')} <span className="gradient-text">{t('skills.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('skills.description')}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => <SkillCard key={skill.name} skill={skill} index={index} />)}
        </div>
      </div>
    </section>
  );
}
