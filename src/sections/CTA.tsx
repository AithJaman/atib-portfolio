import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ctaConfig, personalInfo, socialLinks } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, ArrowUpRight, Linkedin, BookOpen, GraduationCap, Github, MessageCircle, Download, FileText } from 'lucide-react';
import { Link } from 'react-router';

function getSocialIcon(iconName: string) {
  switch (iconName) {
    case 'Linkedin': return Linkedin; case 'BookOpen': return BookOpen; case 'GraduationCap': return GraduationCap;
    case 'Github': return Github; case 'Mail': return Mail; default: return ArrowUpRight;
  }
}

export function CTA() {
  const { language } = useLanguage();
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const [copiedWechat, setCopiedWechat] = useState(false);

  const heading = ctaConfig.heading[language];
  const description = ctaConfig.description[language];

  const handleCopyWechat = () => {
    navigator.clipboard.writeText(personalInfo.wechat).then(() => { setCopiedWechat(true); setTimeout(() => setCopiedWechat(false), 2000); });
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full py-32 lg:py-40 overflow-hidden">
      {/* Animated blue gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0f2850] to-[#0a1628]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[200px]" />
      </div>
      <div className="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 container-large px-6 lg:px-12">
        <div className={`flex flex-wrap justify-center gap-2 mb-8 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {ctaConfig.tags[language].map((tag, i) => <span key={i} className="px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full text-sm text-blue-200/80 border border-blue-400/20">{tag}</span>)}
        </div>
        <h2 className={`text-h2 font-bold text-white text-center whitespace-pre-line transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms', textShadow: '0 0 40px rgba(37,99,235,0.3)' }}>{heading}</h2>
        <p className={`mt-6 text-lg text-blue-200/70 text-center max-w-2xl mx-auto transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>{description}</p>

        <div className={`mt-16 grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '300ms' }}>
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white mb-6">{language === 'zh' ? '联系方式' : 'Get In Touch'}</h3>
            <a href={`mailto:${personalInfo.primaryEmail}`} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all"><Mail className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" /></div>
              <div><p className="text-sm text-blue-300/50">Email</p><p className="text-white font-medium group-hover:text-blue-300 transition-colors">{personalInfo.primaryEmail}</p></div>
            </a>
            <a href={`mailto:${personalInfo.emails[1]}`} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all"><Mail className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" /></div>
              <div><p className="text-sm text-blue-300/50">{language === 'zh' ? '备用邮箱' : 'Secondary Email'}</p><p className="text-white font-medium group-hover:text-blue-300 transition-colors">{personalInfo.emails[1]}</p></div>
            </a>
            <button onClick={handleCopyWechat} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all w-full text-left">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all"><MessageCircle className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" /></div>
              <div><p className="text-sm text-blue-300/50">WeChat / 微信</p><p className="text-white font-medium group-hover:text-blue-300 transition-colors">{personalInfo.wechat} {copiedWechat && <span className="text-green-400 text-sm ml-2">Copied!</span>}</p></div>
            </button>
            <Link to="/cv" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-white/5 transition-all border border-blue-400/20 hover:border-blue-400/40">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all"><FileText className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" /></div>
              <div className="flex-1"><p className="text-sm text-blue-300/50">{language === 'zh' ? '完整简历' : 'Full CV'}</p><p className="text-white font-medium group-hover:text-blue-300 transition-colors flex items-center gap-1">{language === 'zh' ? '查看/下载简历' : 'View / Download CV'} <Download className="w-3.5 h-3.5" /></p></div>
            </Link>
          </div>
          <div className="space-y-5">
            <h3 className="text-xl font-semibold text-white mb-6">{language === 'zh' ? '在线联系' : 'Connect Online'}</h3>
            {socialLinks.map((link, index) => {
              const IconComponent = getSocialIcon(link.icon);
              return (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-blue-500/20 border border-blue-400/10 hover:border-blue-400/30 transition-all group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition-all group-hover:scale-110">
                    <IconComponent className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1"><p className="text-white font-medium group-hover:text-blue-300 transition-colors">{link.label}</p></div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              );
            })}
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '400ms' }}>
          <a href={ctaConfig.buttonHref} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:from-blue-400 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-blue-lg hover:shadow-glow">
            <Mail className="w-5 h-5" />{language === 'zh' ? '发送邮件' : 'Send an Email'}
          </a>
        </div>
      </div>
    </section>
  );
}
