"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "./product-card";
import {
  getSuggestedProducts,
  type SuggestedProductsOutput,
} from "@/ai/flows/ai-suggested-products";
import type { Product } from "@/lib/products";
import { Loader } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface AiSuggestedProductsProps {
  cartItems: {
    product: Product;
    quantity: number;
  }[];
  onAddToCart: (product: Product) => void;
}

const toProduct = (suggestedProduct: SuggestedProductsOutput[0]): Product => ({
  id: `ai_${suggestedProduct.name.toLowerCase().replace(/\s/g, "_")}`,
  name: suggestedProduct.name,
  // A categoria pode não corresponder exatamente, então definimos como "Roupas" ou "Calçados"
  category:
    suggestedProduct.category.toLowerCase() === "calçados" ? "Calçados" : "Roupas",
  price: Math.floor(Math.random() * 200) + 50, // Preço aleatório
  image: {
    id: `ai_img_${suggestedProduct.name.toLowerCase().replace(/\s/g, "_")}`,
    imageUrl:
      suggestedProduct.imageUrl ||
      PlaceHolderImages.find((p) => p.id === "product-1")!.imageUrl,
    description: suggestedProduct.description,
    imageHint: "stylish product",
  },
});

export function AiSuggestedProducts({
  cartItems,
  onAddToCart,
}: AiSuggestedProductsProps) {
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSuggestions() {
      if (cartItems.length > 0) {
        setLoading(true);
        setSuggestedProducts([]);
        try {
          const cartForAI = cartItems.map(({ product }) => ({
            name: product.name,
            description: product.image.description,
            imageUrl: product.image.imageUrl,
            category: product.category,
          }));

          const suggestions = await getSuggestedProducts({
            cartItems: cartForAI,
          });

          setSuggestedProducts(suggestions.map(toProduct));
        } catch (error) {
          console.error("Erro ao buscar produtos sugeridos:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestedProducts([]);
      }
    }
    fetchSuggestions();
  }, [cartItems]);

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-8 text-center">
          Sugerido para você pela IA
        </h2>
        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader className="h-12 w-12 animate-spin text-primary" />
          </div>
        )}
        {!loading && suggestedProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {suggestedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
        {!loading && suggestedProducts.length === 0 && (
           <p className="text-center text-muted-foreground">Nenhuma sugestão no momento. Adicione itens ao seu carrinho!</p>
        )}
      </div>
    </section>
  );
}
