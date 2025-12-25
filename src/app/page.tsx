"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, type Product } from "@/lib/products";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CartItem = {
  product: Product;
  quantity: number;
};

const ProductSection = ({ title, products, onAddToCart }: { title: string, products: Product[], onAddToCart: (product: Product) => void }) => (
  <section className="py-12 md:py-16">
    <div className="container max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => onAddToCart(product)} />
        ))}
      </div>
    </div>
  </section>
);


export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    toast({
      title: "Adicionado ao carrinho",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const lançamentos = useMemo(() => products.filter(p => p.tags?.includes('lançamento')), []);
  const destaques = useMemo(() => products.filter(p => p.tags?.includes('destaque')), []);
  const ofertas = useMemo(() => products.filter(p => p.tags?.includes('oferta')), []);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image')!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartCount={cartCount} />
      <main className="flex-grow">
        {/* Seção do Herói */}
        <section className="relative h-[60vh] md:h-[80vh] w-full">
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
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              Comprar Nova Coleção
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        <div id="products" className="bg-accent/50 pt-12 md:pt-24">
            <Tabs defaultValue="lançamentos" className="w-full">
                <div className="container max-w-7xl mx-auto">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                        <TabsTrigger value="lançamentos">Lançamentos</TabsTrigger>
                        <TabsTrigger value="destaques">Destaques</TabsTrigger>
                        <TabsTrigger value="ofertas">Ofertas</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="lançamentos">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container max-w-7xl mx-auto py-12">
                        {lançamentos.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="destaques">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container max-w-7xl mx-auto py-12">
                        {destaques.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="ofertas">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container max-w-7xl mx-auto py-12">
                        {ofertas.map((product) => (
                            <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
