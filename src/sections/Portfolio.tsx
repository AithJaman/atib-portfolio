import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Target, Lightbulb, CheckCircle, Eye, ExternalLink } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';

function ProjectModal({ project, onClose, onPrev, onNext, currentIndex, total }: {
  project: typeof portfolioConfig.projects[0] | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}) {
  const { language } = useLanguage();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    if (project) { document.body.style.overflow = 'hidden'; window.addEventListener('keydown', handler); }
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [project, onClose, onPrev, onNext]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-[#0a1628]/85 backdrop-blur-xl" />
      <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all shadow-2xl border-2 border-white/30 hover:scale-110">
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[200] w-9 h-9 sm:w-12 sm:h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all shadow-2xl border-2 border-white/30 hover:scale-110">
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
      <button onClick={onClose} className="absolute top-3 right-3 z-[200] w-9 h-9 bg-black/50 hover:bg-blue-500 backdrop-blur-md rounded-full flex items-center justify-center transition-all shadow-xl border border-white/20">
        <X className="w-4 h-4 text-white" />
      </button>
      <div className="absolute top-3 left-14 z-[200] px-3 py-1 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full font-geist-mono border border-white/20">{currentIndex + 1} / {total}</div>

      <div className="relative z-10 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-2xl opacity-30 blur-xl" />
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-blue-100 max-h-[90vh] flex flex-col">
          <div className="relative h-44 sm:h-56 flex-shrink-0">
            <img src={project.image} alt={project.title[language]} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-20">
              <div className="flex flex-wrap gap-2 mb-1">
                <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">{project.category[language]}</span>
                <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">{project.year}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{project.title[language]}</h2>
            </div>
          </div>
          <div className="p-5 sm:p-6 overflow-y-auto flex-1">
            {/* Introduction */}
            <div className="flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4 text-amber-500" /><span className="text-xs font-geist-mono uppercase tracking-widest text-amber-500">{language === 'zh' ? '项目介绍' : 'Introduction'}</span></div>
            <p className="text-exvia-black/80 leading-relaxed text-sm mb-4">{project.introduction[language]}</p>
            {/* Objective */}
            <div className="flex items-center gap-2 mb-2"><Target className="w-4 h-4 text-blue-500" /><span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500">{language === 'zh' ? '项目目标' : 'Objective'}</span></div>
            <p className="text-exvia-black/80 leading-relaxed text-sm mb-4">{project.objective[language]}</p>
            {/* Result */}
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100 mb-4">
              <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="text-blue-700 font-medium text-sm">{project.result[language]}</span>
            </div>
            {/* Outcome */}
            <div className="flex items-center gap-2 mb-2"><CheckCircle className="w-4 h-4 text-green-500" /><span className="text-xs font-geist-mono uppercase tracking-widest text-green-500">{language === 'zh' ? '成果与影响' : 'Outcome'}</span></div>
            <p className="text-exvia-black/70 leading-relaxed text-sm">{project.outcome[language]}</p>
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white text-xs font-medium rounded-full hover:bg-blue-600 transition-colors">
                <ExternalLink className="w-3 h-3" />{language === 'zh' ? '查看详情' : 'View Details'}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const { language } = useLanguage();
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = portfolioConfig.projects;
  const c = portfolioConfig;

  const modalNext = () => { if (selectedIndex !== null) setSelectedIndex(selectedIndex === items.length - 1 ? 0 : selectedIndex + 1); };
  const modalPrev = () => { if (selectedIndex !== null) setSelectedIndex(selectedIndex === 0 ? items.length - 1 : selectedIndex - 1); };

  return (
    <section id="projects" className="w-full py-24 lg:py-32 bg-gradient-to-b from-transparent to-blue-50/30 relative">
      <div className="absolute top-10 left-10 w-48 h-48 bg-blue-400/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-16 right-16 text-3xl opacity-10 animate-float-slow pointer-events-none select-none">🔬</div>
      <div className="container-large px-6 lg:px-12">
        <div ref={headerRef} className="max-w-3xl mb-12">
          <div className={`transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-blue-500 font-medium">{c.label[language]}</span>
          </div>
          <h2 className={`text-h2 font-bold text-exvia-black mt-4 transition-all duration-800 whitespace-pre-line ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '100ms' }}>
            <span className="gradient-text">{c.heading[language]}</span>
          </h2>
          <p className={`mt-4 text-lg text-exvia-black/60 leading-relaxed transition-all duration-800 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '200ms' }}>{c.description[language]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((project, index) => (
            <div key={index} className={`group cursor-pointer transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${index * 80}ms` }} onClick={() => setSelectedIndex(index)}>
              <div className="relative overflow-hidden bg-white rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-blue-lg transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img src={project.image} alt={project.title[language]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" draggable={false} />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-500" />
                  <div className="absolute top-3 right-3"><span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full shadow-lg">{project.year}</span></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-blue-900/30 backdrop-blur-[2px]">
                    <div className="px-3 py-1.5 bg-white/90 rounded-full flex items-center gap-1.5 shadow-lg"><Eye className="w-3.5 h-3.5 text-blue-500" /><span className="text-xs font-medium text-exvia-black">{language === 'zh' ? '点击查看' : 'View'}</span></div>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"><ArrowUpRight className="w-3.5 h-3.5 text-white" /></div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-exvia-black group-hover:text-blue-600 transition-colors line-clamp-2">{project.title[language]}</h3>
                  <p className="text-xs text-exvia-black/50 mt-1">{project.category[language]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal project={selectedIndex !== null ? items[selectedIndex] : null} onClose={() => setSelectedIndex(null)} onPrev={modalPrev} onNext={modalNext} currentIndex={selectedIndex ?? 0} total={items.length} />
    </section>
  );
}
