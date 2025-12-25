'use client';

import { useMemo } from 'react';
import { products, type Product } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { useCart } from '@/context/cart-context';

export default function RoupasPage() {
  const { addToCart } = useCart();

  const roupas = useMemo(() => {
    return products.filter((p) => p.category === 'Roupas');
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-background">
          <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl mb-12">
              Roupas
            </h1>
            {roupas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {roupas.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => addToCart(product)}
                  />
                ))}
              </div>
            ) : (
              <p>Nenhuma roupa encontrada.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
