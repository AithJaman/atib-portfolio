import { useState, useEffect, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { AnimatedButton } from './AnimatedButton';
import { navigationConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { Link, useLocation } from 'react-router';
import { FileText, Globe, Sun, Moon } from 'lucide-react';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const { isDark, toggle } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const isCvPage = location.pathname === '/cv';

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-circ',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
        isScrolled ? 'bg-[#0a1628]/90 backdrop-blur-xl border-b border-blue-900/30' : 'bg-transparent')}>
        <div className="w-full px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center">
              <span className={cn("text-2xl font-bold tracking-tight transition-colors duration-500 gradient-text", isScrolled ? "from-blue-400 to-blue-600" : "from-blue-300 to-blue-500")}>
                {navigationConfig.logo[language]}
              </span>
            </a>
            <div className="hidden lg:flex items-center gap-10">
              {navigationConfig.links.map((link) => (
                <a key={link.label.en} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                  className={cn("text-sm font-medium transition-colors duration-500 relative group", isScrolled ? "text-blue-200/80 hover:text-white" : "text-blue-200/70 hover:text-white")}>
                  {link.label[language]}
                  <span className={cn("absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full bg-gradient-to-r from-blue-400 to-blue-600")} />
                </a>
              ))}
              <Link to="/cv"
                className={cn("text-sm font-medium transition-colors duration-500 relative group flex items-center gap-1.5", isScrolled ? "text-blue-200/80 hover:text-white" : "text-blue-200/70 hover:text-white", isCvPage && "text-blue-400")}>
                <FileText className="w-3.5 h-3.5" /> {language === 'zh' ? '简历' : 'CV'}
                <span className={cn("absolute -bottom-1 left-0 h-0.5 transition-all duration-300 bg-gradient-to-r from-blue-400 to-blue-600", isCvPage ? "w-full" : "w-0 group-hover:w-full")} />
              </Link>
            </div>
            {/* Desktop right controls */}
            <div className="hidden lg:flex items-center gap-3">
              <div className={cn("flex items-center rounded-full p-1 transition-colors duration-500 border", isScrolled ? "bg-blue-500/10 border-blue-400/20" : "bg-white/5 border-white/10")}>
                <button onClick={() => setLanguage('en')} className={cn("px-3 py-1 text-sm font-medium rounded-full transition-all flex items-center gap-1", language === 'en' ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "text-blue-300/60 hover:text-white")}><Globe className="w-3 h-3" />EN</button>
                <button onClick={() => setLanguage('zh')} className={cn("px-3 py-1 text-sm font-medium rounded-full transition-all flex items-center gap-1", language === 'zh' ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30" : "text-blue-300/60 hover:text-white")}><Globe className="w-3 h-3" />中文</button>
              </div>
              <button onClick={toggle} className={cn("w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border", isScrolled ? "bg-blue-500/10 border-blue-400/20 text-blue-300 hover:bg-blue-500 hover:text-white" : "bg-white/5 border-white/10 text-blue-200/60 hover:bg-blue-500 hover:text-white")} title="Toggle Dark Mode">
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <AnimatedButton href={navigationConfig.contactHref} variant={isScrolled ? "primary" : "outline-white"} size="md">
                {navigationConfig.contactLabel[language]}
              </AnimatedButton>
            </div>
            {/* Mobile: Language + Dark mode + Hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <div className={cn("flex items-center rounded-full p-0.5 transition-colors duration-500 border", isScrolled ? "bg-blue-500/10 border-blue-400/20" : "bg-white/5 border-white/10")}>
                <button onClick={() => setLanguage('en')} className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full transition-all", language === 'en' ? "bg-blue-500 text-white" : "text-blue-300/60")}>EN</button>
                <button onClick={() => setLanguage('zh')} className={cn("px-2 py-0.5 text-[10px] font-bold rounded-full transition-all", language === 'zh' ? "bg-blue-500 text-white" : "text-blue-300/60")}>中文</button>
              </div>
              <button onClick={toggle} className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 border", isScrolled ? "bg-blue-500/10 border-blue-400/20 text-blue-300" : "bg-white/5 border-white/10 text-blue-200/60")} title="Toggle Dark Mode">
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative w-8 h-6 flex flex-col justify-between" aria-label="Toggle menu">
                <span className={cn('w-full h-0.5 transition-all origin-center', isScrolled ? 'bg-blue-200' : 'bg-white', isMenuOpen && 'translate-y-[10px] rotate-[-45deg]')} />
                <span className={cn('w-full h-0.5 transition-all', isScrolled ? 'bg-blue-200' : 'bg-white', isMenuOpen && 'scale-0 opacity-0')} />
                <span className={cn('w-full h-0.5 transition-all origin-center', isScrolled ? 'bg-blue-200' : 'bg-white', isMenuOpen && '-translate-y-[10px] rotate-[45deg]')} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={cn('fixed inset-0 z-40 bg-[#0a1628]/95 backdrop-blur-xl transition-all lg:hidden', isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none')}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navigationConfig.links.map((link, index) => (
            <a key={link.label.en} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className={cn('text-3xl font-bold text-white transition-all', isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
              style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms' }}>{link.label[language]}</a>
          ))}
          <Link to="/cv" onClick={() => setIsMenuOpen(false)}
            className={cn('text-3xl font-bold text-white transition-all flex items-center gap-2', isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8', isCvPage && 'text-blue-400')}
            style={{ transitionDelay: isMenuOpen ? `${navigationConfig.links.length * 100}ms` : '0ms' }}>
            <FileText className="w-6 h-6" /> {language === 'zh' ? '简历' : 'CV'}
          </Link>
          <AnimatedButton href={navigationConfig.contactHref} variant="primary" size="lg"
            className={cn('mt-4 transition-all', isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8')}
            style={{ transitionDelay: isMenuOpen ? `${(navigationConfig.links.length + 1) * 100}ms` : '0ms' }}>
            {navigationConfig.contactLabel[language]}
          </AnimatedButton>
        </div>
      </div>
    </>
  );
}
