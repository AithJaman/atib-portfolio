import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigationConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  }, [language, setLanguage]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = navigationConfig.links;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-sm'
          : 'bg-[#0a1628]/90 backdrop-blur-sm'
      )}
    >
      <div className="container-large px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-semibold text-white"
          >
            {navigationConfig.logo[language]}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label[language]}
              </a>
            ))}

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-5 py-2 text-sm font-medium text-[#0a1628] bg-white rounded-full hover:opacity-90 transition-opacity"
            >
              {navigationConfig.contactLabel[language]}
            </button>

            {/* CV Download Button */}
            <a
              href="/atib-portfolio/documents/Atib-CV.pdf"
              download
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              {language === 'en' ? 'CV' : '简历'}
            </a>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {language === 'en' ? '中' : 'EN'}
                </span>
                {language === 'en' ? '中文' : 'EN'}
              </button>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-xs text-white/60 bg-transparent border-none cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[9px]">
                {language === 'en' ? '中' : 'EN'}
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 flex items-center justify-center text-white bg-transparent border-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a1628] border-t border-white/10">
          <div className="container-large px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block text-base font-medium py-3 text-white/80 hover:text-white transition-colors"
              >
                {link.label[language]}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full mt-2 px-5 py-2.5 text-sm font-medium text-[#0a1628] bg-white rounded-full"
            >
              {navigationConfig.contactLabel[language]}
            </button>
            {/* Mobile CV Download */}
            <a
              href="/atib-portfolio/documents/Atib-CV.pdf"
              download
              className="flex items-center justify-center gap-1.5 w-full mt-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-full"
            >
              <Download className="w-4 h-4" />
              {language === 'en' ? 'Download CV' : '下载简历'}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
