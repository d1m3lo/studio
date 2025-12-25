'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PedidosPage() {
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
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Meus Pedidos</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Acompanhe o histórico e o status dos seus pedidos.
                    </p>
                </div>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center text-center py-12">
                            <ShoppingBag className="h-20 w-20 text-muted-foreground mb-4" />
                            <h2 className="text-2xl font-semibold">Nenhum pedido encontrado</h2>
                            <p className="text-muted-foreground mt-2 max-w-sm">
                                Parece que você ainda não fez nenhum pedido. Explore nossos produtos e encontre algo que você ame!
                            </p>
                            <Button asChild className="mt-6">
                                <Link href="/">Começar a comprar</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
