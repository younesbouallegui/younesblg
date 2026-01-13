import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function CertificationsSection() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const certifications = [
    { name: t('certifications.nvidiaDeepLearning'), org: t('certifications.nvidiaDeepLearningOrg'), date: t('certifications.nvidiaDeepLearningDate'), logo: 'NVIDIA', color: 'from-green-500 to-green-600' },
    { name: t('certifications.nvidiaAnomaly'), org: t('certifications.nvidiaAnomalyOrg'), date: t('certifications.nvidiaAnomalyDate'), logo: 'NVIDIA', color: 'from-green-500 to-green-600' },
    { name: t('certifications.nvidiaCybersecurity'), org: t('certifications.nvidiaCybersecurityOrg'), date: t('certifications.nvidiaCybersecurityDate'), logo: 'NVIDIA', color: 'from-green-500 to-green-600' },
    { name: t('certifications.hedera'), org: t('certifications.hederaOrg'), date: t('certifications.hederaDate'), logo: 'Hedera', color: 'from-purple-500 to-purple-600' },
    { name: t('certifications.huaweiDatacom'), org: t('certifications.huaweiDatacomOrg'), date: t('certifications.huaweiDatacomDate'), logo: 'Huawei', color: 'from-red-500 to-red-600' },
    { name: t('certifications.huawei5g'), org: t('certifications.huawei5gOrg'), date: t('certifications.huawei5gDate'), logo: 'Huawei', color: 'from-red-500 to-red-600' },
  ];

  return (
    <section id="certifications" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t('certifications.title')} <span className="gradient-text">{t('certifications.titleHighlight')}</span></h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t('certifications.description')}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div key={cert.name} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="glass-card-hover p-6 group">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cert.color} flex items-center justify-center mb-4`}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs uppercase tracking-wider text-primary font-medium">{cert.org}</span>
              <h3 className="font-display text-lg font-semibold mt-1 mb-2 group-hover:text-primary transition-colors">{cert.name}</h3>
              {cert.date && <p className="text-sm text-muted-foreground">{cert.date}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
