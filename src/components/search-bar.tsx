
'use client';

import { useMemo, type ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

type SearchBarProps = {
  searchQuery: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchReset: () => void;
};

export function SearchBar({ searchQuery, onSearchChange, onSearchReset }: SearchBarProps) {

  const filteredProducts = useMemo(() => {
    if (searchQuery.length < 1) return [];
    const normalizedQuery = normalizeString(searchQuery);
    return products.filter(
      (product) =>
        normalizeString(product.name).includes(normalizedQuery) ||
        normalizeString(product.category).includes(normalizedQuery)
    );
  }, [searchQuery]);

  const isPopoverOpen = searchQuery.length > 0;

  return (
    <Popover open={isPopoverOpen} onOpenChange={(open) => !open && onSearchReset()}>
      <PopoverAnchor asChild>
        <div className="relative hidden md:flex items-center">
            <Input
              type="search"
              placeholder="Buscar por produtos..."
              className="pr-10 w-48 lg:w-64"
              value={searchQuery}
              onChange={onSearchChange}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
      </PopoverAnchor>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] mt-2 p-2" align="start">
        {filteredProducts.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filteredProducts.map(product => (
              <Link href="#" key={product.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-accent transition-colors" onClick={onSearchReset}>
                <Image src={product.image.imageUrl} alt={product.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={product.image.imageHint} />
                <div className="flex-grow">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{`R$ ${product.price.toFixed(2).replace('.', ',')}`}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          searchQuery.length > 0 && <p className="text-sm text-center text-muted-foreground p-4">Nenhum produto encontrado.</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
