import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, ZoomIn, ZoomOut } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

// ==================== IMAGE LIGHTBOX with Pinch-to-Zoom ====================
function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string;
  alt: string;
  onClose: () => void;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const touchRef = useRef({
    startDist: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
    isPinching: false,
    isPanning: false,
  });

  // Get distance between two touch points
  const getTouchDist = (touches: TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const t = touchRef.current;
    if (e.touches.length === 2) {
      // Pinch start
      t.isPinching = true;
      t.isPanning = false;
      t.startDist = getTouchDist(e.touches);
      t.startScale = scale;
    } else if (e.touches.length === 1 && scale > 1) {
      // Pan start
      t.isPanning = true;
      t.isPinching = false;
      t.startX = e.touches[0].clientX - position.x;
      t.startY = e.touches[0].clientY - position.y;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const t = touchRef.current;
    if (e.touches.length === 2 && t.isPinching) {
      const dist = getTouchDist(e.touches);
      const newScale = Math.min(Math.max(t.startScale * (dist / t.startDist), 0.5), 5);
      setScale(newScale);
    } else if (e.touches.length === 1 && t.isPanning && scale > 1) {
      const newX = e.touches[0].clientX - t.startX;
      const newY = e.touches[0].clientY - t.startY;
      setPosition({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => {
    const t = touchRef.current;
    t.isPinching = false;
    t.isPanning = false;
    if (scale < 0.8) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // Double tap to zoom
  const lastTapRef = useRef(0);
  const handleDoubleTap = (e: React.TouchEvent) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      if (scale > 1) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      } else {
        setScale(2.5);
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const touch = e.changedTouches[0];
          const x = (rect.width / 2 - touch.clientX + rect.left) * 1.5;
          const y = (rect.height / 2 - touch.clientY + rect.top) * 1.5;
          setPosition({ x, y });
        }
      }
    }
    lastTapRef.current = now;
  };

  // Desktop click zoom
  const handleClickZoom = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2);
    }
  };

  // Wheel zoom (desktop)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = Math.min(Math.max(scale - e.deltaY * 0.001, 0.5), 5);
    setScale(newScale);
    if (newScale <= 1) setPosition({ x: 0, y: 0 });
  };

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Top Controls */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <button
          onClick={(e) => { e.stopPropagation(); handleClickZoom(); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          {scale > 1 ? <ZoomOut className="w-5 h-5 text-white" /> : <ZoomIn className="w-5 h-5 text-white" />}
        </button>
        <span className="text-white/50 text-sm">{Math.round(scale * 100)}%</span>
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Zoomable Image Container */}
      <div
        ref={containerRef}
        className="w-full h-full flex items-center justify-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={handleClickZoom}
        onWheel={handleWheel}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-none select-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? 'grab' : 'zoom-in',
          }}
          draggable={false}
        />
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs text-center">
        <span className="hidden sm:inline">Scroll to zoom • Drag to pan • </span>
        <span className="sm:hidden">Pinch to zoom • Double tap • </span>
        Click outside to close
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  isVisible,
  isFullWidth = false,
  onImageClick,
}: {
  project: {
    title: Record<string, string>;
    category: Record<string, string>;
    year: string;
    image: string;
    description: Record<string, string>;
    result: Record<string, string>;
    featured?: boolean;
  };
  index: number;
  isVisible: boolean;
  isFullWidth?: boolean;
  onImageClick?: (src: string) => void;
}) {
  const { language } = useLanguage();

  return (
    <div
      className={cn(
        'group cursor-pointer transition-all duration-700 ease-out-quart',
        isFullWidth ? 'lg:col-span-3 md:col-span-2' : project.featured ? 'lg:col-span-2' : '',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative overflow-hidden bg-exvia-subtle rounded-xl" onClick={() => onImageClick?.(project.image)}>
        <div className={cn(
          'aspect-[4/3]',
          isFullWidth && 'lg:aspect-[21/9]',
          project.featured && !isFullWidth && 'lg:aspect-[16/9]'
        )}>
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover transition-transform duration-700 ease-out-cubic group-hover:scale-105"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-exvia-black/0 group-hover:bg-exvia-black/20 transition-colors duration-500" />

        {/* Year Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 text-xs font-geist-mono bg-white/90 backdrop-blur-sm rounded-full text-exvia-black">
            {project.year}
          </span>
        </div>

        {/* Arrow Icon */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-exvia-black" />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-exvia-black group-hover:text-exvia-black/80 transition-colors">
          {project.title[language]}
        </h3>
        <p className="text-sm text-exvia-black/50">{project.category[language]}</p>
        <p className="text-sm text-exvia-black/70 leading-relaxed">
          {project.description[language]}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">{project.result[language]}</span>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const { language } = useLanguage();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(portfolioConfig.projects.length + 1, 120);

  const label = portfolioConfig.label[language];
  const heading = portfolioConfig.heading[language];
  const description = portfolioConfig.description[language];
  const ctaLabel = portfolioConfig.cta.label[language];
  const ctaHeading = portfolioConfig.cta.heading[language];
  const ctaLinkText = portfolioConfig.cta.linkText[language];

  return (
    <section id="projects" className="w-full py-24 lg:py-32 bg-exvia-subtle/30">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div
            className={cn(
              'transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="text-xs font-geist-mono uppercase tracking-widest text-exvia-black/50">
              {label}
            </span>
          </div>

          <h2
            className={cn(
              'text-h2 font-semibold text-exvia-black mt-4 transition-all duration-800 ease-out-quart whitespace-pre-line',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {heading}
          </h2>

          <p
            className={cn(
              'mt-6 text-lg text-exvia-black/60 leading-relaxed transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {description}
          </p>
        </div>

        {/* Projects Grid - Bento Style */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1: Featured (2 cols) + Small (1 col) */}
          {portfolioConfig.projects[0] && (
            <div className="lg:col-span-2 md:col-span-1">
              <ProjectCard
                project={portfolioConfig.projects[0]}
                index={0}
                isVisible={visibleItems[0]}
                isFullWidth={false}
                onImageClick={setLightboxImage}
              />
            </div>
          )}
          {portfolioConfig.projects[1] && (
            <ProjectCard
              project={portfolioConfig.projects[1]}
              index={1}
              isVisible={visibleItems[1]}
              onImageClick={setLightboxImage}
            />
          )}

          {/* Row 2: Two small + CTA card */}
          {portfolioConfig.projects[2] && (
            <ProjectCard
              project={portfolioConfig.projects[2]}
              index={2}
              isVisible={visibleItems[2]}
              onImageClick={setLightboxImage}
            />
          )}
          {portfolioConfig.projects[3] && (
            <ProjectCard
              project={portfolioConfig.projects[3]}
              index={3}
              isVisible={visibleItems[3]}
              onImageClick={setLightboxImage}
            />
          )}

          {/* CTA Card */}
          <div
            className={cn(
              'relative overflow-hidden bg-exvia-black rounded-xl p-8 flex flex-col justify-between transition-all duration-700 ease-out-quart aspect-[4/3]',
              visibleItems[portfolioConfig.projects.length] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
            style={{ transitionDelay: '400ms' }}
          >
            <div>
              <span className="text-xs font-geist-mono uppercase tracking-widest text-white/50">
                {ctaLabel}
              </span>
              <h3 className="text-2xl font-semibold text-white mt-3 leading-tight">
                {ctaHeading}
              </h3>
            </div>
            <a
              href={portfolioConfig.cta.linkHref}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-sm font-medium">{ctaLinkText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            {/* Decorative circles */}
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
          </div>

          {/* Row 3: Full width featured */}
          {portfolioConfig.projects[4] && (
            <ProjectCard
              project={portfolioConfig.projects[4]}
              index={5}
              isVisible={visibleItems[4]}
              isFullWidth={true}
              onImageClick={setLightboxImage}
            />
          )}
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage}
          alt="Project"
          onClose={() => setLightboxImage(null)}
        />
      )}
    </section>
  );
}
