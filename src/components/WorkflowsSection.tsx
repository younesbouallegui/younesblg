import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Workflow, Database, Mail, Bot, Cloud, GitBranch, Server, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import n8nBackground from '@/assets/n8n-background.png';
import WorkflowCanvas from './n8n/WorkflowCanvas';
import { N8nWorkflow } from './n8n/types';

interface WorkflowCardProps {
  workflow: { title: string; description: string; nodes: typeof Cloud[]; color: string; filename: string };
  index: number;
  onClick: () => void;
  clickHint: string;
}

function WorkflowCard({ workflow, index, onClick, clickHint }: WorkflowCardProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: index * 0.1 }} whileHover={{ scale: 1.03, y: -5 }} onClick={onClick} className="flex-shrink-0 w-80 glass-card-hover p-6 cursor-pointer group">
      <div className="relative mb-6">
        <svg className="w-full h-16" viewBox="0 0 280 60">
          <path d="M 30 50 Q 140 -10 250 50" fill="none" stroke={workflow.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} strokeWidth="2" strokeDasharray="5,5" className="opacity-40 group-hover:opacity-80 transition-opacity" />
          <motion.path d="M 30 50 Q 140 -10 250 50" fill="none" stroke={workflow.color === 'primary' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'} strokeWidth="3" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, delay: index * 0.2 }} style={{ filter: 'blur(2px)' }} />
        </svg>
        <div className="absolute inset-0 flex justify-between items-end px-2">
          {workflow.nodes.map((Icon, i) => (
            <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.15, type: 'spring' }} className={`pipeline-node ${workflow.color === 'primary' ? 'group-hover:border-primary/80 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]' : 'group-hover:border-secondary/80 group-hover:shadow-[0_0_20px_hsl(var(--secondary)/0.4)]'} transition-all duration-300`} style={{ transform: `translateY(${i === 1 ? '-20px' : '0'})` }}>
              <Icon className={`w-5 h-5 ${workflow.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
            </motion.div>
          ))}
        </div>
      </div>
      <h3 className="font-display text-xl font-semibold mb-2 group-hover:gradient-text transition-all">{workflow.title}</h3>
      <p className="text-sm text-muted-foreground">{workflow.description}</p>
      <div className="mt-4 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
        <span>{clickHint}</span>
        <ChevronRight className="w-3 h-3 rtl:rotate-180" />
      </div>
    </motion.div>
  );
}

export default function WorkflowsSection() {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<N8nWorkflow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const workflows = [
    { title: t('workflows.figmaTitle'), description: t('workflows.figmaDesc'), nodes: [Cloud, Bot, Server], color: 'primary', filename: 'from_figma_to_real_app.json' },
    { title: t('workflows.gitlabTitle'), description: t('workflows.gitlabDesc'), nodes: [GitBranch, Server, Mail], color: 'secondary', filename: 'gitlab_cicd_pipeline.json' },
    { title: t('workflows.cloudflareTitle'), description: t('workflows.cloudflareDesc'), nodes: [Bot, Cloud, Database], color: 'primary', filename: 'cloudflare_dns_ai.json' },
    { title: t('workflows.devopsTitle'), description: t('workflows.devopsDesc'), nodes: [Server, Workflow, Cloud], color: 'secondary', filename: 'devops_infrastructure.json' },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => { checkScroll(); window.addEventListener('resize', checkScroll); return () => window.removeEventListener('resize', checkScroll); }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWorkflowClick = async (filename: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/workflows/${filename}`);
      const data = await response.json();
      setSelectedWorkflow(data);
    } catch (error) {
      console.error('Failed to load workflow:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="workflows" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img src={n8nBackground} alt="" className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] object-contain opacity-20 dark:opacity-35" />
      </div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none bg-primary" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none bg-secondary" />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {t('workflows.title')} <span className="gradient-text">{t('workflows.titleHighlight')}</span>
          </h2>
          <p className="text-muted-foreground">{t('workflows.description')}</p>
        </motion.div>
      </div>

      <div className="relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: isHovering && canScrollLeft ? 1 : 0 }} transition={{ duration: 0.2 }} onClick={() => scroll('left')} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors disabled:opacity-0" disabled={!canScrollLeft} aria-label="Scroll left">
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button initial={{ opacity: 0 }} animate={{ opacity: isHovering && canScrollRight ? 1 : 0 }} transition={{ duration: 0.2 }} onClick={() => scroll('right')} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors disabled:opacity-0" disabled={!canScrollRight} aria-label="Scroll right">
          <ChevronRight className="w-6 h-6" />
        </motion.button>
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div ref={scrollContainerRef} onScroll={checkScroll} className="flex gap-6 px-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {workflows.map((workflow, index) => <WorkflowCard key={workflow.filename} workflow={workflow} index={index} onClick={() => handleWorkflowClick(workflow.filename)} clickHint={t('workflows.clickToExplore')} />)}
        </div>
      </div>

      <AnimatePresence>
        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <p className="text-muted-foreground">{t('workflows.loading')}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWorkflow && <WorkflowCanvas workflow={selectedWorkflow} onClose={() => setSelectedWorkflow(null)} />}
      </AnimatePresence>
    </section>
  );
}
