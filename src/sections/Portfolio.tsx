import { cn } from '@/lib/utils';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useCallback, useEffect } from 'react';

// ==================== IMAGE LIGHTBOX ====================
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const touchDistRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleZoom = () => {
    setScale((prev) => (prev >= 2 ? 1 : prev + 0.5));
  };

  const getTouchDist = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      touchDistRef.current = getTouchDist(e.touches);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const newDist = getTouchDist(e.touches);
      const diff = newDist - touchDistRef.current;
      if (Math.abs(diff) > 10) {
        setScale((prev) => {
          const next = diff > 0 ? Math.min(prev + 0.1, 3) : Math.max(prev - 0.1, 1);
          return next;
        });
        touchDistRef.current = newDist;
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md touch-none"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors sm:absolute"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Zoom Button - Desktop only */}
      {!isMobile && (
        <button
          onClick={(e) => { e.stopPropagation(); handleZoom(); }}
          className="absolute top-3 left-3 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
        >
          <ZoomIn className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-[95%] max-h-[85dvh] sm:max-h-[90vh] object-contain transition-transform duration-300 select-none"
          style={{ transform: `scale(${scale})` }}
          draggable={false}
        />
      </div>

      {/* Zoom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs text-center">
        {isMobile ? 'Pinch to zoom | Tap outside to close' : `Click to zoom (${Math.round(scale * 100)}%) | Click outside to close`}
      </div>

      {/* Scale indicator */}
      {scale > 1 && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
          {Math.round(scale * 100)}%
        </div>
      )}
    </div>
  );
}

