import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { FileText, Award, BookOpen, Download, ChevronDown, ExternalLink } from 'lucide-react';
import { documentsConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, typeof FileText> = { FileText, Award, BookOpen };

export function Documents() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const c = documentsConfig;

  return (
    <section id="documents" className="w-full py-24 lg:py-32 bg-gradient-to-b from-blue-50/30 to-white relative">
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-24 left-12 text-2xl opacity-10 animate-float-slow pointer-events-none select-none">📄</div>
      <div className="container-large px-6 lg:px-12">
        <div ref={headerRef} className="max-w-3xl mb-12">
          <div className={`transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500 font-medium">{c.label[language]}</span>
          </div>
          <h2 className={`text-h2 font-bold text-exvia-black mt-4 transition-all duration-800 whitespace-pre-line ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <span className="gradient-text">{c.heading[language]}</span>
          </h2>
          <p className={`mt-4 text-lg text-exvia-black/60 leading-relaxed transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>{c.description[language]}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {c.items.map((doc, index) => {
            const IconComponent = iconMap[doc.icon] || FileText;
            const isExpanded = expandedIndex === index;
            const isExternal = doc.downloadUrl.startsWith('http');
            return (
              <div key={index} className={`transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 80}ms` }}>
                <div className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 flex items-center gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-exvia-black truncate">{doc.title[language]}</h3>
                      <p className="text-xs text-exvia-black/40 mt-0.5">{doc.fileSize}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-exvia-black/30 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-400 ${isExpanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-4 pt-0 border-t border-blue-50">
                      <p className="text-xs text-exvia-black/60 leading-relaxed mt-3">{doc.description[language]}</p>
                      <a href={doc.downloadUrl} target={isExternal ? '_blank' : undefined} rel="noopener noreferrer" download={!isExternal}
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors shadow-blue-sm">
                        {isExternal ? <><ExternalLink className="w-3 h-3" />{language === 'zh' ? '查看论文' : 'View Paper'}</> : <><Download className="w-3 h-3" />{language === 'zh' ? '下载文件' : 'Download'}</>}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
