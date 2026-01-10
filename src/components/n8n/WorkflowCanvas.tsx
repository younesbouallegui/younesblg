import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { N8nWorkflow, N8nNode } from './types';
import NodeIcon from './NodeIcon';
import { X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkflowCanvasProps {
  workflow: N8nWorkflow;
  onClose: () => void;
}

const WorkflowCanvas = ({ workflow, onClose }: WorkflowCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.6);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<N8nNode | null>(null);

  // Calculate bounds for centering
  const getBounds = useCallback(() => {
    if (!workflow.nodes.length) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    
    const positions = workflow.nodes.map(n => n.position);
    return {
      minX: Math.min(...positions.map(p => p[0])),
      minY: Math.min(...positions.map(p => p[1])),
      maxX: Math.max(...positions.map(p => p[0])),
      maxY: Math.max(...positions.map(p => p[1]))
    };
  }, [workflow.nodes]);

  // Center the workflow on mount
  useEffect(() => {
    const bounds = getBounds();
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: rect.width / 2 - centerX * scale,
        y: rect.height / 2 - centerY * scale
      });
    }
  }, [workflow, scale, getBounds]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-card')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(prev + delta, 0.2), 2));
  };

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.2));
  const resetView = () => {
    setScale(0.6);
    const bounds = getBounds();
    const centerX = (bounds.minX + bounds.maxX) / 2;
    const centerY = (bounds.minY + bounds.maxY) / 2;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setOffset({
        x: rect.width / 2 - centerX * 0.6,
        y: rect.height / 2 - centerY * 0.6
      });
    }
  };

  // Get connections as lines
  const getConnections = () => {
    const lines: { from: N8nNode; to: N8nNode }[] = [];
    const nodeMap = new Map(workflow.nodes.map(n => [n.name, n]));

    Object.entries(workflow.connections || {}).forEach(([fromName, outputs]) => {
      const fromNode = nodeMap.get(fromName);
      if (!fromNode) return;

      Object.values(outputs).forEach((connections) => {
        connections.forEach((connArray) => {
          connArray.forEach((conn) => {
            const toNode = nodeMap.get(conn.node);
            if (toNode) {
              lines.push({ from: fromNode, to: toNode });
            }
          });
        });
      });
    });

    return lines;
  };

  const connections = getConnections();
  const nodeWidth = 180;
  const nodeHeight = 60;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <div>
          <h2 className="text-xl font-bold font-['Space_Grotesk']">{workflow.name}</h2>
          <p className="text-sm text-muted-foreground">{workflow.nodes.length} nodes</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={zoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="icon" onClick={zoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={resetView}>
            <Maximize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 pt-16 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ touchAction: 'none' }}
      >
        {/* Grid Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--border)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * scale}px ${20 * scale}px`,
            backgroundPosition: `${offset.x}px ${offset.y}px`
          }}
        />

        {/* SVG Connections */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          {connections.map((conn, i) => {
            const fromX = conn.from.position[0] * scale + offset.x + nodeWidth * scale;
            const fromY = conn.from.position[1] * scale + offset.y + (nodeHeight * scale) / 2;
            const toX = conn.to.position[0] * scale + offset.x;
            const toY = conn.to.position[1] * scale + offset.y + (nodeHeight * scale) / 2;
            
            const midX = (fromX + toX) / 2;
            
            return (
              <g key={i}>
                <path
                  d={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2 * scale}
                  strokeOpacity={0.6}
                />
                {/* Animated dot */}
                <circle r={4 * scale} fill="hsl(var(--primary))">
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${fromX} ${fromY} C ${midX} ${fromY}, ${midX} ${toY}, ${toX} ${toY}`}
                  />
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {workflow.nodes.map((node) => (
          <motion.div
            key={node.id}
            className="node-card absolute cursor-pointer select-none"
            style={{
              left: node.position[0] * scale + offset.x,
              top: node.position[1] * scale + offset.y,
              width: nodeWidth * scale,
              transform: 'translateZ(0)'
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedNode(node)}
          >
            <div 
              className={`
                rounded-lg border bg-card p-3 transition-all
                ${selectedNode?.id === node.id 
                  ? 'border-primary shadow-[0_0_20px_hsl(var(--primary)/0.4)]' 
                  : 'border-border hover:border-primary/50 hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]'
                }
              `}
              style={{ transformOrigin: 'center' }}
            >
              <div className="flex items-center gap-2" style={{ fontSize: 12 * scale }}>
                <div 
                  className="flex-shrink-0 rounded-md bg-primary/10 p-1.5"
                  style={{ padding: 6 * scale }}
                >
                  <NodeIcon type={node.type} className="text-primary" style={{ width: 16 * scale, height: 16 * scale } as React.CSSProperties} />
                </div>
                <span 
                  className="font-medium truncate text-foreground"
                  style={{ fontSize: Math.max(10, 12 * scale) }}
                >
                  {node.name}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Node Details Panel */}
      {selectedNode && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          className="absolute top-16 right-0 bottom-0 w-80 bg-card border-l border-border overflow-y-auto"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{selectedNode.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setSelectedNode(null)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Type</span>
                <p className="text-sm font-mono mt-1 text-primary">{selectedNode.type}</p>
              </div>
              
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide">Position</span>
                <p className="text-sm font-mono mt-1">x: {selectedNode.position[0]}, y: {selectedNode.position[1]}</p>
              </div>
              
              {selectedNode.parameters && Object.keys(selectedNode.parameters).length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Parameters</span>
                  <pre className="text-xs font-mono mt-2 p-3 rounded-lg bg-muted/50 overflow-x-auto max-h-64 overflow-y-auto">
                    {JSON.stringify(selectedNode.parameters, null, 2)}
                  </pre>
                </div>
              )}
              
              {selectedNode.credentials && Object.keys(selectedNode.credentials).length > 0 && (
                <div>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Credentials</span>
                  <div className="mt-2 space-y-1">
                    {Object.keys(selectedNode.credentials).map((cred) => (
                      <div key={cred} className="text-sm font-mono px-2 py-1 rounded bg-secondary/20 text-secondary">
                        {cred}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WorkflowCanvas;