// ==================== PROJECT MODAL ====================
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project?.detail) return null;

  const detail = project.detail;
  const allImages = detail.images || [];
  const allVideos = detail.videos || [];

    const sortedImages = [...allImages].sort((a: string, b: string) => {
    const aIsPoster = a.includes('poster') || a.includes('overall');
    const bIsPoster = b.includes('poster') || b.includes('overall');
    if (aIsPoster && !bIsPoster) return -1;
    if (!aIsPoster && bIsPoster) return 1;
    return 0;
  });

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
  }, [sortedImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  }, [sortedImages.length]);

  const handleVideoError = (index: number) => {
    setVideoErrors((prev) => new Set(prev).add(index));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="fixed inset-0 z-[101] flex items-start justify-center sm:items-center sm:p-4">
        <div
          className="relative w-full max-w-6xl max-h-[100dvh] sm:max-h-[95vh] overflow-y-auto bg-white dark:bg-[#0d1f38] sm:rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* FIXED CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="fixed top-3 right-3 z-[102] w-10 h-10 bg-white/95 dark:bg-[#1a2f4d]/95 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-[#243a5a] transition-colors border border-gray-200 dark:border-white/20 sm:absolute sm:top-4 sm:right-4"
          >
            <X className="w-5 h-5 text-[#0a1628] dark:text-white" />
          </button>

          {/* POSTER - Full Display */}
          <div
            className="relative w-full cursor-zoom-in bg-[#0a1628]"
            onClick={() => setLightboxImage(project.image)}
          >
            <img
              src={project.image}
              alt={project.title?.[language]}
              className="w-full h-auto max-h-[50vh] sm:max-h-[70vh] object-contain mx-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6">
              <span className="text-[10px] sm:text-xs font-geist-mono uppercase tracking-widest text-white/70">
                {project.category?.[language]}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-white mt-0.5 pr-20">
                {project.title?.[language]}
              </h2>
            </div>
            <span className="absolute top-3 right-14 sm:right-16 px-3 py-1 text-xs font-geist-mono bg-black/40 backdrop-blur rounded-full text-white">
              {project.year}
            </span>
            <div className="absolute top-3 left-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {/* Description */}
            <p className="text-sm sm:text-base text-[#0a1628] dark:text-gray-300 leading-relaxed mb-5">
              {detail.shortDescription?.[language]}
            </p>

            {/* Videos - Only if exists (Airship project) */}
            {allVideos.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                  Simulations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {allVideos.map((video: string, i: number) => (
                    !videoErrors.has(i) ? (
                      <div key={i} className="relative rounded-xl overflow-hidden bg-[#0a1628] shadow-lg">
                        <video
                          src={video}
                          loop
                          muted
                          playsInline
                          autoPlay
                          preload="metadata"
                          controls
                          className="w-full aspect-video object-cover"
                          onError={() => handleVideoError(i)}
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-white">
                          {i === 0 ? 'Animation' : 'Flow Simulation'}
                        </div>
                      </div>
                    ) : (
                      <div key={i} className="relative rounded-xl overflow-hidden bg-[#0a1628] shadow-lg flex items-center justify-center aspect-video">
                        <p className="text-gray-400 text-xs">Video unavailable</p>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* 2-Column Layout */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* LEFT */}
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 border border-red-100 dark:border-red-500/20">
                  <h3 className="text-xs font-semibold text-red-800 dark:text-red-400 mb-2 uppercase tracking-wide">
                    Problem
                  </h3>
                  <p className="text-sm text-red-700 dark:text-red-300/80 leading-relaxed">
                    {detail.problem?.[language]}
                  </p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-500/20">
                  <h3 className="text-xs font-semibold text-blue-800 dark:text-blue-400 mb-2 uppercase tracking-wide">
                    Objective
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">
                    {project.objective?.[language]}
                  </p>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-500/20">
                  <h3 className="text-xs font-semibold text-amber-800 dark:text-amber-400 mb-2 uppercase tracking-wide">
                    Tools Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detail.toolsUsed?.[language]?.split(', ')?.map((tool: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 rounded-full text-xs text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="space-y-4">
                <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 border border-purple-100 dark:border-purple-500/20">
                  <h3 className="text-xs font-semibold text-purple-800 dark:text-purple-400 mb-2 uppercase tracking-wide">
                    My Role
                  </h3>
                  <p className="text-sm text-purple-700 dark:text-purple-300/80">
                    {detail.myRole?.[language]}
                  </p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 border border-gray-100 dark:border-white/5">
                  <h3 className="text-xs font-semibold text-gray-800 dark:text-gray-300 mb-3 uppercase tracking-wide">
                    What I Did
                  </h3>
                  <ul className="space-y-2">
                    {detail.whatIDid?.map((item: any, i: number) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-400 leading-relaxed">
                          {item[language]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Results */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                Key Results
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {detail.keyResults?.map((item: any, i: number) => (
                  <div key={i} className="flex items-start gap-3 bg-green-50 dark:bg-green-900/10 rounded-xl p-4 border border-green-100 dark:border-green-500/20">
                    <div className="w-8 h-8 flex-shrink-0 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-sm text-green-800 dark:text-green-300 font-medium leading-relaxed">
                      {item[language]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Figures Carousel */}
            {sortedImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                  Figures and Diagrams
                </h3>

                <div
                  className="relative rounded-xl overflow-hidden bg-[#0a1628] mb-3 shadow-lg cursor-zoom-in"
                  onClick={() => setLightboxImage(sortedImages[currentImageIndex])}
                >
                  <img
                    src={sortedImages[currentImageIndex]}
                    alt={`Figure ${currentImageIndex + 1} of ${sortedImages.length}`}
                    className="w-full max-h-[250px] sm:max-h-[450px] object-contain"
                  />

                  {sortedImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5 text-white" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/50 hover:bg-black/70 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                      >
                        <ChevronRight className="w-5 h-5 text-white" />
                      </button>
                    </>
                  )}

                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
                    {currentImageIndex + 1} / {sortedImages.length}
                  </div>
                  <div className="absolute top-3 left-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {sortedImages.map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={cn(
                        'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer',
                        i === currentImageIndex
                          ? 'border-blue-500 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            <div className="mb-4">
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                Skills Demonstrated
              </h3>
              <div className="flex flex-wrap gap-2">
                {detail.skillsDemonstrated?.[language]?.split(', ')?.map((skill: string, i: number) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gradient-to-r from-[#e8f0fe] to-[#d0e1f9] dark:from-[#1a2f4d] dark:to-[#0d1f38] rounded-full text-xs font-medium text-[#2563eb] dark:text-blue-400 border border-[#d0e1f9] dark:border-blue-500/20 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt="Zoomed view"
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}

// ==================== PROJECT CARD ====================
function ProjectCard({
  project,
  index,
  isVisible,
  onClick,
}: {
  project: any;
  index: number;
  isVisible: boolean;
  onClick: () => void;
}) {
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        'group cursor-pointer transition-all duration-500 ease-out-quart',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-xl bg-[#e8f0fe] dark:bg-[#0d1f38] shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-[10px] text-white/70 font-geist-mono uppercase tracking-wider mb-1">
            {project.category[language]}
          </p>
          <p className="text-xs text-white line-clamp-2">
            {project.introduction[language]}
          </p>
        </div>

        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 text-[10px] font-geist-mono bg-white/90 dark:bg-black/50 backdrop-blur rounded-full text-[#0a1628] dark:text-white">
            {project.year}
          </span>
        </div>

        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0a1628]" />
          </div>
        </div>
      </div>

      <div className="mt-2.5 px-1">
        <h3 className="text-sm font-semibold text-[#0a1628] dark:text-white group-hover:text-[#2563eb] dark:group-hover:text-blue-400 transition-colors line-clamp-1">
          {project.title[language]}
        </h3>
        <p className="text-[11px] text-[#0a1628]/50 dark:text-gray-500 mt-0.5 line-clamp-1">
          {project.result[language]}
        </p>
      </div>
    </div>
  );
}

// ==================== PANEL 1: FEATURED PROJECTS (1x3) ====================
function FeaturedPanel({ projects, onSelect }: { projects: any[]; onSelect: (p: any) => void }) {
  const { language } = useLanguage();
  const { ref: panelRef, isVisible: panelVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={panelRef} className="mb-16">
      {/* Panel Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-[#2563eb]" />
          <span className="text-xs font-geist-mono uppercase tracking-widest text-[#2563eb] dark:text-blue-400">
            {language === 'en' ? 'Featured Projects' : '精选项目'}
          </span>
        </div>
      </div>

      {/* 1x3 Grid */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-700 ease-out-quart',
              panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <ProjectCard
              project={project}
              index={index}
              isVisible={panelVisible}
              onClick={() => onSelect(project)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== PANEL 2: PLC PROJECTS (2x3) ====================
function PLCPanel({ projects, onSelect }: { projects: any[]; onSelect: (p: any) => void }) {
  const { language } = useLanguage();
  const { ref: panelRef, isVisible: panelVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div ref={panelRef}>
      {/* Panel Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[2px] bg-[#2563eb]" />
          <span className="text-xs font-geist-mono uppercase tracking-widest text-[#2563eb] dark:text-blue-400">
            {language === 'en' ? 'PLC Projects' : 'PLC项目'}
          </span>
        </div>
      </div>

      {/* 2x3 Grid */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-700 ease-out-quart',
              panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <ProjectCard
              project={project}
              index={index}
              isVisible={panelVisible}
              onClick={() => onSelect(project)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== MAIN PORTFOLIO ====================
export function Portfolio() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });

  // Split projects into 2 panels
  const featuredProjects = portfolioConfig.projects.slice(0, 3);
  const plcProjects = portfolioConfig.projects.slice(3);

  const label = portfolioConfig.label[language];
  const heading = portfolioConfig.heading[language];
  const description = portfolioConfig.description[language];

  return (
    <section id="projects" className="w-full py-20 lg:py-28 bg-[#e8f0fe]/30 dark:bg-[#060e1a]">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-12">
          <div
            className={cn(
              'transition-all duration-700 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="text-xs font-geist-mono uppercase tracking-widest text-[#0a1628]/50 dark:text-white/50">
              {label}
            </span>
          </div>

          <h2
            className={cn(
              'text-h2 font-semibold text-[#0a1628] dark:text-white mt-3 transition-all duration-700 ease-out-quart whitespace-pre-line',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {heading}
          </h2>

          <p
            className={cn(
              'mt-5 text-base sm:text-lg text-[#0a1628]/60 dark:text-gray-400 leading-relaxed transition-all duration-700 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {description}
          </p>
        </div>

        {/* PANEL 1: 3 Featured Projects */}
        <FeaturedPanel projects={featuredProjects} onSelect={setSelectedProject} />

        {/* PANEL 2: 6 PLC Projects */}
        <PLCPanel projects={plcProjects} onSelect={setSelectedProject} />

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
