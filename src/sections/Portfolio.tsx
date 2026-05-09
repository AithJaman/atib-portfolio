import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useCallback, useEffect } from 'react';

// ==================== IMAGE LIGHTBOX ====================
function ImageLightbox({ src, onClose }: { src: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const touch = useRef({ dist: 0, sc: 1, px: 0, py: 0, pinching: false, panning: false });

  const getDist = (t: any) => {
    const dx = t[0].clientX - t[1].clientX;
    const dy = t[0].clientY - t[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = (e: any) => {
    const c = touch.current;
    if (e.touches.length === 2) {
      c.pinching = true; c.panning = false;
      c.dist = getDist(e.touches); c.sc = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      c.panning = true; c.pinching = false;
      c.px = e.touches[0].clientX - pos.x;
      c.py = e.touches[0].clientY - pos.y;
    }
  };
  const onTouchMove = (e: any) => {
    e.preventDefault(); const c = touch.current;
    if (e.touches.length === 2 && c.pinching) {
      setScale(Math.min(Math.max(c.sc * (getDist(e.touches) / c.dist), 0.5), 5));
    } else if (e.touches.length === 1 && c.panning && scale > 1) {
      setPos({ x: e.touches[0].clientX - c.px, y: e.touches[0].clientY - c.py });
    }
  };
  const onTouchEnd = () => {
    const c = touch.current; c.pinching = false; c.panning = false;
    if (scale < 0.8) { setScale(1); setPos({ x: 0, y: 0 }); }
  };
  const toggleZoom = () => {
    if (scale > 1) { setScale(1); setPos({ x: 0, y: 0 }); }
    else setScale(2.5);
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] bg-black/95 flex flex-col" onClick={onClose}>
      <div className="flex items-center justify-between p-4 shrink-0">
        <button onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {scale > 1 ? '−' : '+'}
        </button>
        <span className="text-white/50 text-xs">{Math.round(scale * 100)}%</span>
        <button onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onDoubleClick={toggleZoom}>
        <img src={src} alt="" className="max-w-full max-h-full object-contain select-none"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }} draggable={false} />
      </div>
      <div className="text-center py-3 text-white/40 text-[10px] shrink-0">
        Pinch to zoom &middot; Double tap &middot; Click outside to close
      </div>
    </div>
  );
}

