import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function ProjectCard({ project, index, onClick }: { project: { title: string; description: string; tags: string[]; color: string }; index: number; onClick: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ y: -8 }} onClick={onClick} className="glass-card-hover p-6 cursor-pointer group">
      <div className={`w-full h-2 rounded-full mb-6 ${project.color === 'primary' ? 'bg-gradient-to-r from-primary to-neon-blue' : 'bg-gradient-to-r from-secondary to-primary'}`} />
      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{tag}</span>)}
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose, viewDemo, sourceCode }: { project: { title: string; longDescription: string; tags: string[]; color: string } | null; onClose: () => void; viewDemo: string; sourceCode: string }) {
  if (!project) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="glass-card max-w-2xl w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 end-4 text-muted-foreground hover:text-foreground transition-colors"><X className="w-6 h-6" /></button>
        <div className={`w-full h-2 rounded-full mb-6 ${project.color === 'primary' ? 'bg-gradient-to-r from-primary to-neon-blue' : 'bg-gradient-to-r from-secondary to-primary'}`} />
        <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
        <p className="text-muted-foreground mb-6">{project.longDescription}</p>
        <div className="flex flex-wrap gap-2 mb-8">{project.tags.map((tag) => <span key={tag} className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary">{tag}</span>)}</div>
        <div className="flex gap-4">
          <Button variant="hero" size="sm"><ExternalLink className="w-4 h-4 me-2" />{viewDemo}</Button>
          <Button variant="heroOutline" size="sm"><Github className="w-4 h-4 me-2" />{sourceCode}</Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<{ title: string; description: string; longDescription: string; tags: string[]; color: string } | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    { title: t('projects.iacTitle'), description: t('projects.iacDesc'), longDescription: t('projects.iacLongDesc'), tags: ['Terraform', 'AWS', 'Python', 'GitLab CI'], color: 'primary' },
    { title: t('projects.k8sTitle'), description: t('projects.k8sDesc'), longDescription: t('projects.k8sLongDesc'), tags: ['Kubernetes', 'Prometheus', 'Go', 'Alertmanager'], color: 'secondary' },
    { title: t('projects.cicdTitle'), description: t('projects.cicdDesc'), longDescription: t('projects.cicdLongDesc'), tags: ['Jenkins', 'Docker', 'Ansible', 'Helm'], color: 'primary' },
    { title: t('projects.workflowTitle'), description: t('projects.workflowDesc'), longDescription: t('projects.workflowLongDesc'), tags: ['n8n', 'Node.js', 'PostgreSQL', 'REST APIs'], color: 'secondary' },
  ];

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('projects.title')} <span className="gradient-text">{t('projects.titleHighlight')}</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('projects.description')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => <ProjectCard key={project.title} project={project} index={index} onClick={() => setSelectedProject(project)} />)}
        </div>
      </div>
      <AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} viewDemo={t('projects.viewDemo')} sourceCode={t('projects.sourceCode')} />}</AnimatePresence>
    </section>
  );
}
