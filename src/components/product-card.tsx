import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/products";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  className?: string;
};

export function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  return (
    <Card className={cn("overflow-hidden group flex flex-col bg-background shadow-md hover:shadow-xl transition-shadow duration-300", className)}>
      <CardHeader className="p-0 relative">
        <div className="aspect-[3/4] overflow-hidden">
          <Image
            src={product.image.imageUrl}
            alt={product.name}
            data-ai-hint={product.image.imageHint}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-medium leading-tight mb-1 font-headline">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{product.category}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <Button size="icon" variant="outline" onClick={() => onAddToCart(product)}>
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Add to cart</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
