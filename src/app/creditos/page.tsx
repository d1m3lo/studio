
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Github, Code, ExternalLink } from 'lucide-react';
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
                        <Code className="mr-3 h-7 w-7 text-primary" />
                        Desenvolvimento
                    </h2>
                    <p className="text-lg">
                        Este site foi desenvolvido por <span className="font-semibold text-primary">Kaique</span>.
                    </p>
                    <p className="text-muted-foreground">
                        Utilizando tecnologias de ponta para criar uma experiência de compra rápida, moderna e segura.
                    </p>
                    <div className="mt-4 flex justify-center gap-4">
                         <Button asChild variant="outline">
                            <Link href="https://github.com/kaique-soares" target="_blank" rel="noopener noreferrer">
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="https://portfolio-kaique.vercel.app" target="_blank" rel="noopener noreferrer">
                                Portfólio
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
