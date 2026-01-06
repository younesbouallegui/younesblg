import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Workflow, Database, Mail, Bot, Cloud, GitBranch, Zap, Server } from 'lucide-react';
import n8nLogo from '@/assets/n8n-logo.png';

const workflows = [
  {
    title: 'CI/CD Pipeline',
    description: 'Automated build, test, and deployment workflow for microservices',
    nodes: [GitBranch, Server, Cloud],
    color: 'primary'
  },
  {
    title: 'Data Sync',
    description: 'Real-time data synchronization between multiple services',
    nodes: [Database, Zap, Database],
    color: 'secondary'
  },
  {
    title: 'Alert System',
    description: 'Intelligent monitoring with automated incident response',
    nodes: [Server, Bot, Mail],
    color: 'primary'
  },
  {
    title: 'Auto Scaling',
    description: 'Dynamic resource allocation based on traffic patterns',
    nodes: [Cloud, Workflow, Server],
    color: 'secondary'
  },
  {
    title: 'Backup Automation',
    description: 'Scheduled backups with verification and rotation',
    nodes: [Database, Zap, Cloud],
    color: 'primary'
  },
];

function WorkflowCard({ workflow, index }: { workflow: typeof workflows[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="flex-shrink-0 w-80 glass-card-hover p-6 cursor-pointer group"
    >
      {/* Pipeline visualization */}
      <div className="relative mb-6">
        <svg className="w-full h-16" viewBox="0 0 280 60">
          {/* Arc path */}
          <path
            d="M 30 50 Q 140 -10 250 50"
            fill="none"
            stroke={workflow.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
            strokeWidth="2"
            strokeDasharray="5,5"
            className="opacity-40 group-hover:opacity-80 transition-opacity"
          />
          {/* Animated glow path */}
          <motion.path
            d="M 30 50 Q 140 -10 250 50"
            fill="none"
            stroke={workflow.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
            style={{ filter: 'blur(2px)' }}
          />
        </svg>
        
        {/* Nodes on the arc */}
        <div className="absolute inset-0 flex justify-between items-end px-2">
          {workflow.nodes.map((Icon, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, type: 'spring' }}
              className={`pipeline-node ${
                workflow.color === 'primary' 
                  ? 'group-hover:border-primary/80 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]' 
                  : 'group-hover:border-secondary/80 group-hover:shadow-[0_0_20px_hsl(var(--secondary)/0.4)]'
              } transition-all duration-300`}
              style={{ 
                transform: `translateY(${i === 1 ? '-20px' : '0'})`,
              }}
            >
              <Icon className={`w-5 h-5 ${
                workflow.color === 'primary' ? 'text-primary' : 'text-secondary'
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <h3 className="font-display text-xl font-semibold mb-2 group-hover:gradient-text transition-all">
        {workflow.title}
      </h3>
      <p className="text-sm text-muted-foreground">{workflow.description}</p>
    </motion.div>
  );
}

export default function WorkflowsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section id="workflows" className="py-32 relative overflow-hidden" ref={containerRef}>
      {/* n8n Logo Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <img 
          src={n8nLogo} 
          alt="" 
          className="w-[500px] h-[500px] object-contain opacity-[0.06] dark:opacity-[0.08] blur-sm"
        />
      </div>
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(var(--secondary) / 0.4) 0%, transparent 70%)' }}
      />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            n8n <span className="gradient-text">Workflows</span>
          </h2>
          <p className="text-muted-foreground">
            Automated pipelines and integrations I've built to streamline operations
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <motion.div 
        style={{ x }}
        className="flex gap-6 px-6"
      >
        {workflows.map((workflow, index) => (
          <WorkflowCard key={workflow.title} workflow={workflow} index={index} />
        ))}
      </motion.div>
    </section>
  );
}
