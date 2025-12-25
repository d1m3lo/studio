'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function SegurancaPage() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
                            <div className="relative">
                                <Input id="current-password" type={showCurrentPassword ? "text" : "password"} className="pr-10" />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                                  onClick={() => setShowCurrentPassword((prev) => !prev)}
                                  tabIndex={-1}
                                >
                                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="new-password">Nova Senha</Label>
                             <div className="relative">
                                <Input id="new-password" type={showNewPassword ? "text" : "password"} className="pr-10" />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                                  onClick={() => setShowNewPassword((prev) => !prev)}
                                  tabIndex={-1}
                                >
                                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                            <div className="relative">
                                <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} className="pr-10" />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground"
                                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                                  tabIndex={-1}
                                >
                                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                        <Button>Salvar Alterações</Button>
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
