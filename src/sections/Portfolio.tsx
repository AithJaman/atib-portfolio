import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useCallback } from 'react';

// ==================== IMAGE LIGHTBOX ====================
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const [scale, setScale] = useState(1);
  const [panning, setPanning] = useState(false);
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleZoom = () => {
    setScale((prev) => (prev >= 2 ? 1 : prev + 0.5));
    if (scale >= 2) setPoint({ x: 0, y: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panning || scale <= 1) return;
    setPoint({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
      >
        <X className="w-5 h-5 text-white" />
      </button>

      {/* Zoom Button */}
      <button
        onClick={(e) => { e.stopPropagation(); handleZoom(); }}
        className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
      >
        <ZoomIn className="w-5 h-5 text-white" />
      </button>

      {/* Image */}
      <div
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onMouseDown={() => setPanning(true)}
        onMouseUp={() => setPanning(false)}
        onMouseLeave={() => setPanning(false)}
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className="max-w-[95%] max-h-[90vh] object-contain transition-transform duration-300 cursor-grab active:cursor-grabbing"
          style={{
            transform: `scale(${scale}) translate(${(point.x - window.innerWidth / 2) / 20}px, ${(point.y - window.innerHeight / 2) / 20}px)`,
          }}
          draggable={false}
        />
      </div>

      {/* Zoom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs">
        Click to zoom ({Math.round(scale * 100)}%) | Click outside to close
      </div>
    </div>
  );
}

// ==================== PROJECT MODAL ====================
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!project?.detail) return null;

  const detail = project.detail;
  const allImages = detail.images || [];
  const allVideos = detail.videos || [];

  // Sort: overall first
  const sortedImages = [...allImages].sort((a: string) =>
    a.includes('overall') ? -1 : 0
  );

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
  }, [sortedImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  }, [sortedImages.length]);

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        <div
          className="relative w-full max-w-6xl max-h-[100dvh] sm:max-h-[95vh] overflow-y-auto bg-white dark:bg-[#0d1f38] sm:rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-3 right-3 z-10 float-right w-9 h-9 bg-white/90 dark:bg-[#0d1f38]/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-[#1a2f4d] transition-colors m-3 border border-gray-200 dark:border-white/10"
          >
            <X className="w-4 h-4 text-[#0a1628] dark:text-white" />
          </button>

          {/* POSTER - Full Display */}
          <div
            className="relative w-full cursor-zoom-in"
            onClick={() => setLightboxImage(project.image)}
          >
            <img
              src={project.image}
              alt={project.title?.[language]}
              className="w-full h-auto object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6">
              <span className="text-[10px] sm:text-xs font-geist-mono uppercase tracking-widest text-white/70">
                {project.category?.[language]}
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-white mt-0.5">
                {project.title?.[language]}
              </h2>
            </div>
            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-geist-mono bg-black/40 backdrop-blur rounded-full text-white">
              {project.year}
            </span>
            {/* Zoom Icon */}
            <div className="absolute top-3 left-3 w-8 h-8 bg-black/40 rounded-full flex items-center justify-center">
              <ZoomIn className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="p-4 sm:p-8">
            {/* Description */}
            <p className="text-sm sm:text-base text-[#0a1628] dark:text-gray-300 leading-relaxed mb-5">
              {detail.shortDescription?.[language]}
            </p>

            {/* Videos - Auto Play */}
            {allVideos.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                  Simulations
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {allVideos.map((video: string, i: number) => (
                    <div key={i} className="relative rounded-xl overflow-hidden bg-[#0a1628] shadow-lg">
                      <video
                        ref={(el) => { videoRefs.current[i] = el; }}
                        src={video}
                        loop
                        muted
                        playsInline
                        autoPlay
                        preload="metadata"
                        className="w-full aspect-video object-cover"
                        onLoadedMetadata={(e) => {
                          (e.target as HTMLVideoElement).play().catch(() => {});
                        }}
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-white">
                        {i === 0 ? 'Animation' : 'Flow Simulation'}
                      </div>
                    </div>
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

            {/* Figures Carousel with Click-to-Zoom */}
            {sortedImages.length > 0 && (
              <div className="mb-6">
                <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                  Figures and Diagrams
                </h3>

                <div className="relative rounded-xl overflow-hidden bg-[#0a1628] mb-3 shadow-lg cursor-zoom-in"
                  onClick={() => setLightboxImage(sortedImages[currentImageIndex])}
                >
                  <img
                    src={sortedImages[currentImageIndex]}
                    alt={`Figure ${currentImageIndex + 1} of ${sortedImages.length}`}
                    className="w-full max-h-[300px] sm:max-h-[450px] object-contain"
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

// ==================== MAIN PORTFOLIO ====================
export function Portfolio() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(
    portfolioConfig.projects.length,
    100
  );

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

        {/* Projects Grid - 3x3 Layout */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
          {portfolioConfig.projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isVisible={visibleItems[index]}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* CTA Row */}
        <div className="mt-8">
          <div
            className={cn(
              'relative overflow-hidden bg-[#0a1628] dark:bg-[#0d1f38] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between transition-all duration-700 ease-out-quart gap-4',
              visibleItems[portfolioConfig.projects.length]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            )}
          >
            <div>
              <span className="text-xs font-geist-mono uppercase tracking-widest text-white/50">
                {portfolioConfig.cta.label[language]}
              </span>
              <h3 className="text-xl font-semibold text-white mt-2">
                {portfolioConfig.cta.heading[language]}
              </h3>
            </div>
            <a
              href={portfolioConfig.cta.linkHref}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#0a1628] rounded-full text-sm font-medium hover:bg-white/90 transition-colors shrink-0"
            >
              {portfolioConfig.cta.linkText[language]}
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-white/5" />
          </div>
        </div>
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
