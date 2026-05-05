import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { achievementsConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRef, useState, useCallback, useEffect } from 'react';

export function Achievements() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const label = achievementsConfig.label[language];
  const heading = achievementsConfig.heading[language];
  const description = achievementsConfig.description[language];
  const totalItems = achievementsConfig.items.length;

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const cardWidth = el.clientWidth * 0.25 || 300;
    
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);
    
    const newIndex = Math.round(scrollLeft / cardWidth);
    if (newIndex >= 0 && newIndex < totalItems) {
      setActiveIndex(newIndex);
    }
  }, [totalItems]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    const timer = setTimeout(checkScroll, 500);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      clearTimeout(timer);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const cardWidth = el.clientWidth * 0.25 || 300;
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  return (
    <section id="achievements" className="w-full py-24 lg:py-32 bg-[#0a1628]">
      <div className="container-large px-6 lg:px-12">
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div className={cn('transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4')}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-white/50">{label}</span>
          </div>
          <h2 className={cn('text-h2 font-bold text-white mt-4 transition-all duration-800 ease-out-quart whitespace-pre-line', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '100ms' }}>{heading}</h2>
          <p className={cn('mt-6 text-lg text-white/60 leading-relaxed transition-all duration-800 ease-out-quart', headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')} style={{ transitionDelay: '200ms' }}>{description}</p>
        </div>

        <div className="relative">
          {/* Left Arrow */}
          <button onClick={() => scroll('left')} className={cn('absolute left-0 top-1/3 -translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500', canScrollLeft ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} aria-label="Previous">
            <ChevronLeft className="w-5 h-5 text-[#0a1628]" />
          </button>

          {/* Right Arrow */}
          <button onClick={() => scroll('right')} className={cn('absolute right-0 top-1/3 translate-x-4 z-10 w-12 h-12 rounded-full bg-white shadow-lg border border-white/20 flex items-center justify-center transition-all duration-300 hover:bg-blue-500 hover:text-white hover:border-blue-500', canScrollRight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none')} aria-label="Next">
            <ChevronRight className="w-5 h-5 text-[#0a1628]" />
          </button>

          {/* Scrollable Track */}
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {achievementsConfig.items.map((achievement, index) => (
              <div key={index} className="group cursor-pointer flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(25%-18px)]" onClick={() => setSelectedAchievement(achievement)}>
                <div className="relative overflow-hidden bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/40 transition-all duration-500">
                  <div className="aspect-[4/3] relative">
                    <img src={achievement.image} alt={achievement.title[language]} className="w-full h-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-105" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/atib-portfolio/images/hero-bg.jpg'; }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
                      <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/40 px-4 py-2 rounded-full backdrop-blur-sm">{language === 'zh' ? '点击查看证书' : 'View Certificate'}</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-[#0a1628]" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">{achievement.title[language]}</h3>
                    <p className="text-sm text-white/50 mt-1 line-clamp-2">{achievement.subtitle[language]}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 7 Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {achievementsConfig.items.map((_, index) => (
              <button key={index} onClick={() => scrollToIndex(index)} className={cn('h-3 rounded-full transition-all duration-300', activeIndex === index ? 'bg-blue-500 w-8' : 'bg-white/30 hover:bg-white/50 w-3')} aria-label={`Slide ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedAchievement && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedAchievement(null)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
          <div className="relative z-10 bg-[#0f1d32] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedAchievement(null)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all z-20">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="w-full bg-[#0a1628] overflow-hidden rounded-t-3xl">
              <img src={selectedAchievement.certificateImage} alt={selectedAchievement.title[language]} className="w-full h-auto max-h-[60vh] object-contain p-4" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white mb-1">{selectedAchievement.title[language]}</h3>
              <p className="text-sm text-blue-300 mb-4">{selectedAchievement.subtitle[language]}</p>
              <p className="text-base text-white/70 leading-relaxed">{selectedAchievement.description[language]}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
