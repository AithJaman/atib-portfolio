import { useEffect, useState, useRef } from 'react';
import { heroConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, GraduationCap, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const name = heroConfig.name[language];
  const roles = heroConfig.roles[language];
  const tagline = heroConfig.tagline[language];

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
            
            {/* Role */}
            <p className="text-lg md:text-xl text-blue-200/80 mb-2">
              {roles[0] || ''}
            </p>
            <p className="text-sm text-blue-200/50 mb-8">
              {tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://www.researchgate.net/profile/Md-Atib" 
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
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                to="/cv"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-full text-sm text-white font-medium transition-all"
              >
                {language === 'zh' ? '下载简历' : 'Download CV'}
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-blue-400/30 hover:border-blue-400/60 rounded-full text-sm text-blue-200 transition-all"
              >
                <Mail className="w-4 h-4" />
                {language === 'zh' ? '联系我' : 'Contact Me'}
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
                  src={heroConfig.backgroundImage} 
                  alt={name}
                  className="w-full h-full object-cover"
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
