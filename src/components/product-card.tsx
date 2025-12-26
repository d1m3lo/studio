
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/context/cart-context";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
};

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const { cart } = useCart();
  const isInCart = cart.some(item => item.product.id === product.id);

  return (
    <Card className={cn("overflow-hidden group flex flex-col bg-card shadow-md hover:shadow-xl transition-shadow duration-300", className)}>
       <Link href={`/produto/${product.id}`} className="contents">
        <CardHeader className="p-0 relative">
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
        <Button size="icon" variant={isInCart ? "secondary" : "default"} onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Adicionar ao carrinho</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
