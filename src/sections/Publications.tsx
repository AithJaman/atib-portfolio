import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { BookOpen, ChevronDown, ExternalLink, Users } from 'lucide-react';
import { publicationsConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export function Publications() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: listRef, visibleItems } = useStaggerAnimation(publicationsConfig.items.length, 150);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const label = publicationsConfig.label[language];
  const heading = publicationsConfig.heading[language];
  const description = publicationsConfig.description[language];

  return (
    <section id="publications" className="w-full py-24 lg:py-32 relative">
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-24 right-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">📚</div>
      <div className="container-large px-6 lg:px-12">
        <div ref={headerRef} className="max-w-3xl mb-12">
          <div className={`transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500 font-medium">{label}</span>
          </div>
          <h2 className={`text-h2 font-bold text-exvia-black mt-4 transition-all duration-800 whitespace-pre-line ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <span className="gradient-text">{heading}</span>
          </h2>
          <p className={`mt-4 text-lg text-exvia-black/60 leading-relaxed transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>{description}</p>
        </div>

        <div ref={listRef} className="space-y-4 max-w-4xl">
          {publicationsConfig.items.map((pub, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div key={index} className={`transition-all duration-700 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 lg:p-6 flex items-start gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm lg:text-base font-semibold text-exvia-black leading-snug">{pub.title}</h3>
                      <p className="text-xs text-blue-500 font-medium mt-1">{pub.journal} ({pub.year})</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-exvia-black/30 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0 border-t border-blue-50">
                      <div className="flex items-start gap-2 mt-3">
                        <Users className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-exvia-black/60">{pub.authors}</p>
                      </div>
                      <p className="text-sm text-exvia-black/50 mt-2">{pub.details}</p>
                      <p className="text-xs text-exvia-black/40 mt-2 italic">{pub.keywords[language]}</p>
                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors shadow-blue-sm">
                        <ExternalLink className="w-3 h-3" />{language === 'zh' ? '查看论文' : 'View Paper'}
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
