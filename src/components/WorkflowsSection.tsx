import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Workflow, Database, Mail, Bot, Cloud, GitBranch, Zap, Server, ChevronLeft, ChevronRight } from 'lucide-react';

// n8n style background component
function N8nBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Blue gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(210 100% 25%) 0%, hsl(220 60% 8%) 70%, hsl(222 47% 5%) 100%)'
        }}
      />
      
      {/* SVG workflow diagram elements */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="n8nGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200 100% 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(210 100% 40%)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        
        {/* Left circle */}
        <circle cx="80" cy="200" r="30" fill="none" stroke="hsl(200 80% 50%)" strokeWidth="1.5" opacity="0.3" />
        
        {/* Top workflow nodes */}
        <g opacity="0.25">
          <rect x="280" y="80" width="20" height="20" rx="3" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" transform="rotate(45 290 90)" />
          <line x1="310" y1="90" x2="350" y2="90" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <rect x="350" y="75" width="50" height="30" rx="4" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="400" y1="90" x2="440" y2="90" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <rect x="440" y="75" width="50" height="30" rx="4" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="490" y1="90" x2="530" y2="90" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <circle cx="550" cy="90" r="15" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <circle cx="590" cy="90" r="12" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
        </g>
        
        {/* Middle left connector */}
        <g opacity="0.2">
          <circle cx="160" cy="180" r="8" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="168" y1="180" x2="200" y2="180" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <rect x="200" y="165" width="40" height="30" rx="4" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
        </g>
        
        {/* Bottom workflow nodes */}
        <g opacity="0.25">
          <rect x="320" y="290" width="50" height="30" rx="4" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="370" y1="305" x2="420" y2="305" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <polygon points="390,305 400,300 400,310" fill="hsl(200 80% 60%)" />
          <rect x="420" y="290" width="60" height="30" rx="4" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="480" y1="305" x2="520" y2="305" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <polygon points="500,305 510,300 510,310" fill="hsl(200 80% 60%)" />
          <circle cx="540" cy="305" r="15" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
        </g>
        
        {/* Right side elements */}
        <g opacity="0.2">
          <circle cx="680" cy="220" r="12" fill="none" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
          <line x1="692" y1="220" x2="720" y2="220" stroke="hsl(200 80% 60%)" strokeWidth="1.5" />
        </g>
      </svg>
      
      {/* n8n Logo - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="280" height="80" viewBox="0 0 280 80" className="opacity-90">
          {/* n8n connector symbol */}
          <g fill="none" stroke="white" strokeWidth="3">
            <circle cx="40" cy="40" r="8" />
            <circle cx="70" cy="40" r="8" />
            <line x1="48" y1="40" x2="62" y2="40" />
            <circle cx="100" cy="40" r="12" />
            <path d="M 88 40 Q 94 25 100 25 Q 106 25 112 40" />
            <circle cx="100" cy="55" r="5" />
          </g>
          {/* n8n text */}
          <text x="130" y="52" fill="white" fontSize="42" fontFamily="Space Grotesk, sans-serif" fontWeight="600">n8n</text>
        </svg>
      </div>
    </div>
  );
}
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="workflows" className="py-32 relative overflow-hidden">
      {/* Professional n8n Background */}
      <N8nBackground />
      
      <div className="container mx-auto px-6 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">
            n8n <span className="text-primary">Workflows</span>
          </h2>
          <p className="text-white/70">
            Automated pipelines and integrations I've built to streamline operations
          </p>
        </motion.div>
      </div>
      
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

      {/* Horizontal scroll container with arrows */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Left Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering && canScrollLeft ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors disabled:opacity-0"
          disabled={!canScrollLeft}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        {/* Right Arrow */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering && canScrollRight ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-background/90 border border-border shadow-lg flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-colors disabled:opacity-0"
          disabled={!canScrollRight}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrollable content */}
        <div 
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex gap-6 px-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {workflows.map((workflow, index) => (
            <WorkflowCard key={workflow.title} workflow={workflow} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