// ==================== PROJECT DETAIL MODAL ====================
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!project?.detail) return null;

  const detail = project.detail;
  const allImages = detail.images || [];
  const allVideos = detail.videos || [];
  const sortedImages = [...allImages].sort((a: string) => a.includes('overall') ? -1 : 0);

  const nextImage = useCallback(() => setCurrentImageIndex((p) => (p + 1) % sortedImages.length), [sortedImages.length]);
  const prevImage = useCallback(() => setCurrentImageIndex((p) => (p - 1 + sortedImages.length) % sortedImages.length), [sortedImages.length]);

  useEffect(() => { videoRefs.current.forEach((v) => v?.play().catch(() => {})); }, []);

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        <div className="relative w-full max-w-6xl max-h-[100dvh] sm:max-h-[95vh] overflow-y-auto bg-white dark:bg-[#0d1f38] sm:rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}>

          {/* Close Button */}
          <button onClick={onClose}
            className="sticky top-2 right-2 z-20 float-right w-9 h-9 bg-white/90 dark:bg-black/60 rounded-full flex items-center justify-center shadow m-2 border border-gray-200 dark:border-white/10">
            <X className="w-4 h-4 text-[#0a1628] dark:text-white" />
          </button>

          {/* POSTER - Full display + click to zoom */}
          <div className="w-full bg-[#0a1628] cursor-zoom-in" onClick={() => setLightboxImage(project.image)}>
            <img src={project.image} alt="" className="w-full h-auto max-h-[45vh] object-contain mx-auto" />
          </div>

          <div className="p-4 sm:p-8">
            {/* Title & Year */}
            <div className="mb-4">
              <span className="text-[10px] font-geist-mono uppercase tracking-widest text-[#0a1628]/50 dark:text-white/50">
                {project.category?.[language]} &middot; {project.year}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a1628] dark:text-white mt-1">
                {project.title?.[language]}
              </h2>
            </div>

            {/* Short Description */}
            <p className="text-sm sm:text-base text-[#0a1628]/70 dark:text-gray-300 leading-relaxed mb-5">
              {detail.shortDescription?.[language]}
            </p>

            {/* Videos */}
            {allVideos.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-semibold text-[#0a1628] dark:text-white mb-2">Simulations</h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {allVideos.map((v: string, i: number) => (
                    <div key={i} className="rounded-lg overflow-hidden bg-[#0a1628]">
                      <video ref={(el) => { videoRefs.current[i] = el; }} src={v} loop muted playsInline autoPlay
                        preload="metadata" className="w-full aspect-video object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-3 mb-5">
              {/* LEFT */}
              <div className="space-y-3">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-100 dark:border-red-500/20">
                  <h4 className="text-xs font-semibold text-red-800 dark:text-red-400 mb-1 uppercase tracking-wide">Problem</h4>
                  <p className="text-sm text-red-700 dark:text-red-300/80 leading-relaxed">{detail.problem?.[language]}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-500/20">
                  <h4 className="text-xs font-semibold text-blue-800 dark:text-blue-400 mb-1 uppercase tracking-wide">Objective</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">{project.objective?.[language]}</p>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-500/20">
                  <h4 className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-1 uppercase tracking-wide">Tools Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {detail.toolsUsed?.[language]?.split(', ')?.map((t: string, i: number) => (
                      <span key={i} className="px-2.5 py-1 bg-amber-100 dark:bg-amber-500/10 rounded-full text-xs text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
              <div className="space-y-3">
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-100 dark:border-purple-500/20">
                  <h4 className="text-xs font-semibold text-purple-800 dark:text-purple-400 mb-1 uppercase tracking-wide">My Role</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300/80">{detail.myRole?.[language]}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                  <h4 className="text-xs font-semibold text-gray-800 dark:text-gray-300 mb-2 uppercase tracking-wide">What I Did</h4>
                  <ul className="space-y-2">
                    {detail.whatIDid?.map((item: any, i: number) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">{item[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Results */}
            <div className="mb-5">
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">Key Results</h3>
              <div className="grid grid-cols-2 gap-3">
                {detail.keyResults?.map((r: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-100 dark:border-green-500/20">
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-300 font-medium leading-relaxed">{r[language]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Figures Carousel with Zoom */}
            {sortedImages.length > 0 && (
              <div className="mb-5">
                <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">Figures and Diagrams</h3>
                <div className="relative rounded-xl overflow-hidden bg-[#0a1628] mb-3 shadow-lg cursor-zoom-in"
                  onClick={() => setLightboxImage(sortedImages[currentImageIndex])}>
                  <img src={sortedImages[currentImageIndex]} alt="" className="w-full max-h-[300px] sm:max-h-[450px] object-contain" />
                  {sortedImages.length > 1 && (
                    <>
                      <button onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center">
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center">
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/50 rounded text-white text-[10px]">
                    {currentImageIndex + 1}/{sortedImages.length}
                  </div>
                </div>
                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {sortedImages.map((img: string, i: number) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)}
                      className={cn('flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all',
                        i === currentImageIndex ? 'border-blue-500' : 'border-transparent opacity-60')}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div>
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">Skills Demonstrated</h3>
              <div className="flex flex-wrap gap-2">
                {detail.skillsDemonstrated?.[language]?.split(', ')?.map((s: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 bg-[#e8f0fe] dark:bg-[#1a2f4d] rounded-full text-xs font-medium text-[#2563eb] dark:text-blue-400 border border-[#d0e1f9] dark:border-blue-500/20">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && <ImageLightbox src={lightboxImage} onClose={() => setLightboxImage(null)} />}
    </>
  );
}

// ==================== PROJECT CARD ====================
function ProjectCard({ project, index, isVisible, onClick }: { project: any; index: number; isVisible: boolean; onClick: () => void }) {
  const { language } = useLanguage();
  return (
    <div className={cn('group cursor-pointer transition-all duration-500', isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6')}
      style={{ transitionDelay: `${index * 80}ms` }} onClick={onClick}>
      <div className="relative overflow-hidden rounded-xl bg-[#e8f0fe] dark:bg-[#0d1f38] shadow-md hover:shadow-xl transition-shadow">
        <div className="aspect-[4/3]">
          <img src={project.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
          <p className="text-[10px] text-white/70 font-geist-mono uppercase">{project.category?.[language]}</p>
          <p className="text-xs text-white line-clamp-2">{project.introduction?.[language]}</p>
        </div>
        <span className="absolute top-2 right-2 px-2 py-0.5 text-[10px] font-geist-mono bg-white/90 dark:bg-black/50 rounded-full">{project.year}</span>
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold text-[#0a1628] dark:text-white line-clamp-1">{project.title?.[language]}</h3>
        <p className="text-[11px] text-[#0a1628]/50 dark:text-gray-500">{project.result?.[language]}</p>
      </div>
    </div>
  );
}

// ==================== MAIN PORTFOLIO ====================
export function Portfolio() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref: headerRef, isVisible: hVis } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(portfolioConfig.projects.length, 100);
  const p = portfolioConfig;

  return (
    <section id="projects" className="w-full py-20 lg:py-28 bg-[#e8f0fe]/30 dark:bg-[#060e1a]">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-12">
          <div className={cn('transition-all duration-700', hVis ? 'opacity-100' : 'opacity-0')}>
            <span className="text-xs font-geist-mono uppercase tracking-widest text-[#0a1628]/50 dark:text-white/50">{p.label[language]}</span>
          </div>
          <h2 className={cn('text-h2 font-semibold text-[#0a1628] dark:text-white mt-3 transition-all duration-700', hVis ? 'opacity-100' : 'opacity-0')} style={{ transitionDelay: '100ms' }}>{p.heading[language]}</h2>
          <p className={cn('mt-5 text-base text-[#0a1628]/60 dark:text-gray-400 transition-all duration-700', hVis ? 'opacity-100' : 'opacity-0')} style={{ transitionDelay: '200ms' }}>{p.description[language]}</p>
        </div>

        {/* 3x3 Grid */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {p.projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} index={i} isVisible={visibleItems[i]} onClick={() => setSelectedProject(proj)} />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
