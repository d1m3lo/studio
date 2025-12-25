import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);


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
              Entre no estilo. Viva a Vibe. Calçados e roupas de alta qualidade.
            </p>
            <div className="flex space-x-6">
                <Link href="#" className="text-foreground/60 hover:text-foreground">
                    <span className="sr-only">Facebook</span>
                    <FacebookIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-foreground/60 hover:text-foreground">
                    <span className="sr-only">Instagram</span>
                    <InstagramIcon className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-foreground/60 hover:text-foreground">
                    <span className="sr-only">Twitter</span>
                    <TwitterIcon className="h-6 w-6" />
                </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Loja</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#products" className="text-base text-foreground/80 hover:text-foreground">Calçados</Link></li>
                  <li><Link href="#products" className="text-base text-foreground/80 hover:text-foreground">Roupas</Link></li>
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">Novidades</Link></li>
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">Promoção</Link></li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Suporte</h3>
                <ul className="mt-4 space-y-4">
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">Contato</Link></li>
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">FAQ</Link></li>
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">Envio</Link></li>
                  <li><Link href="#" className="text-base text-foreground/80 hover:text-foreground">Devoluções</Link></li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Fique por dentro</h3>
                <p className="mt-4 text-base text-foreground/80">Os últimos estilos e vendas, enviados para sua caixa de entrada semanalmente.</p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">Endereço de e-mail</label>
                  <Input type="email" name="email-address" id="email-address" autoComplete="email" required className="w-full bg-background" placeholder="Digite seu e-mail" />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:shrink-0">
                    <Button type="submit" className="w-full">Inscrever-se</Button>
                  </div>
                </form>
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
