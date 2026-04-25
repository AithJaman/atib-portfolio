import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { personalInfo } from '@/config';
import { MapPin, Mail, Github, Linkedin, GraduationCap, ExternalLink } from 'lucide-react';

export function Hero() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const name = language === 'zh' ? personalInfo.nameCn : personalInfo.nameEn;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[90vh] bg-[#070f1d] overflow-hidden"
    >
      <div className="container-large px-6 lg:px-12 h-full min-h-[90vh] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-20">
          
          {/* LEFT SIDE - Text Content */}
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            
            {/* "Hi, I am" */}
            <p className="text-blue-300/70 text-sm font-geist-mono uppercase tracking-[0.2em] mb-3">
              {language === 'zh' ? '你好，我是' : 'Hi, I am'}
            </p>
            
            {/* Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {name}
            </h1>
            
            {/* Title */}
            <p className="text-lg md:text-xl text-blue-200/80 mb-2">
              {language === 'zh' ? '自动化与控制工程师' : 'Automation & Control Engineer'}
            </p>
            <p className="text-sm text-blue-200/50 mb-8">
              {language === 'zh' ? '研究员 / 硕士研究生' : 'Researcher / Master Candidate'}
            </p>
            
            {/* Location & Email */}
            <div className="flex flex-wrap items-center gap-4 text-blue-200/50 text-sm mb-8">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> 
                {personalInfo.location}
              </span>
              <a 
                href={`mailto:${personalInfo.primaryEmail}`} 
                className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
              >
                <Mail className="w-4 h-4" /> 
                {personalInfo.primaryEmail}
              </a>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href={personalInfo.researchGate} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500/30 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-white/80" />
              </a>
              <a 
                href="https://github.com/AithJaman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500/30 transition-all"
              >
                <Github className="w-5 h-5 text-white/80" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500/30 transition-all"
              >
                <Linkedin className="w-5 h-5 text-white/80" />
              </a>
            </div>
          </div>
          
          {/* RIGHT SIDE - Portrait Photo */}
          <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Blue glow behind image */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-3xl scale-110" />
              
              {/* Photo container */}
              <div className="relative w-64 h-80 md:w-80 md:h-[420px] rounded-2xl overflow-hidden border border-blue-400/20 shadow-[0_0_40px_rgba(37,99,235,0.2)]">
                <img 
                  src="/atib-portfolio/images/atib-portrait.jpg" 
                  alt={name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#070f1d] to-transparent pointer-events-none" />
    </section>
  );
}
