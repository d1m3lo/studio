'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                     <Button asChild variant="ghost" className="mb-4">
                        <Link href="/minha-conta">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para Minha Conta
                        </Link>
                    </Button>
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Favoritos</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                       Sua lista de desejos e produtos favoritos.
                    </p>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center py-12">
                            <Heart className="h-20 w-20 text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-semibold">Sua lista de favoritos está vazia</h2>
                            <p className="text-muted-foreground mt-2 max-w-sm">
                                Clique no ícone de coração nos produtos que você ama para adicioná-los aqui.
                            </p>
                            <Button asChild className="mt-6">
                                <Link href="/">Explorar produtos</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
