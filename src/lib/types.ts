export type Episode = {
  id: string;
  title: string;
  synopsis: string;
  videoUrl: string;
};

export type Project = {
  id: string;
  title: string;
  category: 'curta' | 'serie' | 'curto' | 'youtube';
  role: string;
  year: number;
  duration: string;
  description: string;
  synopsis: string;
  credits: string;
  thumbnailUrl: string;
  videoUrl: string;
  featured: boolean;
  links?: {
    youtube?: string;
    vimeo?: string;
    imdb?: string;
  };
  episodes?: Episode[];
};
