import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
const navItems = [{
  label: 'About',
  href: '#about'
}, {
  label: 'Skills',
  href: '#skills'
}, {
  label: 'Workflows',
  href: '#workflows'
}, {
  label: 'Projects',
  href: '#projects'
}, {
  label: 'Experience',
  href: '#experience'
}, {
  label: 'Contact',
  href: '#contact'
}];
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || !savedTheme && prefersDark || !savedTheme && !prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card border-b border-glass-border' : ''}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-display text-xl font-bold gradient-text">Boualleg</a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => <a key={item.label} href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>)}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button onClick={toggleTheme} whileTap={{
            scale: 0.95
          }} className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50" aria-label="Toggle theme">
              <motion.div className="absolute top-0.5 w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center border border-border" animate={{
              left: isDark ? '1.75rem' : '0.125rem'
            }} transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30
            }}>
                {isDark ? <Moon className="w-3.5 h-3.5 text-primary" /> : <Sun className="w-3.5 h-3.5 text-primary" />}
              </motion.div>
            </motion.button>
            <Button variant="hero" size="sm">
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden pt-4 pb-2">
            <div className="flex flex-col gap-4">
              {navItems.map(item => <a key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors py-2">
                  {item.label}
                </a>)}
              <div className="flex items-center gap-4 mt-2">
                <button onClick={toggleTheme} className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300" aria-label="Toggle theme">
                  <div className="absolute top-0.5 w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center border border-border transition-all duration-300" style={{
                left: isDark ? '1.75rem' : '0.125rem'
              }}>
                    {isDark ? <Moon className="w-3.5 h-3.5 text-primary" /> : <Sun className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </button>
                <Button variant="hero" size="sm" className="flex-1">
                  Let's Talk
                </Button>
              </div>
            </div>
          </motion.div>}
      </div>
    </motion.nav>;
}