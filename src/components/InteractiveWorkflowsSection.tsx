import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { workflows } from './n8n/workflowData';
import WorkflowCard from './n8n/WorkflowCard';
import WorkflowCanvas from './n8n/WorkflowCanvas';
import { N8nWorkflow } from './n8n/types';
import { Loader2 } from 'lucide-react';

const InteractiveWorkflowsSection = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<N8nWorkflow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    <section id="interactive-workflows" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4 border border-secondary/20">
            Interactive Explorer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Space_Grotesk'] mb-4">
            n8n Workflow <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Click on any workflow to explore its nodes, connections, and configuration in an interactive viewer inspired by the n8n editor.
          </p>
        </motion.div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflows.map((workflow, index) => (
            <WorkflowCard
              key={workflow.id}
              workflow={workflow}
              index={index}
              onClick={() => handleWorkflowClick(workflow.filename)}
            />
          ))}
        </div>

        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading workflow...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Workflow Viewer Modal */}
        <AnimatePresence>
          {selectedWorkflow && (
            <WorkflowCanvas
              workflow={selectedWorkflow}
              onClose={() => setSelectedWorkflow(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveWorkflowsSection;
