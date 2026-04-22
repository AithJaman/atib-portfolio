import { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Slide {
  image: string;
  title: Record<string, string>;
  subtitle: Record<string, string>;
}

const slides: Slide[] = [
  { image: '/images/slide-1.jpg', title: { en: 'Portfolio Preview', zh: '作品集预览' }, subtitle: { en: 'Projects showcase in desktop view', zh: '桌面端项目展示' } },
  { image: '/images/slide-2.jpg', title: { en: 'Mobile Responsive', zh: '移动端适配' }, subtitle: { en: 'Perfect display on all devices', zh: '在所有设备上完美显示' } },
  { image: '/images/portfolio-1.jpg', title: { en: 'Vector-Thrust Airship', zh: '矢量推力球形室内飞艇' }, subtitle: { en: 'Robust nonlinear control research', zh: '鲁棒非线性控制研究' } },
  { image: '/images/portfolio-2.jpg', title: { en: 'Smart Home Automation', zh: '智能家居自动化' }, subtitle: { en: 'PLC-based intelligent control system', zh: '基于PLC的智能控制系统' } },
  { image: '/images/portfolio-3.jpg', title: { en: 'AI E-Commerce', zh: 'AI电商内容自动化' }, subtitle: { en: 'Deep learning image classification', zh: '深度学习图像分类' } },
  { image: '/images/portfolio-4.jpg', title: { en: 'Solar Power Plant', zh: '10kW太阳能电站' }, subtitle: { en: 'Renewable energy system design', zh: '可再生能源系统设计' } },
];

export function ImageSlider() {
  const { language } = useLanguage();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (!isPaused) intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, next]);

  return (
    <section id="slider" className="w-full py-16 lg:py-24 bg-gradient-to-b from-[#070f1d] to-[#0a1628]" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="container-large px-6 lg:px-12">
        <div className="text-center mb-10">
          <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-400/60">{language === 'zh' ? '作品展示' : 'Portfolio Showcase'}</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">{language === 'zh' ? '精选项目预览' : 'Featured Projects Preview'}</h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/10] lg:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/30 border border-blue-900/30">
            {slides.map((slide, index) => (
              <div key={index} className={`absolute inset-0 transition-all duration-700 ${index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
                <img src={slide.image} alt={slide.title[language]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-[#0a1628]/30" />
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-10">
                  <h3 className="text-xl lg:text-3xl font-bold text-white mb-2">{slide.title[language]}</h3>
                  <p className="text-sm lg:text-base text-blue-200/60">{slide.subtitle[language]}</p>
                </div>
              </div>
            ))}
            <div className="absolute top-4 right-4 px-3 py-1.5 bg-blue-500/20 backdrop-blur-sm rounded-full text-xs text-blue-200/80 font-geist-mono border border-blue-400/20">
              {current + 1} / {slides.length}
            </div>
          </div>

          <button onClick={prev} className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-14 lg:h-14 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-blue-500/30 border-2 border-white/20"><ChevronLeft className="w-5 h-5 lg:w-7 lg:h-7 text-white" /></button>
          <button onClick={next} className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-14 lg:h-14 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-blue-500/30 border-2 border-white/20"><ChevronRight className="w-5 h-5 lg:w-7 lg:h-7 text-white" /></button>

          <div className="flex items-center justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button key={index} onClick={() => setCurrent(index)} className={`transition-all duration-300 rounded-full ${index === current ? 'w-8 h-3 bg-blue-500 shadow-glow' : 'w-3 h-3 bg-white/20 hover:bg-white/40'}`} />
            ))}
          </div>
          <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden max-w-md mx-auto">
            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500" style={{ width: `${((current + 1) / slides.length) * 100}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
