
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-accent text-accent-foreground mt-24">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="/" className="text-3xl font-bold font-headline tracking-tighter text-foreground">
              Pisa Vibe
            </Link>
            <p className="text-foreground/80 text-base">
              Estilo, atitude e qualidade em cada detalhe.
            </p>
            <div className="flex space-x-6">
                <Link href="#" className="text-foreground/80 hover:text-foreground">
                    <Instagram className="h-6 w-6" />
                    <span className="sr-only">Instagram</span>
                </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Loja</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/calcados" className="text-base text-foreground/80 hover:text-foreground">Calçados</Link></li>
                  <li><Link href="/roupas" className="text-base text-foreground/80 hover:text-foreground">Roupas</Link></li>
                  <li><Link href="/novidades" className="text-base text-foreground/80 hover:text-foreground">Novidades</Link></li>
                  <li><Link href="/promocao" className="text-base text-foreground/80 hover:text-foreground">Promoção</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Suporte</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="/contato" className="text-base text-foreground/80 hover:text-foreground">Contato</Link></li>
                  <li><Link href="/faq" className="text-base text-foreground/80 hover:text-foreground">FAQ</Link></li>
                  <li><Link href="/envio-e-devolucoes" className="text-base text-foreground/80 hover:text-foreground">Envio e Devoluções</Link></li>
                  <li><Link href="/creditos" className="text-base text-foreground/80 hover:text-foreground">Créditos do Site</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-base text-foreground/60 xl:text-center">&copy; {new Date().getFullYear()} Pisa Vibe. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
