import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { aboutConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const { language } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { containerRef: imagesRef, visibleItems } = useStaggerAnimation(aboutConfig.images.length, 150);

  const description = aboutConfig.description[language];
  const experienceLabel = aboutConfig.experienceLabel[language];
  const label = aboutConfig.label[language];

  return (
    <section id="about" className="w-full py-24 lg:py-32 relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-16 left-12 text-2xl opacity-10 animate-float-slow pointer-events-none select-none">🔧</div>
      <div className="absolute bottom-24 right-16 text-2xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '2s' }}>📊</div>

      <div className="container-large px-6 lg:px-12 relative">
        <div ref={sectionRef} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column - Text */}
          <div className="space-y-8">
            <div className={`transition-all duration-800 ease-out-quart ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500 font-medium">{label}</span>
            </div>
            <div className={`transition-all duration-800 ease-out-quart ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
              <p className="text-xl lg:text-2xl text-exvia-black leading-relaxed">{description}</p>
            </div>
            <div className={`flex items-end gap-3 pt-4 transition-all duration-800 ease-out-quart ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>
              <span className="text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 leading-none">{aboutConfig.experienceValue}</span>
              <span className="text-sm text-exvia-black/60 pb-3 whitespace-pre-line">{experienceLabel}</span>
            </div>
            <div className={`grid grid-cols-4 gap-6 pt-8 border-t border-blue-100 transition-all duration-800 ease-out-quart ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
              {aboutConfig.stats.map((stat, index) => (
                <div key={index} className="group">
                  <span className="block text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-400">{stat.value}</span>
                  <span className="text-sm text-exvia-black/60 whitespace-pre-line">{stat.label[language]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Images */}
          <div ref={imagesRef} className="grid grid-cols-2 gap-4">
            {aboutConfig.images.map((image, index) => (
              <div key={index} className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-out-quart ${index % 2 === 1 ? 'mt-8' : ''} ${visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="aspect-[4/5] relative group cursor-pointer">
                  <img src={image.src} alt={image.alt[language]} className="w-full h-full object-cover transition-transform duration-500 ease-out-quad group-hover:scale-105 rounded-2xl" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
