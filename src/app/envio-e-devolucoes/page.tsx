
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Truck, PackageCheck, Star, Gem, Award, Handshake } from 'lucide-react';

export default function EnvioDevolucoesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background">
          <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="prose dark:prose-invert max-w-full">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                  Envio e Devoluções
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Sua tranquilidade é nossa prioridade. Veja como funcionam nossos processos de entrega e qualidade.
                </p>
              </div>

              <section className="space-y-8">
                <div className="p-6 border rounded-lg bg-card text-card-foreground">
                  <h2 className="flex items-center text-2xl font-bold mb-4">
                    <Truck className="mr-3 h-7 w-7 text-primary" />
                    Como Funciona a Entrega?
                  </h2>
                  <p>
                    Para otimizar prazos e garantir maior disponibilidade de produtos, trabalhamos com centros de distribuição parceiros localizados em diferentes regiões. Isso significa que seu pedido pode ser enviado diretamente de um desses locais, permitindo:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Entregas mais rápidas e eficientes.</li>
                    <li>Menor risco de atrasos.</li>
                    <li>Maior variedade de modelos e tamanhos em estoque.</li>
                  </ul>
                   <p className="mt-4">
                    Por esse motivo, a embalagem pode variar, podendo chegar em caixas ou pacotes diferentes do padrão da loja. Mas não se preocupe, o cuidado é o mesmo!
                  </p>
                </div>
                
                <div className="p-6 border-l-4 border-primary bg-accent text-accent-foreground rounded-lg">
                    <h3 className="flex items-center font-semibold text-lg">
                        <PackageCheck className="mr-2 h-6 w-6" />
                        Garantia de Qualidade
                    </h3>
                    <p className="mt-2">
                        A embalagem pode variar, mas o cuidado, a conferência e o padrão de qualidade da Pisa Vibe continuam os mesmos em cada pedido. Sua satisfação é nosso compromisso.
                    </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-center my-10">Nossos Padrões de Qualidade</h2>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="flex flex-col items-center p-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                            <Gem className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Qualidade Elite</h3>
                        <p className="text-muted-foreground text-sm">Acabamento superior, materiais de alto padrão e fidelidade visual impecável. Para quem busca o melhor.</p>
                    </div>
                     <div className="flex flex-col items-center p-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                            <Star className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Qualidade Select</h3>
                        <p className="text-muted-foreground text-sm">Equilíbrio perfeito entre custo e benefício, com excelente acabamento e ótima durabilidade.</p>
                    </div>
                     <div className="flex flex-col items-center p-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary text-primary-foreground mb-4">
                            <Award className="h-6 w-6" />
                        </div>
                        <h3 className="font-bold text-lg">Qualidade Essential</h3>
                        <p className="text-muted-foreground text-sm">Ideal para o dia a dia, com boa qualidade, conforto e um design funcional a um preço acessível.</p>
                    </div>
                  </div>
                </div>

                <div className="text-center border-t pt-8 mt-12">
                   <h2 className="flex items-center justify-center text-2xl font-bold mb-4">
                        <Handshake className="mr-3 h-7 w-7 text-primary" />
                        Nosso Compromisso com Você
                    </h2>
                  <p className="text-muted-foreground">
                    Todos os produtos passam por uma verificação rigorosa antes do envio para garantir que sigam nossos critérios de qualidade. Caso tenha qualquer dúvida sobre seu pedido, prazos ou características do produto, nossa equipe de suporte está sempre pronta para te ajudar. Fale com a gente sempre que precisar!
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
