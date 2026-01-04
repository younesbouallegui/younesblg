import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'Infrastructure as Code Platform',
    description: 'A complete Terraform-based infrastructure provisioning system with automated compliance checking and cost optimization.',
    longDescription: 'Built a comprehensive IaC platform that automates cloud infrastructure provisioning across AWS, GCP, and Azure. Features include automated compliance scanning, cost estimation, and drift detection with real-time notifications.',
    tags: ['Terraform', 'AWS', 'Python', 'GitLab CI'],
    color: 'primary'
  },
  {
    title: 'Kubernetes Auto-Healing System',
    description: 'Self-healing Kubernetes clusters with automated incident detection and remediation.',
    longDescription: 'Developed an intelligent monitoring solution that detects pod failures, resource exhaustion, and network issues. Automatically applies fixes based on historical patterns and escalates to human operators when needed.',
    tags: ['Kubernetes', 'Prometheus', 'Go', 'Alertmanager'],
    color: 'secondary'
  },
  {
    title: 'Multi-Cloud CI/CD Pipeline',
    description: 'Unified deployment pipeline supporting multiple cloud providers and deployment strategies.',
    longDescription: 'Created a flexible CI/CD system that supports blue-green, canary, and rolling deployments across different cloud providers. Includes automated rollback capabilities and performance testing gates.',
    tags: ['Jenkins', 'Docker', 'Ansible', 'Helm'],
    color: 'primary'
  },
  {
    title: 'Workflow Automation Hub',
    description: 'Centralized n8n-based automation platform connecting 50+ business tools.',
    longDescription: 'Designed and implemented an enterprise automation hub using n8n, integrating CRM, project management, and communication tools. Reduced manual data entry by 80% and improved cross-team visibility.',
    tags: ['n8n', 'Node.js', 'PostgreSQL', 'REST APIs'],
    color: 'secondary'
  },
];

function ProjectCard({ project, index, onClick }: { 
  project: typeof projects[0]; 
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="glass-card-hover p-6 cursor-pointer group"
    >
      <div className={`w-full h-2 rounded-full mb-6 ${
        project.color === 'primary' 
          ? 'bg-gradient-to-r from-primary to-neon-blue' 
          : 'bg-gradient-to-r from-secondary to-primary'
      }`} />
      
      <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span 
            key={tag}
            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { 
  project: typeof projects[0] | null; 
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-2xl w-full p-8 relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className={`w-full h-2 rounded-full mb-6 ${
          project.color === 'primary' 
            ? 'bg-gradient-to-r from-primary to-neon-blue' 
            : 'bg-gradient-to-r from-secondary to-primary'
        }`} />
        
        <h3 className="font-display text-2xl font-bold mb-4">{project.title}</h3>
        <p className="text-muted-foreground mb-6">{project.longDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="text-sm px-3 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          <Button variant="hero" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Demo
          </Button>
          <Button variant="heroOutline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            Source Code
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A selection of automation and infrastructure projects I've built
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
