
'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import React from 'react';
import Image from 'next/image';
import { products, type Product } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { ShoppingCart, Star, Plus, Minus, Check, Award, Gem } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { Quality } from '@/lib/products';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function QualityBadge({ quality }: { quality: Quality }) {
  const qualityStyles = {
    Essential: {
      icon: <Award className="h-4 w-4" />,
      label: "Essential",
      description: "Ideal para o dia a dia, com boa qualidade, conforto e um design funcional a um preço acessível.",
      className: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600",
    },
    Select: {
      icon: <Star className="h-4 w-4" />,
      label: "Select",
      description: "Equilíbrio perfeito entre custo e benefício, com excelente acabamento e ótima durabilidade.",
      className: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    },
    Elite: {
      icon: <Gem className="h-4 w-4" />,
      label: "Elite",
      description: "Acabamento superior, materiais de alto padrão e fidelidade visual impecável. Para quem busca o melhor.",
      className: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700",
    },
  };

  const style = qualityStyles[quality];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
           <Badge variant="outline" className={cn("flex items-center gap-1.5", style.className)}>
            {style.icon}
            <span>{style.label}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{style.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}


function ProductNotFound() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center text-center py-12 px-4">
                <div>
                    <h1 className="text-4xl font-bold mb-4">Produto não encontrado</h1>
                    <p className="text-muted-foreground mb-8">O produto que você está procurando não existe ou foi removido.</p>
                    <Button asChild>
                        <Link href="/">Voltar para a página inicial</Link>
                    </Button>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default function ProdutoPage() {
  const params = useParams();
  const { id } = params;
  const { addToCart, updateQuantity, cart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const [selectedSize, setSelectedSize] = useState<string | undefined>();

  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id]);

  const availableSizes = useMemo(() => {
    if (!product) return [];
    if (product.colors && product.colors.length > 0) {
      if (selectedColor) {
        return product.colors.find(c => c.name === selectedColor)?.sizes || [];
      }
      // If no color selected, maybe show no sizes or sizes from first color?
      return product.colors[0]?.sizes || [];
    }
    return product.sizes || [];
  }, [product, selectedColor]);

  // Set initial selected color and size
  useEffect(() => {
    if (product) {
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        const initialColor = product.colors[0]!.name;
        setSelectedColor(initialColor);
        const initialSizes = product.colors[0]!.sizes;
        if (initialSizes.length > 0) {
          setSelectedSize(initialSizes[0]);
        }
      } else if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  // Reset size if it's not available for the newly selected color
  useEffect(() => {
    if (availableSizes.length > 0 && !availableSizes.includes(selectedSize!)) {
      setSelectedSize(availableSizes[0]);
    }
  }, [availableSizes, selectedSize]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [product]);

  const cartItem = useMemo(() => cart.find(item => item.product.id === product?.id), [cart, product]);

  if (!product) {
    return <ProductNotFound />;
  }

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);
    const newSizes = product.colors?.find(c => c.name === colorName)?.sizes || [];
    if (newSizes.length > 0) {
        // If current size is not in new list, select the first available
        if (!newSizes.includes(selectedSize || '')) {
            setSelectedSize(newSizes[0]);
        }
    } else {
        setSelectedSize(undefined); // No sizes for this color
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="grid gap-4">
                 <Carousel className="w-full">
                    <CarouselContent>
                        <CarouselItem>
                            <div className="aspect-[3/4] relative w-full overflow-hidden rounded-lg">
                                <Image
                                    src={product.image.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={product.image.imageHint}
                                />
                            </div>
                        </CarouselItem>
                         <CarouselItem>
                            <div className="aspect-[3/4] relative w-full overflow-hidden rounded-lg">
                                <Image
                                    src={product.imageHover.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={product.imageHover.imageHint}
                                />
                            </div>
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
                    <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:inline-flex" />
                </Carousel>
            </div>

            <div className="flex flex-col gap-6">
                <div>
                    <div className="flex justify-between items-start">
                        <p className="text-sm font-medium text-primary">{product.category.toUpperCase()}</p>
                        {product.quality && <QualityBadge quality={product.quality} />}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline mt-1">{product.name}</h1>
                </div>

                <div className="flex items-center gap-4">
                    <p className="text-3xl font-bold">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                     {product.tags?.includes('oferta') && (
                        <p className="text-xl font-medium text-muted-foreground line-through">
                            R$ {(product.price * 1.2).toFixed(2).replace('.', ',')}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">(123 avaliações)</span>
                </div>
                
                <Separator />

                <div className="space-y-4">
                    <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.</p>
                </div>

                {product.colors && product.colors.length > 0 && (
                    <div className="space-y-3">
                        <Label className="text-base">Cor: <span className="font-semibold">{selectedColor}</span></Label>
                        <RadioGroup value={selectedColor} onValueChange={handleColorChange} className="flex gap-3 items-center">
                            {product.colors.map((color) => (
                                <React.Fragment key={color.name}>
                                    <RadioGroupItem
                                        value={color.name}
                                        id={`color-${color.name}`}
                                        className="sr-only"
                                    />
                                    <Label
                                        htmlFor={`color-${color.name}`}
                                        className={cn("h-8 w-8 rounded-full border-2 cursor-pointer flex items-center justify-center", selectedColor === color.name && "border-primary")}
                                        style={{ background: color.hex }}
                                        title={color.name}
                                    >
                                        {selectedColor === color.name && <Check className="h-5 w-5 text-primary-foreground" style={{ mixBlendMode: 'difference' }} />}
                                    </Label>
                                </React.Fragment>
                            ))}
                        </RadioGroup>
                    </div>
                )}

                {availableSizes && availableSizes.length > 0 && (
                     <div className="space-y-3">
                        <Label className="text-base">Tamanho: <span className="font-semibold">{selectedSize}</span></Label>
                        <RadioGroup value={selectedSize} onValueChange={setSelectedSize} className="flex flex-wrap gap-2 items-center">
                             {availableSizes.map((size) => (
                                <React.Fragment key={size}>
                                    <RadioGroupItem
                                        value={size}
                                        id={`size-${size}`}
                                        className="sr-only"
                                    />
                                    <Label
                                        htmlFor={`size-${size}`}
                                        className={cn("h-10 w-14 rounded-md border cursor-pointer flex items-center justify-center text-sm font-medium",
                                        "hover:bg-accent hover:text-accent-foreground",
                                        selectedSize === size && "bg-primary text-primary-foreground border-primary hover:bg-primary/90")}
                                    >
                                        {size}
                                    </Label>
                                </React.Fragment>
                             ))}
                        </RadioGroup>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    {cartItem ? (
                         <div className="flex items-center gap-3">
                            <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                            >
                            <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-10 text-center text-lg font-medium">{cartItem.quantity}</span>
                            <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                            >
                            <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                         <Button size="lg" onClick={() => addToCart(product)}>
                            <ShoppingCart className="mr-2 h-5 w-5" /> Adicionar ao Carrinho
                        </Button>
                    )}
                    <Button size="lg" variant="default" asChild>
                      <Link href={`/checkout?productId=${product.id}`}>Comprar Agora</Link>
                    </Button>
                </div>
            </div>
        </div>

        {relatedProducts.length > 0 && (
            <div className="mt-24">
                 <h2 className="text-3xl font-bold font-headline mb-8">Você também pode gostar</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map(p => (
                        <ProductCard key={p.id} product={p} onAddToCart={() => addToCart(p)} />
                    ))}
                 </div>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
