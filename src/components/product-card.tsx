
'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product, Quality } from "@/lib/products";
import { ShoppingCart, Heart, Star, Award, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useUser } from "@/firebase/auth/use-user";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
};

function QualityBadge({ quality }: { quality: Quality }) {
  const qualityStyles = {
    Essential: {
      icon: <Award className="h-3 w-3" />,
      label: "Essential",
      description: "Ideal para o dia a dia, com boa qualidade, conforto e um design funcional a um preço acessível.",
      className: "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600",
    },
    Select: {
      icon: <Star className="h-3 w-3" />,
      label: "Select",
      description: "Equilíbrio perfeito entre custo e benefício, com excelente acabamento e ótima durabilidade.",
      className: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    },
    Elite: {
      icon: <Gem className="h-3 w-3" />,
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
           <Badge variant="outline" className={cn("flex items-center gap-1 transition-transform hover:-translate-y-0.5 cursor-pointer py-1 px-2 text-xs", style.className)}>
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


export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const { cart } = useCart();
  const { user, isLoading: isUserLoading } = useUser();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const router = useRouter();
  const { toast } = useToast();

  const isInCart = cart.some(item => item.product.id === product.id);
  const isFavorited = favorites.some(fav => fav.productId === product.id);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isUserLoading) return;

    if (!user) {
      toast({
        title: "Faça login para favoritar",
        description: "Você precisa estar logado para adicionar produtos aos seus favoritos.",
        variant: "destructive",
      })
      router.push('/login');
      return;
    }

    if (isFavorited) {
      removeFavorite(product.id);
      toast({
        title: "Removido dos favoritos",
      });
    } else {
      addFavorite(product.id);
      toast({
        title: "Adicionado aos favoritos!",
      });
    }
  };

  return (
    <Card className={cn("overflow-hidden group flex flex-col bg-card shadow-md hover:shadow-xl transition-shadow duration-300", className)}>
       <Link href={`/produto/${product.id}`} className="contents">
        <CardHeader className="p-0 relative">
          <div className="absolute top-2 left-2 right-2 z-10 flex justify-between items-center">
            <div>
              {product.quality && <QualityBadge quality={product.quality} />}
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9 rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30 hover:text-white"
              onClick={handleFavoriteToggle}
              aria-label="Favoritar produto"
            >
              <Heart className={cn("h-5 w-5", isFavorited && "fill-red-500 text-red-500")} />
            </Button>
          </div>
          <div className="aspect-[3/4] overflow-hidden">
            <Image
              src={product.image.imageUrl}
              alt={product.name}
              data-ai-hint={product.image.imageHint}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            <Image
              src={product.imageHover.imageUrl}
              alt={product.name}
              data-ai-hint={product.imageHover.imageHint}
              fill
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <CardTitle className="text-lg font-medium leading-tight mb-1 font-headline group-hover:text-primary transition-colors">{product.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{product.category}</p>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold whitespace-nowrap">
          R$ {product.price.toFixed(2).replace('.',',')}
        </p>
        <Button size="icon" variant={isInCart ? "secondary" : "outline"} onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
