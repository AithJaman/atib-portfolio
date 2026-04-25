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
      className="relative w-full min-h-screen overflow-hidden bg-[#0a1628]"
    >
      {/* LEFT SIDE - Light background with info */}
      <div className="absolute inset-0 bg-[#e8e8e8] lg:bg-[#e8e8e8]" />
      
      {/* RIGHT SIDE - Dark background with image (desktop only) */}
      <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full bg-[#070f1d]">
        {/* Diagonal cut using clip-path */}
        <div 
          className="absolute top-0 left-0 w-full h-full bg-[#070f1d]"
          style={{ 
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
            marginLeft: '-1px'
          }}
        />
        {/* Portrait Image - Full height */}
        <div className="absolute inset-0 flex items-end justify-center">
          <img 
            src="/atib-portfolio/images/atib-portrait.jpg" 
            alt={name}
            className="h-[92%] w-auto object-contain object-bottom"
            style={{ filter: 'brightness(0.95)' }}
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 container-large px-6 lg:px-16 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* LEFT CONTENT - Text */}
          <div className={`lg:col-span-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* "Hi, I am" */}
            <p className="text-gray-500 text-sm font-geist-mono uppercase tracking-[0.25em] mb-4">
              {language === 'zh' ? '你好，我是' : 'Hi, I am'}
            </p>
            
            {/* Name */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#0a1628] mb-4 leading-[0.95] tracking-tight">
              {name}
            </h1>
            
            {/* Role */}
            <p className="text-xl md:text-2xl text-gray-700 mb-2 font-medium">
              {roles[0] || ''}
            </p>
            <p className="text-sm text-gray-400 mb-10">
              {tagline}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-10">
              <a 
                href="https://www.researchgate.net/profile/Md-Atib" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://github.com/AithJaman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/cv"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-600 rounded-full text-sm text-white font-medium transition-all"
              >
                {language === 'zh' ? '下载简历' : 'Download CV'}
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-gray-300 hover:border-[#0a1628] rounded-full text-sm text-gray-600 hover:text-[#0a1628] transition-all"
              >
                <Mail className="w-4 h-4" />
                {language === 'zh' ? '联系我' : 'Contact Me'}
              </a>
            </div>
          </div>
          
          {/* Mobile Image (shown only on small screens) */}
          <div className={`lg:hidden flex justify-center transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/atib-portfolio/images/atib-portrait.jpg" 
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
