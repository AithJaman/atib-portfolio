import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Briefcase, MapPin, Calendar, ChevronDown, Award } from 'lucide-react';
import { workExperienceConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export function WorkExperience() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: listRef, visibleItems } = useStaggerAnimation(workExperienceConfig.items.length, 150);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const c = workExperienceConfig;

  return (
    <section id="experience" className="w-full py-24 lg:py-32 bg-gradient-to-b from-transparent to-blue-50/30 relative">
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-24 right-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">💼</div>
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

        <div ref={listRef} className="space-y-4 max-w-4xl">
          {c.items.map((item, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div key={index} className={`group transition-all duration-700 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  {/* Header - always visible */}
                  <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 lg:p-6 flex items-start gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-blue-sm">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base lg:text-lg font-semibold text-exvia-black">{item.title[language]}</h3>
                        <span className="px-2 py-0.5 bg-blue-50 rounded-full text-[10px] font-geist-mono text-blue-600 border border-blue-100">{item.type[language]}</span>
                      </div>
                      <p className="text-sm text-blue-600/80 font-medium">{item.company[language]}</p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-exvia-black/50">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{item.period}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{item.location[language]}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-exvia-black/30 flex-shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expandable content */}
                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0 border-t border-blue-50">
                      <p className="text-sm text-exvia-black/70 leading-relaxed mt-4">{item.description[language]}</p>
                      <div className="mt-4 space-y-2">
                        {item.achievements.map((ach, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Award className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-exvia-black/60">{ach[language]}</span>
                          </div>
                        ))}
                      </div>
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
