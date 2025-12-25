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

type CartItem = {
  product: Product;
  quantity: number;
};

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
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

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }

    switch (sortOrder) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      default:
        // Default order from products.ts is treated as newest
        break;
    }

    return result;
  }, [categoryFilter, sortOrder]);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-image')!;
  const categoryShoesImage = PlaceHolderImages.find(p => p.id === 'category-shoes')!;
  const categoryClothingImage = PlaceHolderImages.find(p => p.id === 'category-clothing')!;

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartCount={cartCount} />
      <main className="flex-grow">
        {/* Hero Section */}
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
          <div className="relative container max-w-7xl mx-auto h-full flex flex-col items-start justify-center text-white">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-headline max-w-2xl leading-tight">
              Ande com Estilo. <br /> Viva a Vibe.
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-xl text-gray-200">
              Descubra coleções selecionadas de calçados e roupas premium que definem seu estilo.
            </p>
            <Button size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
              Comprar Nova Coleção
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-24 bg-background">
            <div className="container max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                    <Link href="#products" className="group relative">
                        <Card className="overflow-hidden border-2">
                            <div className="aspect-[4/3]">
                                <Image
                                    src={categoryShoesImage.imageUrl}
                                    alt={categoryShoesImage.description}
                                    data-ai-hint={categoryShoesImage.imageHint}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-6 left-6">
                                <h2 className="text-3xl font-bold font-headline text-white">Calçados</h2>
                                <Button variant="secondary" className="mt-2">Compre Agora</Button>
                            </div>
                        </Card>
                    </Link>
                    <Link href="#products" className="group relative">
                        <Card className="overflow-hidden border-2">
                            <div className="aspect-[4/3]">
                                <Image
                                    src={categoryClothingImage.imageUrl}
                                    alt={categoryClothingImage.description}
                                    data-ai-hint={categoryClothingImage.imageHint}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                            <div className="absolute bottom-6 left-6">
                                <h2 className="text-3xl font-bold font-headline text-white">Roupas</h2>
                                <Button variant="secondary" className="mt-2">Compre Agora</Button>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </section>
        
        {/* Featured Products Section */}
        <section id="products" className="py-12 md:py-24 bg-accent/50">
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground">Nossos Produtos</h2>
              <div className="flex items-center gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as Categorias</SelectItem>
                    <SelectItem value="Calçados">Calçados</SelectItem>
                    <SelectItem value="Roupas">Roupas</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-[180px] bg-background">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                    <SelectItem value="price-asc">Preço: Menor para Maior</SelectItem>
                    <SelectItem value="price-desc">Preço: Maior para Menor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
