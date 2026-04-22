import { useState } from 'react';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { Cpu, Settings, Box, Brain, type LucideIcon, ChevronDown } from 'lucide-react';
import { skillsConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

const iconMap: Record<string, LucideIcon> = { Cpu, Settings, Box, Brain };
function getIcon(iconName: string): LucideIcon { return iconMap[iconName] || Cpu; }

export function Skills() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(skillsConfig.categories.length, 120);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const label = skillsConfig.label[language];
  const heading = skillsConfig.heading[language];
  const description = skillsConfig.description[language];

  return (
    <section id="skills" className="w-full py-24 lg:py-32 bg-gradient-to-b from-blue-50/30 to-transparent relative">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-24 left-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">⚙️</div>
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

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {skillsConfig.categories.map((category, index) => {
            const IconComponent = getIcon(category.icon);
            const isExpanded = expandedIndex === index;
            return (
              <div key={index} className={`group transition-all duration-700 ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 100}ms` }}>
                <div className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 overflow-hidden">
                  <button onClick={() => setExpandedIndex(isExpanded ? null : index)} className="w-full text-left p-5 lg:p-6 flex items-center gap-4 hover:bg-blue-50/30 transition-colors">
                    <div className="flex-shrink-0 w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-exvia-black">{category.title[language]}</h3>
                      <p className="text-xs text-exvia-black/40 mt-0.5">{category.skills.length} {language === 'zh' ? '项技能' : 'skills'}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-exvia-black/30 flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-hidden transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 lg:px-6 pb-5 lg:pb-6 pt-0 border-t border-blue-50">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {category.skills.map((skill, i) => (
                          <span key={i} className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-exvia-black/80 border border-blue-100">{skill}</span>
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
