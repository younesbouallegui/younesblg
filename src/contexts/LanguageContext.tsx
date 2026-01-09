import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.workflows': 'Workflows',
    'nav.projects': 'Projects',
    'nav.experience': 'Experience',
    'nav.certificates': 'Certificates',
    'nav.languages': 'Languages',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.available': 'Available for new opportunities',
    'hero.title1': 'DevOps &',
    'hero.title2': 'Automation Engineer',
    'hero.tagline': 'Building intelligent automation and scalable systems',
    'hero.viewProjects': 'View Projects',
    'hero.myWorkflows': 'My Workflows',
    
    // About
    'about.title': 'About Me',
    'about.description': 'Passionate about creating efficient, automated solutions that drive business value.',
    
    // Skills
    'skills.title': 'Skills & Stack',
    'skills.subtitle': 'Technologies and tools I work with',
    
    // Workflows
    'workflows.title': 'n8n Workflows',
    'workflows.subtitle': 'Automated solutions built with n8n',
    
    // Projects
    'projects.title': 'Projects',
    'projects.subtitle': 'Featured work and personal projects',
    
    // Experience
    'experience.title': 'Experience',
    'experience.subtitle': 'Professional journey and achievements',
    
    // Certificates
    'certificates.title': 'Certifications',
    'certificates.subtitle': 'Professional certifications validating expertise across cloud, DevOps, and emerging technologies',
    
    // Languages
    'languages.title': 'Languages',
    'languages.subtitle': 'Multilingual communication skills for global collaboration',
    'languages.native': 'Native',
    'languages.fluent': 'Fluent',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': "Let's work together",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    
    // Footer
    'footer.rights': 'All rights reserved',
  },
  fr: {
    // Navbar
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.workflows': 'Workflows',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.certificates': 'Certificats',
    'nav.languages': 'Langues',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.available': 'Disponible pour de nouvelles opportunités',
    'hero.title1': 'Ingénieur',
    'hero.title2': 'DevOps & Automatisation',
    'hero.tagline': 'Construire des automatisations intelligentes et des systèmes évolutifs',
    'hero.viewProjects': 'Voir les Projets',
    'hero.myWorkflows': 'Mes Workflows',
    
    // About
    'about.title': 'À Propos de Moi',
    'about.description': 'Passionné par la création de solutions efficaces et automatisées qui génèrent de la valeur commerciale.',
    
    // Skills
    'skills.title': 'Compétences & Technologies',
    'skills.subtitle': 'Technologies et outils avec lesquels je travaille',
    
    // Workflows
    'workflows.title': 'Workflows n8n',
    'workflows.subtitle': 'Solutions automatisées construites avec n8n',
    
    // Projects
    'projects.title': 'Projets',
    'projects.subtitle': 'Travaux en vedette et projets personnels',
    
    // Experience
    'experience.title': 'Expérience',
    'experience.subtitle': 'Parcours professionnel et réalisations',
    
    // Certificates
    'certificates.title': 'Certifications',
    'certificates.subtitle': 'Certifications professionnelles validant expertise en cloud, DevOps et technologies émergentes',
    
    // Languages
    'languages.title': 'Langues',
    'languages.subtitle': 'Compétences multilingues pour la collaboration mondiale',
    'languages.native': 'Natif',
    'languages.fluent': 'Courant',
    
    // Contact
    'contact.title': 'Me Contacter',
    'contact.subtitle': 'Travaillons ensemble',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    
    // Footer
    'footer.rights': 'Tous droits réservés',
  },
  ar: {
    // Navbar
    'nav.about': 'نبذة عني',
    'nav.skills': 'المهارات',
    'nav.workflows': 'سير العمل',
    'nav.projects': 'المشاريع',
    'nav.experience': 'الخبرات',
    'nav.certificates': 'الشهادات',
    'nav.languages': 'اللغات',
    'nav.contact': 'تواصل معي',
    
    // Hero
    'hero.available': 'متاح لفرص جديدة',
    'hero.title1': 'مهندس DevOps',
    'hero.title2': 'والأتمتة',
    'hero.tagline': 'بناء أنظمة أتمتة ذكية وقابلة للتوسع',
    'hero.viewProjects': 'عرض المشاريع',
    'hero.myWorkflows': 'سير العمل',
    
    // About
    'about.title': 'نبذة عني',
    'about.description': 'شغوف بإنشاء حلول فعالة وآلية تحقق قيمة تجارية.',
    
    // Skills
    'skills.title': 'المهارات والتقنيات',
    'skills.subtitle': 'التقنيات والأدوات التي أعمل بها',
    
    // Workflows
    'workflows.title': 'سير عمل n8n',
    'workflows.subtitle': 'حلول آلية مبنية باستخدام n8n',
    
    // Projects
    'projects.title': 'المشاريع',
    'projects.subtitle': 'أعمال مميزة ومشاريع شخصية',
    
    // Experience
    'experience.title': 'الخبرات',
    'experience.subtitle': 'المسيرة المهنية والإنجازات',
    
    // Certificates
    'certificates.title': 'الشهادات',
    'certificates.subtitle': 'شهادات مهنية تثبت الخبرة في السحابة و DevOps والتقنيات الناشئة',
    
    // Languages
    'languages.title': 'اللغات',
    'languages.subtitle': 'مهارات متعددة اللغات للتعاون العالمي',
    'languages.native': 'لغة أم',
    'languages.fluent': 'طلاقة',
    
    // Contact
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'لنعمل معًا',
    'contact.name': 'الاسم',
    'contact.email': 'البريد الإلكتروني',
    'contact.message': 'الرسالة',
    'contact.send': 'إرسال الرسالة',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
