import { 
  Webhook, 
  GitBranch, 
  Code, 
  Database, 
  Mail, 
  MessageSquare, 
  Cloud, 
  Server, 
  Cpu, 
  Settings, 
  Zap,
  FileCode,
  Terminal,
  Bot,
  Send,
  Filter,
  ArrowRightLeft,
  CirclePlay,
  Cog
} from 'lucide-react';

interface NodeIconProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
}

const NodeIcon = ({ type, className = "w-5 h-5", style }: NodeIconProps) => {
  const normalizedType = type.toLowerCase();
  
  if (normalizedType.includes('webhook')) return <Webhook className={className} style={style} />;
  if (normalizedType.includes('git') || normalizedType.includes('gitlab')) return <GitBranch className={className} style={style} />;
  if (normalizedType.includes('function') || normalizedType.includes('code')) return <Code className={className} style={style} />;
  if (normalizedType.includes('http') || normalizedType.includes('request')) return <Cloud className={className} style={style} />;
  if (normalizedType.includes('email') || normalizedType.includes('mail')) return <Mail className={className} style={style} />;
  if (normalizedType.includes('slack') || normalizedType.includes('discord') || normalizedType.includes('telegram')) return <MessageSquare className={className} style={style} />;
  if (normalizedType.includes('openai') || normalizedType.includes('ai')) return <Bot className={className} style={style} />;
  if (normalizedType.includes('ssh') || normalizedType.includes('execute')) return <Terminal className={className} style={style} />;
  if (normalizedType.includes('set') || normalizedType.includes('edit')) return <Settings className={className} style={style} />;
  if (normalizedType.includes('if') || normalizedType.includes('switch') || normalizedType.includes('filter')) return <Filter className={className} style={style} />;
  if (normalizedType.includes('split') || normalizedType.includes('merge')) return <ArrowRightLeft className={className} style={style} />;
  if (normalizedType.includes('trigger') || normalizedType.includes('manual')) return <CirclePlay className={className} style={style} />;
  if (normalizedType.includes('respond') || normalizedType.includes('send')) return <Send className={className} style={style} />;
  if (normalizedType.includes('postgres') || normalizedType.includes('mysql') || normalizedType.includes('database')) return <Database className={className} style={style} />;
  if (normalizedType.includes('noop') || normalizedType.includes('no operation')) return <Cog className={className} style={style} />;
  if (normalizedType.includes('workflow')) return <FileCode className={className} style={style} />;
  
  return <Zap className={className} style={style} />;
};

export default NodeIcon;
