import { motion } from 'framer-motion';
import { WorkflowMetadata } from './types';
import { ExternalLink, Workflow, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface WorkflowCardProps {
  workflow: WorkflowMetadata;
  index: number;
  onClick: () => void;
}

const WorkflowCard = ({ workflow, index, onClick }: WorkflowCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="glass-card-hover p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
            <Workflow className="w-6 h-6 text-primary" />
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold font-['Space_Grotesk'] mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {workflow.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
          {workflow.description}
        </p>

        {/* Tags */}
        {workflow.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {workflow.tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="text-xs bg-secondary/10 text-secondary border-secondary/20"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
          <span>View Workflow</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default WorkflowCard;
