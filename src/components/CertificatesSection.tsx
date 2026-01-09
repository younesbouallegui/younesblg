import { motion } from 'framer-motion';
import { Award, Cloud, Container, Workflow, Cpu, Link } from 'lucide-react';

const certificates = [
  {
    category: "Cloud",
    icon: Cloud,
    items: [
      { name: "AWS Solutions Architect", issuer: "Amazon Web Services" },
      { name: "Azure Administrator", issuer: "Microsoft" },
      { name: "Google Cloud Professional", issuer: "Google" },
    ]
  },
  {
    category: "DevOps",
    icon: Container,
    items: [
      { name: "Certified Kubernetes Administrator", issuer: "CNCF" },
      { name: "Docker Certified Associate", issuer: "Docker" },
      { name: "Terraform Associate", issuer: "HashiCorp" },
    ]
  },
  {
    category: "Automation",
    icon: Workflow,
    items: [
      { name: "n8n Expert Certification", issuer: "n8n.io" },
    ]
  },
  {
    category: "AI & Emerging Tech",
    icon: Cpu,
    items: [
      { name: "NVIDIA Deep Learning", issuer: "NVIDIA" },
    ]
  },
  {
    category: "Blockchain",
    icon: Link,
    items: [
      { name: "Blockchain Developer", issuer: "Blockchain Council" },
    ]
  },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Professional certifications validating expertise across cloud, DevOps, and emerging technologies
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1, duration: 0.5 }}
              className="glass-card p-6 group hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">{category.category}</h3>
              </div>
              
              <div className="space-y-3">
                {category.items.map((cert, certIndex) => (
                  <div
                    key={certIndex}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Award className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">{cert.name}</p>
                      <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
