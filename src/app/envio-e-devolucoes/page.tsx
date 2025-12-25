
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function EnvioDevolucoesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background">
          <div className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
            <div className="prose dark:prose-invert max-w-full">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-8">
                📦 Envios e Entregas — Pisa Vibe
              </h1>
              <p className="lead">
                Na Pisa Vibe, trabalhamos com um sistema de envio inteligente para garantir mais agilidade, eficiência e segurança na entrega dos nossos produtos. Nosso objetivo é fazer com que seu pedido chegue o mais rápido possível, mantendo sempre um padrão de qualidade e cuidado em cada etapa.
              </p>

              <h2>🚚 Como funciona a entrega?</h2>
              <p>
                Para otimizar prazos e garantir maior disponibilidade de produtos, trabalhamos com centros de distribuição parceiros, localizados em diferentes regiões. Isso significa que o seu pedido pode ser enviado diretamente de um desses parceiros, permitindo:
              </p>
              <ul>
                <li>Entregas mais rápidas</li>
                <li>Menor risco de atrasos</li>
                <li>Melhor disponibilidade de modelos e tamanhos</li>
              </ul>
              <p>
                Por esse motivo, a embalagem pode variar, podendo chegar em caixas ou embalagens diferentes do padrão da loja.
              </p>

              <h3>📦 Por que meu pedido chegou em uma embalagem diferente?</h3>
              <p>
                Alguns pedidos são enviados diretamente de nossos centros parceiros para garantir mais agilidade no envio. Por isso, é normal que a embalagem não tenha a identidade visual da Pisa Vibe.
              </p>
              <p className="p-4 border-l-4 border-primary bg-accent text-accent-foreground rounded-md">
                <strong>Importante:</strong> A embalagem pode variar, mas o cuidado, a conferência e o padrão de qualidade continuam os mesmos.
              </p>

              <h2>⭐ Entenda nossas classificações de qualidade</h2>
              <p>
                Para oferecer opções que atendam diferentes estilos e necessidades, trabalhamos com três níveis de qualidade:
              </p>

              <h3>🏆 Qualidade Elite</h3>
              <p>Nossa categoria mais alta.</p>
              <ul>
                <li>Acabamento superior</li>
                <li>Materiais de alto padrão</li>
                <li>Visual extremamente fiel</li>
                <li>Ideal para quem busca o melhor nível disponível</li>
              </ul>

              <h3>⭐ Qualidade Select</h3>
              <p>Equilíbrio perfeito entre custo e qualidade.</p>
              <ul>
                <li>Excelente acabamento</li>
                <li>Ótima durabilidade</li>
                <li>Visual muito próximo ao nível premium</li>
              </ul>

              <h3>🔹 Qualidade Essential</h3>
              <p>Pensada para quem busca praticidade no dia a dia.</p>
              <ul>
                <li>Boa qualidade e conforto</li>
                <li>Design funcional</li>
                <li>Ótimo custo-benefício</li>
              </ul>

              <h2>🤝 Nosso compromisso com você</h2>
              <p>
                Todos os produtos passam por verificação antes do envio e seguem nossos critérios internos de qualidade. Caso tenha qualquer dúvida sobre seu pedido, prazos ou características do produto, nossa equipe de suporte está sempre pronta para te atender.
              </p>
              <p>
                📩 Fale com a gente sempre que precisar.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
