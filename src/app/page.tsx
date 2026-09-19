'use client';

import { useState, useEffect } from 'react';
import { getProjects, getFeaturedProject } from '@/lib/data';
import type { Project } from '@/lib/types';
import ProjectCard from '@/components/ProjectCard';
import AboutMeModal from '@/components/AboutMeModal';
import ProjectDetailsModal from '@/components/ProjectDetailsModal';
import { Button } from '@/components/ui/button';
import { Play, Info, Clapperboard } from 'lucide-react';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [featuredProject, setFeaturedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    async function loadData() {
      const all = await getProjects();
      const featured = await getFeaturedProject();
      setProjects(all);
      setFeaturedProject(featured);
    }
    loadData();
  }, []);

  const filteredProjects = selectedCategory === 'todos'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clapperboard className="text-primary h-6 w-6" />
            <span className="font-bold text-lg tracking-wider uppercase font-headline">CineFólio</span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setIsAboutOpen(true)}>
            Sobre Mim
          </Button>
        </div>
      </header>

      {featuredProject && (
        <section className="relative w-full h-[65vh] md:h-[75vh] flex items-end">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featuredProject.thumbnailUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="container mx-auto px-4 pb-12 relative z-10 space-y-4 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-primary-foreground uppercase tracking-wider">
              Destaque • {featuredProject.category.toUpperCase()}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              {featuredProject.title}
            </h1>
            <p className="text-sm md:text-base text-white/80 line-clamp-3">
              {featuredProject.synopsis || featuredProject.description}
            </p>
            <div className="flex gap-3 pt-2">
              <Button onClick={() => setSelectedProject(featuredProject)} className="gap-2">
                <Play className="h-4 w-4 fill-current" /> Assistir
              </Button>
              <Button variant="secondary" onClick={() => setSelectedProject(featuredProject)} className="gap-2">
                <Info className="h-4 w-4" /> Detalhes
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-white">Trabalhos & Projetos</h2>
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'curta', label: 'Curtas' },
              { id: 'serie', label: 'Séries' },
              { id: 'curto', label: 'Vídeos Curtos' },
              { id: 'youtube', label: 'YouTube' },
            ].map((cat) => (
              <Button
                key={cat.id}
                size="sm"
                variant={selectedCategory === cat.id ? "default" : "secondary"}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </section>

      <AboutMeModal isOpen={isAboutOpen} setIsOpen={setIsAboutOpen} />
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
}
