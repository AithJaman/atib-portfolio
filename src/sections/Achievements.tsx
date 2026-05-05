import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { achievementsConfig, type Achievement } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, X } from 'lucide-react';
import { useState } from 'react';

export function Achievements() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(achievementsConfig.items.length, 120);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const label = achievementsConfig.label[language];
  const heading = achievementsConfig.heading[language];
  const description = achievementsConfig.description[language];

  return (
    <section id="achievements" className="w-full py-24 lg:py-32 bg-white">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className={cn('transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-exvia-black/50">{label}</span>
          </div>
          <h2 className={cn('text-h2 font-semibold text-exvia-black mt-4 transition-all duration-800 ease-out-quart whitespace-pre-line', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>{heading}</h2>
          <p className={cn('mt-6 text-lg text-exvia-black/60 leading-relaxed transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '200ms' }}>{description}</p>
        </div>

        {/* Achievements Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievementsConfig.items.map((achievement, index) => (
            <div key={index} className={cn('group cursor-pointer transition-all duration-700 ease-out-quart', visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')} style={{ transitionDelay: `${index * 100}ms` }} onClick={() => setSelectedAchievement(achievement)}>
              <div className="relative overflow-hidden bg-exvia-subtle rounded-xl hover:shadow-xl transition-shadow duration-500">
                <div className="aspect-[4/3] relative">
                  <img src={achievement.image} alt={achievement.title[language]} className="w-full h-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-105" />
                  <div className="absolute inset-0 bg-exvia-black/0 group-hover:bg-exvia-black/30 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">{language === 'zh' ? '点击查看详情' : 'Click to View'}</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Award className="w-5 h-5 text-exvia-black" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold text-exvia-black group-hover:text-exvia-black/80 transition-colors">{achievement.title[language]}</h3>
                  <p className="text-sm text-exvia-black/50 mt-1">{achievement.subtitle[language]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal Popup */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedAchievement(null)}>
          <div className="absolute inset-0 bg-exvia-black/80 backdrop-blur-xl" />
          <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-4 right-4 w-10 h-10 bg-exvia-black/10 hover:bg-exvia-black/20 rounded-full flex items-center justify-center transition-all z-20">
              <X className="w-5 h-5" />
            </button>
            <div className="w-full aspect-[4/3] bg-exvia-subtle overflow-hidden rounded-t-3xl">
              <img src={selectedAchievement.certificateImage} alt={selectedAchievement.title[language]} className="w-full h-full object-contain p-4" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-xl font-bold text-exvia-black mb-1">{selectedAchievement.title[language]}</h3>
              <p className="text-sm text-exvia-black/50 mb-4">{selectedAchievement.subtitle[language]}</p>
              <p className="text-base text-exvia-black/70 leading-relaxed">{selectedAchievement.description[language]}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
