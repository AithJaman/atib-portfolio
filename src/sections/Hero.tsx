import { useEffect, useState } from 'react';
import { heroConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, GraduationCap, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router';

export function Hero() {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const name = heroConfig.name[language];
  const roles = heroConfig.roles[language];
  const tagline = heroConfig.tagline[language];

  return (
    <section id="hero" className="relative w-full min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#e8e8e8]">

      {/* RIGHT SIDE — Dark area with diagonal cut */}
      <div
        className="absolute top-0 right-0 h-full bg-[#0a1628]"
        style={{
          width: '52%',
          clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)'
        }}
      />

      {/* PORTRAIT IMAGE */}
      <div className="absolute top-0 right-0 h-full hidden lg:flex items-end justify-center"
        style={{ width: '52%' }}>
        <img
          src="/atib-portfolio/images/atib-portrait.png"
          alt={name}
          className="h-[90%] w-auto max-w-full object-cover"
          style={{
            objectPosition: 'center 10%',
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* CONTENT — Left side */}
      <div className="relative z-10 container-large px-6 lg:px-16 h-full min-h-[90vh] lg:min-h-screen flex items-center">
        <div className={`max-w-xl transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

          {/* Hi I am — Blue color */}
          <p className="text-[#2d5a8b] text-sm font-bold font-geist-mono uppercase tracking-[0.25em] mb-4">
            {language === 'zh' ? '你好，我是' : 'Hi, I am'}
          </p>

          {/* NAME — Dark blue, EXTRA BOLD */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#0a1628] mb-3 leading-[0.95]">
            {name}
          </h1>

          {/* ROLE — Dark blue, bold */}
          <p className="text-xl md:text-2xl text-[#1e3a5f] mb-1 font-bold">
            {roles[0] || ''}
          </p>
          <p className="text-base text-[#4a6fa5] mb-10 font-medium">
            {tagline}
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mb-10">
            <a href="https://www.researchgate.net/profile/Md-Atib" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all">
              <GraduationCap className="w-5 h-5 text-white" />
            </a>
            <a href="https://github.com/AithJaman" target="_blank" rel="noopener noreferrer"
              className="w-11 h-11 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all">
              <Github className="w-5 h-5 text-white" />
            </a>
            <a href="#" className="w-11 h-11 rounded-full bg-[#0a1628] flex items-center justify-center hover:bg-blue-600 transition-all">
              <Linkedin className="w-5 h-5 text-white" />
            </a>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/cv"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 rounded-full text-sm text-white font-bold transition-all">
              {language === 'zh' ? '下载简历' : 'Download CV'}
            </Link>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#2d5a8b] hover:bg-[#2d5a8b] hover:text-white rounded-full text-sm text-[#2d5a8b] font-bold transition-all">
              <Mail className="w-4 h-4" />
              {language === 'zh' ? '联系我' : 'Contact Me'}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile image */}
      <div className={`lg:hidden absolute bottom-0 right-0 w-full flex justify-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-64 h-72 mt-8">
          <div className="absolute inset-0 bg-gradient-to-t from-[#e8e8e8] via-transparent to-transparent z-10" />
          <img
            src="/atib-portfolio/images/atib-portrait.png"
            alt={name}
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  );
}
