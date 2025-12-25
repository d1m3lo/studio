
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Rocket, Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function CreditosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background">
          <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Créditos do Site
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Um agradecimento especial a todos que tornaram este projeto possível.
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-full text-center space-y-8">
                <section>
                    <h2 className="flex items-center justify-center text-2xl font-bold mb-4">
                        <Rocket className="mr-3 h-7 w-7 text-primary" />
                        Desenvolvimento e Estratégia
                    </h2>
                    <p className="text-lg">
                        Este e-commerce foi idealizado e desenvolvido pela <span className="font-semibold text-primary">Impulso Digital</span>.
                    </p>
                    <p className="text-muted-foreground">
                        Nossa missão é transformar ideias em experiências digitais de alto impacto, combinando design moderno, tecnologia de ponta e estratégias focadas em resultados.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <Button asChild>
                            <Link href="https://impulsodigital.com" target="_blank" rel="noopener noreferrer">
                                Visite a Impulso Digital
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                <div className="border-t pt-8">
                     <h2 className="text-2xl font-bold mb-4">
                        Tecnologias Utilizadas
                    </h2>
                    <div className="flex flex-wrap justify-center gap-4 text-muted-foreground">
                        <span className="bg-accent px-3 py-1 rounded-full text-sm">Next.js</span>
                        <span className="bg-accent px-3 py-1 rounded-full text-sm">React</span>
                        <span className="bg-accent px-3 py-1 rounded-full text-sm">Tailwind CSS</span>
                        <span className="bg-accent px-3 py-1 rounded-full text-sm">Shadcn/UI</span>
                        <span className="bg-accent px-3 py-1 rounded-full text-sm">Firebase</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
