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
          ? 'bg-white/80 dark:bg-[#0a1628]/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="container-large px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-semibold text-[#0a1628] dark:text-white"
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
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:opacity-70',
                  isScrolled
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#0a1628]/70 hover:text-[#0a1628]'
                )}
              >
                {link.label[language]}
              </a>
            ))}

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection('#contact')}
              className="px-5 py-2 text-sm font-medium text-white bg-[#0a1628] dark:bg-white dark:text-[#0a1628] rounded-full hover:opacity-90 transition-opacity"
            >
              {navigationConfig.contactLabel[language]}
            </button>

            {/* CV Download Button */}
            <a
              href="/atib-portfolio/documents/Atib-CV.pdf"
              download
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                isScrolled
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-[#0a1628]/20 text-[#0a1628] hover:bg-[#0a1628]/5'
              )}
            >
              <Download className="w-3.5 h-3.5" />
              {language === 'en' ? 'CV' : '简历'}
            </a>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 pl-4 border-l border-[#0a1628]/10 dark:border-white/10">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 text-xs text-[#0a1628]/60 dark:text-white/60 hover:text-[#0a1628] dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                  {language === 'en' ? '中' : 'EN'}
                </span>
                {language === 'en' ? '中文' : 'EN'}
              </button>
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 flex items-center justify-center text-[#0a1628]/60 dark:text-white/60 hover:text-[#0a1628] dark:hover:text-white transition-colors bg-transparent border-none cursor-pointer"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="text-xs text-[#0a1628]/60 dark:text-white/60 bg-transparent border-none cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[9px]">
                {language === 'en' ? '中' : 'EN'}
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-8 h-8 flex items-center justify-center text-[#0a1628] dark:text-white bg-transparent border-none cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#0a1628] border-t border-[#0a1628]/10 dark:border-white/10">
          <div className="container-large px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => scrollToSection(link.href)}
                className={cn(
                  'block text-base font-medium py-3 text-[#0a1628]/80 dark:text-white/80 hover:text-[#0a1628] dark:hover:text-white transition-colors'
                )}
              >
                {link.label[language]}
              </a>
            ))}
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full mt-2 px-5 py-2.5 text-sm font-medium text-white bg-[#0a1628] dark:bg-white dark:text-[#0a1628] rounded-full"
            >
              {navigationConfig.contactLabel[language]}
            </button>
            {/* Mobile CV Download */}
            <a
              href="/atib-portfolio/documents/Atib-CV.pdf"
              download
              className="flex items-center justify-center gap-1.5 w-full mt-2 px-5 py-2.5 text-sm font-medium text-[#0a1628] dark:text-white border border-[#0a1628]/20 dark:border-white/20 rounded-full"
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
