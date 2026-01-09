import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const languages = [
  {
    name: "العربية",
    englishName: "Arabic",
    level: "native",
    flag: "🇸🇦",
    proficiency: 100,
  },
  {
    name: "Français",
    englishName: "French",
    level: "native",
    flag: "🇫🇷",
    proficiency: 100,
  },
  {
    name: "English",
    englishName: "English",
    level: "fluent",
    flag: "🇬🇧",
    proficiency: 90,
  },
];

export default function LanguagesSection() {
  const { t } = useLanguage();

  return (
    <section id="languages" className="py-24 relative">
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
            <span className="gradient-text">{t('languages.title')}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('languages.subtitle')}
          </p>
        </motion.div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {languages.map((lang, index) => (
            <motion.div
              key={lang.englishName}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card p-8 text-center group hover:border-primary/50 transition-all duration-300"
            >
              {/* Flag */}
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                {lang.flag}
              </div>
              
              {/* Language Name */}
              <h3 className="font-display text-xl font-semibold mb-1">{lang.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{lang.englishName}</p>
              
              {/* Level Badge */}
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                lang.level === 'native' 
                  ? 'bg-primary/20 text-primary' 
                  : 'bg-accent/20 text-accent'
              }`}>
                {t(`languages.${lang.level}`)}
              </span>
              
              {/* Proficiency Bar */}
              <div className="mt-6 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}