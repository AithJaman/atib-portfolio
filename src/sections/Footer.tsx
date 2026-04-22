import { MapPin, Mail, Linkedin, BookOpen, GraduationCap, Github, Globe } from 'lucide-react';
import { footerConfig, personalInfo, institutions } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

function getIcon(iconName: string) {
  switch (iconName) {
    case 'Linkedin': return Linkedin; case 'BookOpen': return BookOpen; case 'GraduationCap': return GraduationCap;
    case 'Github': return Github; case 'Mail': return Mail; default: return Globe;
  }
}

export function Footer() {
  const { language } = useLanguage();
  const logo = footerConfig.logo[language]; const description = footerConfig.description[language];
  const copyright = footerConfig.copyright[language]; const credit = footerConfig.credit[language];

  return (
    <footer className="w-full bg-[#070f1d] text-white py-16 lg:py-20 border-t border-blue-900/30">
      <div className="container-large px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <span className="text-3xl font-bold tracking-tight gradient-text">{logo}</span>
            <p className="mt-4 text-blue-200/50 max-w-sm leading-relaxed">{description}</p>
            <div className="flex items-center gap-3 mt-6">
              {footerConfig.socialLinks.map((link, i) => {
                const IconComponent = getIcon(link.iconName);
                return (
                  <a key={i} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}
                    className="w-11 h-11 bg-blue-500/10 rounded-full flex items-center justify-center hover:bg-blue-500 transition-all group border border-blue-400/10 hover:border-blue-400/30">
                    <IconComponent className="w-4 h-4 text-blue-300 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6 space-y-2 text-sm text-blue-200/40">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400/40" />{personalInfo.location}</p>
              <a href={`mailto:${personalInfo.primaryEmail}`} className="flex items-center gap-2 hover:text-blue-300 transition-colors"><Mail className="w-4 h-4 text-blue-400/40" />{personalInfo.primaryEmail}</a>
              <p className="flex items-center gap-2">WeChat: {personalInfo.wechat}</p>
            </div>
          </div>
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-sm font-geist-mono uppercase tracking-widest text-blue-400/40 mb-4">{footerConfig.columns[0].title[language]}</h4>
            <ul className="space-y-3">
              {footerConfig.columns[0].links.map((link, i) => (
                <li key={i}><a href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-blue-200/60 hover:text-blue-400 transition-colors">{link.label[language]}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-sm font-geist-mono uppercase tracking-widest text-blue-400/40 mb-4">{footerConfig.columns[1].title[language]}</h4>
            <ul className="space-y-3">
              {footerConfig.columns[1].links.map((link, i) => (
                <li key={i}><a href={link.href} onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' }); }} className="text-blue-200/60 hover:text-blue-400 transition-colors">{link.label[language]}</a></li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-sm font-geist-mono uppercase tracking-widest text-blue-400/40 mb-4">{language === 'zh' ? '院校' : 'Institutions'}</h4>
            <ul className="space-y-3">
              {Object.values(institutions).map((inst, i) => (
                <li key={i}>
                  <a href={inst.url} target="_blank" rel="noopener noreferrer" className="text-blue-200/60 hover:text-blue-400 transition-colors text-sm flex items-center gap-1.5">
                    {language === 'zh' ? inst.nameZh : inst.name}
                    <svg className="w-3 h-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px bg-blue-900/30 my-12" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-blue-200/30">
          <p>{copyright}</p>
          <p>{credit}</p>
        </div>
      </div>
    </footer>
  );
}
