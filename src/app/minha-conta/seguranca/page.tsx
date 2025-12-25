'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SegurancaPage() {
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
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Segurança</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Gerencie suas configurações de segurança e senha.
                    </p>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Alterar Senha</CardTitle>
                        <CardDescription>
                            Recomendamos usar uma senha forte que você não esteja usando em outro lugar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Senha Atual</Label>
                            <Input id="current-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="new-password">Nova Senha</Label>
                            <Input id="new-password" type="password" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Salvar Alterações</Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
