import { WorkflowMetadata } from './types';

export const workflows: WorkflowMetadata[] = [
  {
    id: 'figma-to-app',
    name: 'From Figma to Real App',
    description: 'AI-powered workflow that transforms Figma designs into fullstack applications using GPT-4 and automated code generation.',
    filename: 'from_figma_to_real_app.json',
    tags: ['AI', 'Figma', 'Code Generation']
  },
  {
    id: 'gitlab-cicd',
    name: 'GitLab CI/CD Pipeline Automation',
    description: 'Comprehensive CI/CD automation with SonarQube integration, Slack notifications, and intelligent pipeline control.',
    filename: 'gitlab_cicd_pipeline.json',
    tags: ['CI/CD', 'GitLab', 'DevOps']
  },
  {
    id: 'cloudflare-dns',
    name: 'Cloudflare DNS AI Assistant',
    description: 'AI-powered chat assistant for managing Cloudflare DNS records with natural language commands.',
    filename: 'cloudflare_dns_ai.json',
    tags: ['AI', 'DNS', 'Cloudflare']
  },
  {
    id: 'devops-infra',
    name: 'DevOps Infrastructure Setup',
    description: 'Automated provisioning of Docker, K3s, Jenkins & Grafana stack for Linux servers via SSH.',
    filename: 'devops_infrastructure.json',
    tags: ['Infrastructure', 'Docker', 'Kubernetes']
  }
];
