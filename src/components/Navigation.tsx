import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Download, Phone } from 'lucide-react';
import { Link } from 'react-router';
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
    if (!targetId) return;
    setTimeout(() => {
      const element = document.getElementById(targetId);
      if (element) {
        const navHeight = 80;
        const top = element.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 10);
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
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-sm font-medium text-white/70 hover:text-white transition-colors duration-300"
              >
                {link.label[language]}
              </a>
            ))}

            {/* Contact Button - white text + white border */}
            <a
              href="tel:+8613264910246"
              className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium text-white bg-transparent border border-white rounded-full hover:bg-white/10 transition-opacity"
            >
              <Phone className="w-3.5 h-3.5" />
              {navigationConfig.contactLabel[language]}
            </a>

            {/* CV Button - links to /cv page */}
            <Link
              to="/cv"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              {language === 'en' ? 'CV' : '简历'}
            </Link>

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
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="text-xs text-white/60 bg-transparent border-none cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-[9px]">
                {language === 'en' ? '中' : 'EN'}
              </span>
            </button>
            {/* Hamburger */}
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
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="block text-base font-medium py-3 text-white/80 hover:text-white transition-colors"
              >
                {link.label[language]}
              </a>
            ))}
            {/* Mobile Contact - phone */}
            <a
              href="tel:+8613264910246"
              className="flex items-center justify-center gap-1.5 w-full mt-2 px-5 py-2.5 text-sm font-medium text-white border border-white rounded-full hover:bg-white/10"
            >
              <Phone className="w-4 h-4" />
              {navigationConfig.contactLabel[language]}
            </a>
            {/* Mobile CV - links to /cv page */}
            <Link
              to="/cv"
              className="flex items-center justify-center gap-1.5 w-full mt-2 px-5 py-2.5 text-sm font-medium text-white border border-white/20 rounded-full"
            >
              <Download className="w-4 h-4" />
              {language === 'en' ? 'Download CV' : '下载简历'}
            </Link>
          </div>
                      {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 w-full mt-2 px-5 py-2.5 text-sm font-medium text-white/80 border border-white/20 rounded-full hover:bg-white/10"
            >
              {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
        </div>
      )}
    </nav>
  );
}
