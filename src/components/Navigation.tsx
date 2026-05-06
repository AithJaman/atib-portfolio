import { cn } from '@/lib/utils';
import { navigationConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Globe, Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navigation() {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logo = navigationConfig.logo[language];
  const links = navigationConfig.links;
  const contactLabel = navigationConfig.contactLabel[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-lg'
          : 'bg-white/90 backdrop-blur-md'
      )}
    >
      <div className="container-large px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a
            href="#hero"
            className={cn(
              'text-xl font-bold tracking-tight transition-colors duration-300',
              isScrolled ? 'text-white' : 'text-[#0a1628]'
            )}
          >
            {logo}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:opacity-70',
                  isScrolled ? 'text-white/80 hover:text-white' : 'text-[#0a1628]/70 hover:text-[#0a1628]'
                )}
              >
                {link.label[language]}
              </a>
            ))}

            <a
              href="tel:+8613264910246"
              className={cn(
                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-white text-[#0a1628] hover:bg-white/90'
                  : 'bg-[#0a1628] text-white hover:bg-[#0a1628]/90'
              )}
            >
              <Phone className="w-3.5 h-3.5" />
              {contactLabel}
            </a>

            {/* Language Toggle - Desktop */}
            <button
              onClick={toggleLanguage}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 border',
                isScrolled
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-[#0a1628]/20 text-[#0a1628] hover:bg-[#0a1628]/5'
              )}
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'en' ? '中文' : 'EN'}
            </button>

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-[#0a1628]/10 text-[#0a1628] hover:bg-[#0a1628]/20'
              )}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile Right Side: Theme + Language + Menu */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-[#0a1628]/10 text-[#0a1628] hover:bg-[#0a1628]/20'
              )}
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Language Toggle - Mobile */}
            <button
              onClick={toggleLanguage}
              className={cn(
                'px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300',
                isScrolled
                  ? 'bg-white/10 text-white hover:bg-white/20'
                  : 'bg-[#0a1628]/10 text-[#0a1628] hover:bg-[#0a1628]/20'
              )}
            >
              {language === 'en' ? '中文' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                isScrolled
                  ? 'bg-white/10 text-white'
                  : 'bg-[#0a1628]/10 text-[#0a1628]'
              )}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={cn('lg:hidden absolute top-full left-0 right-0 border-t shadow-xl transition-colors duration-300', isScrolled ? 'bg-[#0a1628]/95 border-white/10' : 'bg-white/95 border-[#0a1628]/10')}>
          <div className="container-large px-6 py-6 flex flex-col gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'text-base font-medium py-2 transition-colors',
                  isScrolled ? 'text-white/80 hover:text-white' : 'text-[#0a1628]/70 hover:text-[#0a1628]'
                )}
              >
                {link.label[language]}
              </a>
            ))}
            <a
              href="tel:+8613264910246"
              className={cn(
                'flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-medium mt-2',
                isScrolled
                  ? 'bg-white text-[#0a1628]'
                  : 'bg-[#0a1628] text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              {contactLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
