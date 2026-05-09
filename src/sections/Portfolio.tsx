import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, Play, Pause } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useEffect } from 'react';

// ==================== PROJECT MODAL ====================
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!project?.detail) return null;

  const detail = project.detail;
  const allImages = detail.images || [];
  const allVideos = detail.videos || [];

  const toggleVideo = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlayingVideos((prev) => ({ ...prev, [index]: true }));
    } else {
      video.pause();
      setPlayingVideos((prev) => ({ ...prev, [index]: false }));
    }
  };

  useEffect(() => {
    // Auto-play videos when modal opens
    videoRefs.current.forEach((video, i) => {
      if (video) {
        video.play().catch(() => {});
        setPlayingVideos((prev) => ({ ...prev, [i]: true }));
      }
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 z-10 float-right w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors m-4"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 pt-4">
          {/* Header */}
          <div className="mb-8">
            <span className="text-xs font-geist-mono uppercase tracking-widest text-[#0a1628]/50">
              {project.category?.[language]}
            </span>
            <h2 className="text-3xl font-bold text-[#0a1628] mt-2">
              {project.title?.[language]}
            </h2>
            <span className="inline-block mt-2 px-3 py-1 text-xs font-geist-mono bg-[#e8f0fe] rounded-full text-[#2563eb]">
              {project.year}
            </span>
          </div>

          {/* Short Description */}
          <p className="text-lg text-[#0a1628]/70 leading-relaxed mb-8">
            {detail.shortDescription?.[language]}
          </p>

          {/* Problem & Objective */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-lg font-semibold text-red-800 mb-3">❓ Problem</h3>
              <p className="text-sm text-red-700/80 leading-relaxed">
                {detail.problem?.[language]}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">🎯 Objective</h3>
              <p className="text-sm text-blue-700/80 leading-relaxed">
                {project.objective?.[language]}
              </p>
            </div>
          </div>

          {/* My Role & Tools */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">👤 My Role</h3>
              <p className="text-sm text-purple-700/80">{detail.myRole?.[language]}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">🛠️ Tools Used</h3>
              <p className="text-sm text-amber-700/80">{detail.toolsUsed?.[language]}</p>
            </div>
          </div>

          {/* What I Did */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#0a1628] mb-4">✅ What I Did</h3>
            <ul className="space-y-3">
              {detail.whatIDid?.map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#0a1628]/70 leading-relaxed">{item[language]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Results */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-[#0a1628] mb-4">📊 Key Results</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {detail.keyResults?.map((item: any, i: number) => (
                <div key={i} className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-sm text-green-700/80">{item[language]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Videos */}
          {allVideos.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0a1628] mb-4">🎥 Simulations</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {allVideos.map((video: string, i: number) => (
                  <div key={i} className="relative rounded-xl overflow-hidden bg-[#0a1628]">
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={video}
                      loop
                      muted
                      playsInline
                      className="w-full aspect-video object-cover"
                      onClick={() => toggleVideo(i)}
                    />
                    <button
                      onClick={() => toggleVideo(i)}
                      className="absolute bottom-3 right-3 w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/40 transition-colors"
                    >
                      {playingVideos[i] ? (
                        <Pause className="w-4 h-4 text-white" />
                      ) : (
                        <Play className="w-4 h-4 text-white" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Images Carousel */}
          {allImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#0a1628] mb-4">🖼️ Figures & Diagrams</h3>
              
              {/* Main Image */}
              <div className="relative rounded-xl overflow-hidden bg-[#0a1628] mb-4">
                <img
                  src={allImages[currentImageIndex]}
                  alt={`Figure ${currentImageIndex + 1}`}
                  className="w-full max-h-[500px] object-contain"
                />
                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={cn(
                      'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                      i === currentImageIndex ? 'border-blue-500' : 'border-transparent'
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
            <h3 className="text-lg font-semibold text-[#0a1628] mb-3">💡 Skills Demonstrated</h3>
            <div className="flex flex-wrap gap-2">
              {detail.skillsDemonstrated?.[language]?.split(', ')?.map((skill: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-[#e8f0fe] rounded-full text-xs text-[#2563eb]">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Published Link */}
          {project.link && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a1628] text-white rounded-full text-sm font-medium hover:bg-[#0a1628]/90 transition-colors"
              >
                📄 View Publication
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== PROJECT CARD ====================
function ProjectCard({
  project,
  index,
  isVisible,
  isFullWidth = false,
  onClick,
}: {
  project: any;
  index: number;
  isVisible: boolean;
  isFullWidth?: boolean;
  onClick?: () => void;
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
      onClick={onClick}
    >
      <div className="relative overflow-hidden bg-[#e8f0fe] rounded-xl">
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
        <div className="absolute inset-0 bg-[#0a1628]/0 group-hover:bg-[#0a1628]/20 transition-colors duration-500" />

        {/* Year Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1.5 text-xs font-geist-mono bg-white/90 backdrop-blur-sm rounded-full text-[#0a1628]">
            {project.year}
          </span>
        </div>

        {/* Arrow Icon */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <ArrowUpRight className="w-4 h-4 text-[#0a1628]" />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-semibold text-[#0a1628] group-hover:text-[#0a1628]/80 transition-colors">
          {project.title[language]}
        </h3>
        <p className="text-sm text-[#0a1628]/50">{project.category[language]}</p>
        <p className="text-sm text-[#0a1628]/70 leading-relaxed">
          {project.introduction[language]}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-sm text-green-700 font-medium">{project.result[language]}</span>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN PORTFOLIO ====================
export function Portfolio() {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
  const { containerRef: gridRef, visibleItems } = useStaggerAnimation(portfolioConfig.projects.length + 1, 120);

  const label = portfolioConfig.label[language];
  const heading = portfolioConfig.heading[language];
  const description = portfolioConfig.description[language];
  const ctaLabel = portfolioConfig.cta.label[language];
  const ctaHeading = portfolioConfig.cta.heading[language];
  const ctaLinkText = portfolioConfig.cta.linkText[language];

  return (
    <section id="projects" className="w-full py-24 lg:py-32 bg-[#e8f0fe]/30">
      <div className="container-large px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-16">
          <div
            className={cn(
              'transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            )}
          >
            <span className="text-xs font-geist-mono uppercase tracking-widest text-[#0a1628]/50">
              {label}
            </span>
          </div>

          <h2
            className={cn(
              'text-h2 font-semibold text-[#0a1628] mt-4 transition-all duration-800 ease-out-quart whitespace-pre-line',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '100ms' }}
          >
            {heading}
          </h2>

          <p
            className={cn(
              'mt-6 text-lg text-[#0a1628]/60 leading-relaxed transition-all duration-800 ease-out-quart',
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
            style={{ transitionDelay: '200ms' }}
          >
            {description}
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Row 1 */}
          {portfolioConfig.projects[0] && (
            <div className="lg:col-span-2 md:col-span-1">
              <ProjectCard
                project={portfolioConfig.projects[0]}
                index={0}
                isVisible={visibleItems[0]}
                onClick={() => setSelectedProject(portfolioConfig.projects[0])}
              />
            </div>
          )}
          {portfolioConfig.projects[1] && (
            <ProjectCard
              project={portfolioConfig.projects[1]}
              index={1}
              isVisible={visibleItems[1]}
            />
          )}

          {/* Row 2 */}
          {portfolioConfig.projects[2] && (
            <ProjectCard
              project={portfolioConfig.projects[2]}
              index={2}
              isVisible={visibleItems[2]}
            />
          )}
          {portfolioConfig.projects[3] && (
            <ProjectCard
              project={portfolioConfig.projects[3]}
              index={3}
              isVisible={visibleItems[3]}
            />
          )}

          {/* CTA Card */}
          <div
            className={cn(
              'relative overflow-hidden bg-[#0a1628] rounded-xl p-8 flex flex-col justify-between transition-all duration-700 ease-out-quart aspect-[4/3]',
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
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/5" />
          </div>

          {/* Row 3 */}
          {portfolioConfig.projects[4] && (
            <ProjectCard
              project={portfolioConfig.projects[4]}
              index={5}
              isVisible={visibleItems[4]}
              isFullWidth={true}
            />
          )}
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
