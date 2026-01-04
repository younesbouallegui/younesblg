import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const skills = [
  { name: 'Docker', category: 'Containerization', color: 'primary' },
  { name: 'Kubernetes', category: 'Orchestration', color: 'secondary' },
  { name: 'n8n', category: 'Automation', color: 'primary' },
  { name: 'GitLab CI', category: 'CI/CD', color: 'secondary' },
  { name: 'Jenkins', category: 'CI/CD', color: 'primary' },
  { name: 'Python', category: 'Scripting', color: 'secondary' },
  { name: 'Terraform', category: 'IaC', color: 'primary' },
  { name: 'AWS', category: 'Cloud', color: 'secondary' },
  { name: 'Linux', category: 'Systems', color: 'primary' },
  { name: 'Ansible', category: 'Automation', color: 'secondary' },
  { name: 'Prometheus', category: 'Monitoring', color: 'primary' },
  { name: 'Git', category: 'Version Control', color: 'secondary' },
];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="perspective-1000"
    >
      <motion.div
        animate={{
          rotateX: isHovered ? 10 : 0,
          rotateY: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`glass-card p-6 cursor-pointer preserve-3d transition-all duration-300 ${
          isHovered ? 'border-primary/60 glow' : ''
        }`}
      >
        <div className="relative z-10">
          <span className={`text-xs uppercase tracking-wider ${
            skill.color === 'primary' ? 'text-primary' : 'text-secondary'
          }`}>
            {skill.category}
          </span>
          <h3 className="font-display text-xl font-semibold mt-2">{skill.name}</h3>
        </div>
        
        {/* Glow effect on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className={`absolute inset-0 rounded-xl blur-xl -z-10 ${
            skill.color === 'primary' 
              ? 'bg-primary/20' 
              : 'bg-secondary/20'
          }`}
        />
      </motion.div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The tools and technologies I use to build robust, scalable automation solutions
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
