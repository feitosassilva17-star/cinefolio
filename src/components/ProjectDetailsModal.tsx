'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import type { Project, Episode } from '@/lib/types';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectDetailsModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailsModalProps) {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);

  if (!project) return null;

  const currentVideoUrl = selectedEpisode ? selectedEpisode.videoUrl : project.videoUrl;

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtube.com/shorts/')) {
      const id = url.split('shorts/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(currentVideoUrl);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        setSelectedEpisode(null);
        onClose();
      }
    }}>
      <DialogContent className="max-w-4xl bg-background border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            {project.title} {selectedEpisode ? ` - ${selectedEpisode.title}` : ''}
          </DialogTitle>
          <p className="text-sm text-primary font-medium">{project.role} • {project.year} • {project.duration}</p>
        </DialogHeader>

        {embedUrl ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black mt-2">
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="w-full py-8 text-center bg-muted rounded-lg text-muted-foreground">
            Vídeo em pós-produção ou não disponível publicamente.
          </div>
        )}

        {project.episodes && project.episodes.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold text-white">Episódios:</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant={selectedEpisode === null ? "default" : "outline"}
                onClick={() => setSelectedEpisode(null)}
              >
                Principal
              </Button>
              {project.episodes.map((ep) => (
                <Button
                  key={ep.id}
                  size="sm"
                  variant={selectedEpisode?.id === ep.id ? "default" : "outline"}
                  onClick={() => setSelectedEpisode(ep)}
                >
                  {ep.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        <Separator className="my-3" />

        <div className="space-y-4 text-sm text-foreground/80">
          <div>
            <h4 className="font-semibold text-white mb-1">Sinopse</h4>
            <p className="leading-relaxed">
              {selectedEpisode ? selectedEpisode.synopsis : project.synopsis || project.description}
            </p>
          </div>

          {project.credits && (
            <div>
              <h4 className="font-semibold text-white mb-1">Ficha Técnica / Créditos</h4>
              <pre className="font-sans whitespace-pre-line text-muted-foreground text-xs leading-relaxed">
                {project.credits}
              </pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
