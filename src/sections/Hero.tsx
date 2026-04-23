import { useEffect, useState, useRef, useCallback } from 'react';
import { heroConfig, personalInfo } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Mail, GraduationCap, ExternalLink, Download } from 'lucide-react';
import { Link } from 'react-router';

const boxSize = 450;
const halfBox = boxSize / 2;

export function Hero() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    section.style.setProperty('--mouse-x', `${x - halfBox}px`);
    section.style.setProperty('--mouse-y', `${y - halfBox}px`);
  }, []);

  const roles = heroConfig.roles[language];
  const name = heroConfig.name[language];

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen overflow-hidden bg-[#070f1d] md:cursor-none"
      onMouseMove={handleMouseMove}
      style={{ '--mouse-x': 'calc(42vw - 200px)', '--mouse-y': 'calc(28vh - 200px)' } as React.CSSProperties}
    >
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 md:w-80 md:h-80 bg-cyan-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />

      {/* Floating emojis */}
      <div className="absolute top-20 right-[15%] text-2xl md:text-3xl opacity-15 animate-float-slow pointer-events-none select-none">🎓</div>
      <div className="absolute top-1/3 left-[10%] text-xl md:text-2xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '1.5s' }}>⚙️</div>
      <div className="absolute bottom-1/3 right-[8%] text-xl md:text-2xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '3s' }}>🔬</div>
      <div className="absolute top-[60%] left-[20%] text-lg md:text-xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '4.5s' }}>💡</div>
      <div className="absolute bottom-20 left-[30%] text-xl md:text-2xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '2s' }}>🤖</div>
      <div className="absolute top-[40%] right-[25%] text-lg md:text-xl opacity-10 animate-float-slow pointer-events-none select-none" style={{ animationDelay: '6s' }}>⚡</div>

      {/* Background Image with Blur */}
      <div className={`absolute inset-0 transition-opacity duration-[1800ms] ${isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <img src={heroConfig.backgroundImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover" style={{ filter: 'blur(12px) brightness(0.35)' }} onLoad={() => setImageLoaded(true)} />
      </div>

      {/* Sharp Image Container - desktop only */}
      <div className={`absolute top-0 left-0 overflow-hidden pointer-events-none z-20 transition-opacity duration-[1800ms] hidden md:block ${isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: boxSize, height: boxSize, transform: 'translate3d(var(--mouse-x), var(--mouse-y), 0)', willChange: 'transform' }}>
        <div className="absolute inset-0" style={{ transform: 'translate3d(calc(var(--mouse-x) * -1), calc(var(--mouse-y) * -1), 0)', width: '100vw', height: '100vh', willChange: 'transform' }}>
          <img src={heroConfig.backgroundImage} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Square border frame with blue glow - desktop only */}
      <div className={`absolute top-0 left-0 pointer-events-none z-20 transition-opacity duration-[1800ms] hidden md:block ${isLoaded && imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ width: boxSize, height: boxSize, border: '2px solid rgba(37, 99, 235, 0.5)', boxShadow: '0 0 30px rgba(37, 99, 235, 0.3), inset 0 0 30px rgba(37, 99, 235, 0.1)', transform: 'translate3d(var(--mouse-x), var(--mouse-y), 0)', willChange: 'transform' }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-0.5 bg-blue-400/70" /><div className="absolute w-0.5 h-5 bg-blue-400/70" />
        </div>
      </div>

      {/* Role labels */}
      {roles[0] && (
        <div className={`absolute left-8 lg:left-16 top-1/3 -translate-y-1/2 z-30 transition-all duration-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '800ms' }}>
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-blue-300/60">{roles[0]}</span>
        </div>
      )}
      {roles[1] && (
        <div className={`absolute right-8 lg:right-16 top-1/3 -translate-y-1/2 z-30 transition-all duration-[1200ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
          <span className="text-xs font-geist-mono uppercase tracking-[0.3em] text-blue-300/60">{roles[1]}</span>
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-end min-h-screen px-6 lg:px-12 pointer-events-none">
        <div className={`flex flex-col items-center text-center transition-all duration-[1200ms] pb-4 md:pb-8 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          {/* Profile Photo with blue glow */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-blue-400/50 overflow-hidden mb-4 bg-white/5 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <img src="/atib-portfolio/images/atib-portrait.jpg" alt="Atib" className="w-full h-full object-cover" loading="eager" />
          </div>
          <p className="text-sm text-blue-200/50 mb-1">{personalInfo.fullName}</p>
          <p className="text-sm md:text-base text-blue-100/80 mb-2 max-w-xl">{heroConfig.tagline[language]}</p>
          <div className="flex items-center gap-4 text-blue-200/50 text-xs md:text-sm mb-4 flex-wrap justify-center">
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {personalInfo.location}</span>
            <span className="flex items-center gap-1 pointer-events-auto"><Mail className="w-3 h-3" /><a href={`mailto:${personalInfo.primaryEmail}`} className="hover:text-blue-300 transition-colors">{personalInfo.primaryEmail}</a></span>
            <span className="flex items-center gap-1 pointer-events-auto"><GraduationCap className="w-3 h-3" /><a href={personalInfo.researchGate} target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition-colors flex items-center gap-1">ResearchGate <ExternalLink className="w-2.5 h-2.5" /></a></span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-4 pointer-events-auto">
            {heroConfig.badges.map((badge, i) => (
              <span key={i} className="px-3 py-1.5 bg-blue-500/10 backdrop-blur-sm rounded-full text-xs text-blue-200/80 border border-blue-400/20 hover:bg-blue-500/20 hover:border-blue-400/40 transition-all cursor-default">{badge.icon} {badge.text[language]}</span>
            ))}
          </div>
          <Link
            to="/cv"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/20 hover:bg-blue-500/40 backdrop-blur-sm rounded-full text-sm text-blue-200 border border-blue-400/30 hover:border-blue-400/60 transition-all mb-6 pointer-events-auto hover:scale-105"
          >
            <Download className="w-4 h-4" />
            {language === 'zh' ? '下载简历' : 'Download CV'}
          </Link>
        </div>
        <div className={`text-center transition-all duration-[1200ms] pb-8 md:pb-12 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <h1 className="text-[clamp(2.5rem,14vw,8rem)] md:text-[clamp(3rem,12vw,12rem)] font-black text-white tracking-[-0.04em] leading-[0.85] break-words" style={{ textShadow: '0 0 60px rgba(37,99,235,0.3)' }}>{name}</h1>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070f1d] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
