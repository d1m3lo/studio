
"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


const ProductSection = ({ title, products, onAddToCart, id }: { title: string, products: Product[], onAddToCart: (product: Product) => void, id?: string }) => (
  <section id={id} className="py-12 md:py-16">
    <div className="container max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-8 text-left">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </div>
  </section>
);


export default function Home() {
  const { addToCart } = useCart();

  const lançamentos = useMemo(() => products.filter(p => p.tags?.includes('lançamento')), []);
  const destaques = useMemo(() => products.filter(p => p.tags?.includes('destaque')), []);
  const ofertas = useMemo(() => products.filter(p => p.tags?.includes('oferta')), []);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image')!;
  const heroImage2 = PlaceHolderImages.find(p => p.id === 'hero-image-2')!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Seção do Herói */}
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            <CarouselItem>
              <div className="relative h-[60vh] md:h-[80vh] w-full">
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  data-ai-hint={heroImage.imageHint}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative container max-w-7xl mx-auto h-full flex flex-col items-center justify-center text-center text-white">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline max-w-3xl leading-tight">
                    Ande com Estilo. <br /> Viva a Vibe.
                  </h1>
                  <p className="mt-4 text-lg md:text-xl max-w-2xl text-gray-200">
                    Descubra coleções selecionadas de calçados e roupas premium que definem seu estilo.
                  </p>
                  <Button asChild size="lg" variant="outline" className="mt-8 bg-transparent text-white border-white hover:bg-white hover:text-black transition-transform hover:-translate-y-0.5">
                    <Link href="#products">
                      Comprar Nova Coleção
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="relative h-[60vh] md:h-[80vh] w-full">
                <Image
                  src={heroImage2.imageUrl}
                  alt={heroImage2.description}
                  data-ai-hint={heroImage2.imageHint}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="relative container max-w-7xl mx-auto h-full flex flex-col items-start justify-center text-white">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline max-w-2xl leading-tight">
                    Coleção Outono <br /> Chegou com Tudo.
                  </h1>
                  <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-200">
                    Prepare-se para a nova estação com peças que unem conforto e as últimas tendências.
                  </p>
                  <Button asChild size="lg" className="mt-8">
                    <Link href="#lançamentos">
                      Ver Lançamentos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex h-12 w-12 bg-white/20 hover:bg-white/30 border-none text-white" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex h-12 w-12 bg-white/20 hover:bg-white/30 border-none text-white" />
        </Carousel>
        
        <div id="products" className="space-y-16 pt-12 md:pt-24">
          {lançamentos.length > 0 && (
            <ProductSection id="lançamentos" title="Lançamentos" products={lançamentos} onAddToCart={addToCart} />
          )}
          {destaques.length > 0 && (
            <ProductSection id="destaques" title="Destaques" products={destaques} onAddToCart={addToCart} />
          )}
          {ofertas.length > 0 && (
            <ProductSection id="ofertas" title="Ofertas" products={ofertas} onAddToCart={addToCart} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
