import Image from 'next/image';
import type { Project } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isVertical = project.category === 'curto';
  const hasThumbnail = project.thumbnailUrl && project.thumbnailUrl.trim() !== '';

  return (
    <div
      className={cn(
        'group relative w-full overflow-hidden rounded-lg cursor-pointer block',
        isVertical ? 'aspect-[9/16]' : 'aspect-video'
      )}
      onClick={onClick}
    >
      <Card className={cn(
        "w-full h-full overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105",
        !hasThumbnail ? "bg-primary" : "bg-card"
      )}>
        {hasThumbnail ? (
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover transition-opacity"
            sizes={isVertical
                ? "(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, 12vw"
                : "(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            }
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
          </div>
        )}
        
        <div className="absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100" />
        
        {!isVertical && (
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300">
            <h3 className="font-bold truncate text-white drop-shadow-md text-sm md:text-base">
              {project.title}
            </h3>
            <p className="text-xs text-white/70 truncate drop-shadow-sm">{project.role}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
