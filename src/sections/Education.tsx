import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { GraduationCap, Calendar, ChevronDown, BookOpen, MapPin } from 'lucide-react';
import { educationConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export function Education() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: listRef, visibleItems } = useStaggerAnimation(educationConfig.items.length, 150);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const label = educationConfig.label[language];
  const heading = educationConfig.heading[language];
  const description = educationConfig.description[language];

  return (
    <section id="education" className="w-full py-24 lg:py-32 bg-gradient-to-b from-transparent to-blue-50/30 relative">
      <div className="absolute top-20 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">🎓</div>
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
          {educationConfig.items.map((edu, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div key={index} className={`transition-all duration-700 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 lg:p-6 flex items-start gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all shadow-blue-sm">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-exvia-black">{edu.degree[language]}</h3>
                      <p className="text-sm text-blue-600/80 font-medium mt-0.5">{language === 'zh' ? edu.institutionZh : edu.institution}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-exvia-black/50">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{edu.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{edu.location[language]}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-exvia-black/30 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0 border-t border-blue-50">
                      <div className="flex items-start gap-2 mt-3">
                        <BookOpen className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-exvia-black/70 leading-relaxed">{edu.thesis[language]}</p>
                      </div>
                      <p className="text-sm text-exvia-black/60 leading-relaxed mt-3">{edu.details[language]}</p>
                      <a href={edu.institutionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-blue-500 hover:text-blue-600 font-medium">
                        {language === 'zh' ? '访问学校官网' : 'Visit Institution'} <span className="text-[10px]">↗</span>
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
