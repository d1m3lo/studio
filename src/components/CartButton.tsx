
'use client';

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";

export function CartButton() {
  const { cartCount } = useCart();

  return (
    <Button variant="ghost" size="icon" className="transition-transform hover:-translate-y-0.5">
      <ShoppingCart className="h-5 w-5" />
      <span className="sr-only">Carrinho de Compras</span>
      {cartCount > 0 && (
        <Badge className="absolute top-0 right-0 h-5 w-5 justify-center p-0 text-xs">{cartCount}</Badge>
      )}
    </Button>
  );
}
