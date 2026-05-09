import { cn } from '@/lib/utils';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioConfig } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useRef, useCallback } from 'react';

// ==================== PROJECT MODAL ====================
function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  const { language } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  if (!project?.detail) return null;

  const detail = project.detail;
  const allImages = detail.images || [];
  const allVideos = detail.videos || [];

  // Sort images: overall-modeling first
  const sortedImages = [...allImages].sort((a: string) =>
    a.includes('overall') ? -1 : 0
  );

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length);
  }, [sortedImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
  }, [sortedImages.length]);

  const scrollToThumbnail = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white dark:bg-[#0d1f38] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-3 right-3 z-10 float-right w-9 h-9 bg-white/90 dark:bg-[#0d1f38]/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-[#1a2f4d] transition-colors m-3 border border-gray-200 dark:border-white/10"
        >
          <X className="w-4 h-4 text-[#0a1628] dark:text-white" />
        </button>

        {/* POSTER HEADER */}
        <div className="relative w-full aspect-[21/9] overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title?.[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
            <span className="text-[10px] sm:text-xs font-geist-mono uppercase tracking-widest text-white/60">
              {project.category?.[language]}
            </span>
            <h2 className="text-xl sm:text-3xl font-bold text-white mt-1">
              {project.title?.[language]}
            </h2>
          </div>
          <span className="absolute top-4 right-4 px-3 py-1 text-xs font-geist-mono bg-white/20 backdrop-blur rounded-full text-white">
            {project.year}
          </span>
        </div>

        <div className="p-4 sm:p-8">
          {/* DESCRIPTION */}
          <p className="text-sm sm:text-base text-[#0a1628] dark:text-gray-300 leading-relaxed mb-6">
            {detail.shortDescription?.[language]}
          </p>

          {/* VIDEOS - Up/Down Animation */}
          {allVideos.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                Simulations
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {allVideos.map((video: string, i: number) => (
                  <div
                    key={i}
                    className="relative rounded-xl overflow-hidden bg-[#0a1628] shadow-lg"
                  >
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={video}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-white">
                      {i === 0 ? 'Animation' : 'Flow Simulation'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MAIN CONTENT GRID: Left & Right */}
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
            {/* LEFT COLUMN */}
            <div className="space-y-4">
              {/* Problem */}
              <div className="bg-red-50 dark:bg-red-900/10 rounded-xl p-4 sm:p-5 border border-red-100 dark:border-red-500/20">
                <h3 className="text-sm font-semibold text-red-800 dark:text-red-400 mb-2 uppercase tracking-wide">
                  Problem
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300/80 leading-relaxed">
                  {detail.problem?.[language]}
                </p>
              </div>

              {/* Objective */}
              <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 sm:p-5 border border-blue-100 dark:border-blue-500/20">
                <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-400 mb-2 uppercase tracking-wide">
                  Objective
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">
                  {project.objective?.[language]}
                </p>
              </div>

              {/* Tools Used */}
              <div className="bg-amber-50 dark:bg-amber-900/10 rounded-xl p-4 sm:p-5 border border-amber-100 dark:border-amber-500/20">
                <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-2 uppercase tracking-wide">
                  Tools Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {detail.toolsUsed?.[language]?.split(', ')?.map((tool: string, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-amber-100 dark:bg-amber-500/10 rounded-full text-xs text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
              {/* My Role */}
              <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-4 sm:p-5 border border-purple-100 dark:border-purple-500/20">
                <h3 className="text-sm font-semibold text-purple-800 dark:text-purple-400 mb-2 uppercase tracking-wide">
                  My Role
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300/80">
                  {detail.myRole?.[language]}
                </p>
              </div>

              {/* What I Did */}
              <div className="bg-gray-50 dark:bg-gray-800/30 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-white/5">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-3 uppercase tracking-wide">
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

          {/* KEY RESULTS */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
              Key Results
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {detail.keyResults?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-4 border border-green-100 dark:border-green-500/20 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                    {item[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FIGURES CAROUSEL with Left/Right Arrows */}
          {sortedImages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-semibold text-[#0a1628] dark:text-white mb-3">
                Figures and Diagrams
              </h3>

              {/* Main Image with Navigation Arrows */}
              <div className="relative rounded-xl overflow-hidden bg-[#0a1628] mb-3 shadow-lg">
                <img
                  src={sortedImages[currentImageIndex]}
                  alt={`Figure ${currentImageIndex + 1} of ${sortedImages.length}`}
                  className="w-full max-h-[400px] sm:max-h-[500px] object-contain"
                />

                {sortedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 backdrop-blur rounded-full flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 rounded-full text-white text-xs">
                  {currentImageIndex + 1} / {sortedImages.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sortedImages.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => scrollToThumbnail(i)}
                    className={cn(
                      'flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all',
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

          {/* SKILLS DEMONSTRATED */}
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
      {/* Poster Image */}
      <div className="relative overflow-hidden rounded-xl bg-[#e8f0fe] dark:bg-[#0d1f38] shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[4/3]">
          <img
            src={project.image}
            alt={project.title[language]}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <p className="text-[10px] text-white/70 font-geist-mono uppercase tracking-wider mb-1">
            {project.category[language]}
          </p>
          <p className="text-xs text-white line-clamp-2">
            {project.introduction[language]}
          </p>
        </div>

        {/* Year Badge */}
        <div className="absolute top-2 right-2">
          <span className="px-2 py-0.5 text-[10px] font-geist-mono bg-white/90 dark:bg-black/50 backdrop-blur rounded-full text-[#0a1628] dark:text-white">
            {project.year}
          </span>
        </div>

        {/* Arrow on Hover */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
          <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-3.5 h-3.5 text-[#0a1628]" />
          </div>
        </div>
      </div>

      {/* Title Below Card */}
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
