
'use client';

import { useMemo, useState, type ChangeEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { products } from "@/lib/products";

const normalizeString = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0 && !isPopoverOpen) {
      setIsPopoverOpen(true);
    } else if (query.length === 0 && isPopoverOpen) {
      setIsPopoverOpen(false);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setIsPopoverOpen(false);
  };

  const filteredProducts = useMemo(() => {
    if (searchQuery.length < 1) return [];
    const normalizedQuery = normalizeString(searchQuery);
    return products.filter(
      (product) =>
        normalizeString(product.name).includes(normalizedQuery) ||
        normalizeString(product.category).includes(normalizedQuery)
    );
  }, [searchQuery]);

  const handleOpenChange = (open: boolean) => {
    // Only close the popover if there's no search query
    if (!open && searchQuery.length === 0) {
      setIsPopoverOpen(false);
    }
  };


  return (
    <Popover open={isPopoverOpen} onOpenChange={handleOpenChange}>
      <PopoverAnchor asChild>
        <div className="relative hidden md:flex items-center">
            <Input
              type="search"
              placeholder="Buscar por produtos..."
              className="pr-10 w-48 lg:w-64"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 0 && setIsPopoverOpen(true)}
              onBlur={() => setIsPopoverOpen(false)}
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
        </div>
      </PopoverAnchor>
      <PopoverContent 
        className="w-[var(--radix-popover-trigger-width)] mt-2 p-2" 
        align="start"
        onOpenAutoFocus={(e) => e.preventDefault()} // Prevent popover from stealing focus
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {filteredProducts.length > 0 ? (
          <div className="flex flex-col gap-2">
            {filteredProducts.slice(0, 5).map(product => (
              <Link href={`/produto/${product.id}`} key={product.id} className="flex items-center gap-4 p-2 rounded-md hover:bg-accent transition-colors" onClick={handleReset}>
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
