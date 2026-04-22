import { cn } from '@/lib/utils';

interface PageOverlayProps {
  isVisible: boolean;
  title?: string;
}

export function PageOverlay({ isVisible, title = 'Loading' }: PageOverlayProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-white flex items-center justify-center transition-opacity duration-500 ease-out-cubic',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-2xl font-semibold tracking-tight text-exvia-black animate-pulse">
          {title}
        </span>
        <div className="w-24 h-0.5 bg-exvia-subtle rounded-full overflow-hidden">
          <div className="h-full bg-exvia-black animate-[slide_1s_ease-in-out_infinite] w-1/3 rounded-full" />
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
