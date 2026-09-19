'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Download, Linkedin, Mail, Phone, MapPin, Instagram } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function AboutMeModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const ResumeSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
      <h4 className="font-semibold mb-3 text-lg text-primary">{title}</h4>
      <div className="space-y-2 text-foreground/80">
        {children}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-3xl bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-3xl font-headline text-center">Samuel Feitosa da Silva</DialogTitle>
        </DialogHeader>
        <div className="py-4 max-h-[80vh] overflow-y-auto pr-6 space-y-6">
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><MapPin size={14} /> Francisco Morato – SP</div>
            <div className="flex items-center gap-2"><Phone size={14} /> (11) 99166 - 9701</div>
            <div className="flex items-center gap-2"><Mail size={14} /> samukaav21@gmail.com</div>
            <a href="https://www.linkedin.com/in/samuel-feitosa-573abb362" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline">
              <Linkedin size={14} /> LinkedIn
            </a>
          </div>

          <Separator />
          
          <div className="space-y-6">
            <ResumeSection title="OBJETIVO">
              <p>Profissional de audiovisual em formação, atuando principalmente em direção, montagem e fotografia.</p>
            </ResumeSection>

            <ResumeSection title="FORMAÇÃO ACADÊMICA">
              <div>
                <p className="font-semibold text-foreground">Bacharelado em Audiovisual</p>
                <p>Centro Universitário Senac – Santo Amaro</p>
                <p className="text-sm text-muted-foreground">3º semestre</p>
              </div>
            </ResumeSection>

            <ResumeSection title="EXPERIÊNCIA EM AUDIOVISUAL">
              <div>
                <p className="font-semibold text-foreground">🎬 Série “Brasil 70” – Netflix / O2 Filmes</p>
                <p className="text-muted-foreground">Assistente de Produção / Assistente de Projeto</p>
              </div>
              <div className="mt-4">
                <p className="font-semibold text-foreground">🎥 Projetos Autorais e Independentes</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>“171: O Sonho de Conquistar” – Direção e Montagem</li>
                  <li>“Recorrendo” (Websérie) – Ator e Montador</li>
                  <li>“FALTA!” (Curta-metragem) – Montador e Ator</li>
                  <li>“ECOCIÊNCIA” (Série de TV) – Direção de Fotografia e Videografismo</li>
                  <li>“Céu, Inferno e Compras Online” – Montagem e Fotografia</li>
                  <li>“Derradeiro” – Assistência de Produção</li>
                  <li>“ALEXIA” – Assistência de Fotografia e Som</li>
                  <li>“Balãozinho de Cria” – Ator</li>
                  <li>“VideoArte” – Edição</li>
                  <li>Edição para YouTube e Vídeos Curtos</li>
                </ul>
              </div>
            </ResumeSection>

            <ResumeSection title="HABILIDADES">
              <ul className="list-disc list-inside space-y-1">
                <li>Direção audiovisual</li>
                <li>Montagem e edição (Adobe Premiere)</li>
                <li>Noções de fotografia cinematográfica</li>
              </ul>
            </ResumeSection>
          </div>
          
          <DialogFooter className="pt-4">
            <Button asChild className="w-full sm:w-auto">
              <a href="/resume.pdf" download>
                <Download className="mr-2" />
                Baixar Currículo
              </a>
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
