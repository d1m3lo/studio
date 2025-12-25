"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const navLinks = [
  {
    label: "Masculino",
    href: "#",
    categories: [
      {
        title: "Calçados",
        subcategories: ["Sneakers", "Casual", "Esportivo", "Streetwear", "Chinelo"],
      },
      {
        title: "Roupas",
        subcategories: ["Camisetas", "Moletons", "Calças", "Streetwear", "Camisa de time"],
      },
      {
        title: "Acessórios",
        subcategories: ["Bonés e Gorros", "Mochilas e Bolsas", "Relógios"],
      },
      {
        title: "Perfumes",
        subcategories: ["Unissex", "Importados"],
      },
    ],
  },
  {
    label: "Feminino",
    href: "#",
    categories: [
       {
        title: "Calçados",
        subcategories: ["Sneakers", "Casual", "Esportivo", "Streetwear", "Chinelo", "Sandália"],
      },
      {
        title: "Roupas",
        subcategories: ["Camisetas", "Moletons", "Vestidos", "Streetwear"],
      },
      {
        title: "Acessórios",
        subcategories: ["Bonés e Gorros", "Mochilas e Bolsas", "Relógios"],
      },
      {
        title: "Perfumes",
        subcategories: ["Unissex", "Importados"],
      },
    ],
  },
  {
    label: "Lançamentos",
    href: "#",
    categories: [
      {
        title: "Masculino",
        subcategories: ["Calçado", "Roupa", "Acessório", "Perfume"],
      },
      {
        title: "Feminino",
        subcategories: ["Calçado", "Roupa", "Acessório", "Perfume"],
      },
    ],
  },
  {
    label: "Ofertas",
    href: "#",
    categories: [
      {
        title: "Masculino",
        subcategories: ["Calçado", "Roupa", "Acessório", "Perfume"],
      },
      {
        title: "Feminino",
        subcategories: ["Calçado", "Roupa", "Acessório", "Perfume"],
      },
    ],
  },
];


export function Header({ cartCount }: { cartCount: number }) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold font-headline tracking-tighter">
            Pisa Vibe
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <div key={link.label} className="nav-item group relative">
                <Link href={link.href} className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80 py-4">
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </Link>
                <div className="mega-menu">
                  {link.categories.map((category) => (
                    <div key={category.title}>
                      <h4 className="font-bold text-foreground mb-2 uppercase">{category.title}</h4>
                      <ul className="space-y-2">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory}>
                            <Link href="#" className="text-foreground/80 hover:text-foreground hover:underline">
                              {subcategory}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <User className="h-5 w-5" />
            <span className="sr-only">Conta</span>
          </Button>
          <div className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho de Compras</span>
            </Button>
            {cartCount > 0 && (
              <Badge className="absolute top-0 right-0 h-5 w-5 justify-center p-0 text-xs">{cartCount}</Badge>
            )}
          </div>
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" className="text-2xl font-bold font-headline" onClick={() => setMenuOpen(false)}>
                    Pisa Vibe
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <nav className="flex-grow p-4 overflow-y-auto">
                  <Accordion type="single" collapsible className="w-full">
                    {navLinks.map((link) => (
                      <AccordionItem key={link.label} value={link.label}>
                        <AccordionTrigger className="text-lg font-medium">{link.label}</AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col gap-4 pl-4">
                            {link.categories.map((category) => (
                              <div key={category.title}>
                                <h4 className="font-semibold text-foreground mb-2">{category.title}</h4>
                                <ul className="space-y-2">
                                  {category.subcategories.map((subcategory) => (
                                    <li key={subcategory}>
                                      <Link href="#" onClick={() => setMenuOpen(false)} className="text-foreground/80 transition-colors hover:text-foreground">
                                        {subcategory}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
