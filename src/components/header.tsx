
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils";
import { AuthButton } from "./AuthButton";
import { ThemeToggleButton } from "./theme-toggle-button";
import { SearchBar } from "./search-bar";
import { CartButton } from "./CartButton";

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
    href: "#lançamentos",
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
    href: "#ofertas",
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

export function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-2xl font-bold font-headline tracking-tighter mr-4">
            Pisa Vibe
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <div key={link.label} className="nav-item group h-16 flex items-center">
                <Link href={link.href} className="flex items-center gap-1 text-foreground/60 transition-colors hover:text-foreground/80">
                  {link.label}
                  {link.categories && <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />}
                </Link>
                {link.categories && (
                  <div className={cn("mega-menu", link.categories.length <= 2 ? "is-small" : "")}>
                    <div className={cn("container mx-auto grid gap-8", link.categories.length <= 2 ? "grid-cols-2" : "grid-cols-4")}>
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
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <SearchBar />
          <CartButton />
          <AuthButton />
          <ThemeToggleButton />
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden transition-transform hover:-translate-y-0.5">
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
                          {link.categories ? (
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
                          ) : (
                            <div className="pl-4">
                              <Link href={link.href} onClick={() => setMenuOpen(false)} className="text-foreground/80 transition-colors hover:text-foreground">
                                Ver {link.label}
                              </Link>
                            </div>
                          )}
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
