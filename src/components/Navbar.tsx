import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import n8nIcon from '@/assets/n8n-icon.png';

export default function Navbar() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const navItems = [
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.workflows'), href: '#workflows' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.experience'), href: '#experience' },
    { label: t('nav.certifications'), href: '#certifications' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-card border-b border-glass-border' : ''}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="font-display text-xl font-bold gradient-text">Bouallegui Younes</a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group cursor-pointer">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://n8n.younesblg.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors mr-2"
              aria-label="n8n"
            >
              <img src={n8nIcon} alt="n8n" className="w-5 h-5" />
            </a>
            <LanguageSelector />
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.95 }}
              className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label="Toggle theme"
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center border border-border"
                animate={{ left: isDark ? '1.75rem' : '0.125rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                {isDark ? <Moon className="w-3.5 h-3.5 text-primary" /> : <Sun className="w-3.5 h-3.5 text-primary" />}
              </motion.div>
            </motion.button>
            <Button variant="hero" size="sm" onClick={(e) => handleNavClick(e, '#contact')}>
              {t('nav.letsTalk')}
            </Button>
          </div>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-foreground">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2"
          >
            <div className="flex flex-col gap-4">
              {navItems.map(item => (
                <a key={item.href} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-muted-foreground hover:text-foreground transition-colors py-2 cursor-pointer">
                  {item.label}
                </a>
              ))}
              <a
                href="https://n8n.younesblg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors mt-2"
                aria-label="n8n"
              >
                <img src={n8nIcon} alt="n8n" className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-4 mt-2">
                <LanguageSelector />
                <button
                  onClick={toggleTheme}
                  className="relative w-14 h-7 rounded-full bg-muted border border-border transition-colors duration-300"
                  aria-label="Toggle theme"
                >
                  <div
                    className="absolute top-0.5 w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center border border-border transition-all duration-300"
                    style={{ left: isDark ? '1.75rem' : '0.125rem' }}
                  >
                    {isDark ? <Moon className="w-3.5 h-3.5 text-primary" /> : <Sun className="w-3.5 h-3.5 text-primary" />}
                  </div>
                </button>
                <Button variant="hero" size="sm" className="flex-1" onClick={(e) => handleNavClick(e, '#contact')}>
                  {t('nav.letsTalk')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
