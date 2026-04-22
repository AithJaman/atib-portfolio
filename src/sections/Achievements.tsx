import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { achievementsConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export function Achievements() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = achievementsConfig.items;

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(idx < 0 ? items.length - 1 : idx >= items.length ? 0 : idx);
  }, [items.length]);

  // Auto-slide every 5s
  useEffect(() => {
    if (!isPaused) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex(p => (p + 1) % items.length);
      }, 5000);
    }
    return () => { if (autoSlideRef.current) clearInterval(autoSlideRef.current); };
  }, [isPaused, items.length]);

  const goNext = () => { goTo(currentIndex + 1); };
  const goPrev = () => { goTo(currentIndex - 1); };

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) goNext(); else if (diff < -60) goPrev();
  };

  const item = items[currentIndex];
  const c = achievementsConfig;

  return (
    <section id="achievements" className="w-full py-20 lg:py-28 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-64 h-64 lg:w-72 lg:h-72 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-16 right-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">🏆</div>

      <div className="container-large px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-8 sm:mb-10">
          <div className={`transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500 font-medium">{c.label[language]}</span>
          </div>
          <h2 className={`text-h2 font-bold text-exvia-black mt-4 transition-all duration-800 whitespace-pre-line ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <span className="gradient-text">{c.heading[language]}</span>
          </h2>
        </div>

        {/* Single-row Auto-sliding Carousel */}
        <div className="relative max-w-4xl mx-auto" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          {/* Left Arrow */}
          <button onClick={goPrev} className="absolute left-0 sm:left-2 top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm hover:bg-blue-500 rounded-full flex items-center justify-center transition-all shadow-lg border border-blue-100 hover:border-blue-300 group">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-exvia-black/70 group-hover:text-white" />
          </button>
          {/* Right Arrow */}
          <button onClick={goNext} className="absolute right-0 sm:right-2 top-1/3 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm hover:bg-blue-500 rounded-full flex items-center justify-center transition-all shadow-lg border border-blue-100 hover:border-blue-300 group">
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-exvia-black/70 group-hover:text-white" />
          </button>

          {/* Image Track - single image */}
          <div className="overflow-hidden rounded-2xl mx-10 sm:mx-14">
            <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {items.map((achievement, idx) => (
                <div key={idx} className="w-full flex-shrink-0">
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden rounded-2xl">
                    <img src={achievement.image} alt={achievement.title[language]} className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent" />
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-blue-300" />
                        <span className="px-2 py-0.5 bg-blue-500 text-white text-[10px] sm:text-xs font-bold rounded-full">{achievement.year}</span>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-white mb-1">{achievement.title[language]}</h3>
                      <p className="text-sm sm:text-base text-white/70">{achievement.subtitle[language]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail text below image */}
          <div className="mt-4 sm:mt-6 text-center px-4">
            <p className="text-sm sm:text-base text-exvia-black/60 leading-relaxed max-w-2xl mx-auto transition-all duration-500">{item.description[language]}</p>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center justify-center gap-2 mt-5">
            {items.map((_, idx) => (
              <button key={idx} onClick={() => goTo(idx)} className={`transition-all duration-300 rounded-full ${currentIndex === idx ? 'w-6 h-2 bg-blue-500' : 'w-2 h-2 bg-blue-200 hover:bg-blue-300'}`} />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center mt-2">
            <span className="text-xs font-geist-mono text-exvia-black/30">{currentIndex + 1} / {items.length}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
