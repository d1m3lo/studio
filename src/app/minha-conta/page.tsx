'use client';

import { useUser } from '@/firebase/auth/use-user';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { User, ShoppingBag, Heart, Shield, KeyRound, Phone } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function getInitials(name?: string | null) {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return ((names[0][0] ?? '') + (names[names.length - 1][0] ?? '')).toUpperCase();
}

function AccountSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    )
}

export default function MinhaContaPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return (
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <Card className="w-full max-w-4xl">
                        <CardHeader>
                            <CardTitle className="text-3xl font-bold tracking-tight">Minha Conta</CardTitle>
                            <CardDescription>Gerencie suas informações e atividades.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <AccountSkeleton />
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }
    
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Minha Conta</h1>
                    <p className="mt-2 text-lg text-muted-foreground">
                        Bem-vindo, {user.displayName || 'usuário'}! Gerencie suas informações e atividades.
                    </p>
                </div>
                 
                <Tabs defaultValue="info" className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <TabsList className="flex flex-col h-auto items-start justify-start p-2 gap-1 bg-transparent border rounded-lg md:col-span-1">
                        <TabsTrigger value="info" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none">
                            <User className="h-5 w-5" /> Informações
                        </TabsTrigger>
                         <TabsTrigger value="pedidos" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none" asChild>
                            <Link href="/minha-conta/pedidos"><ShoppingBag className="h-5 w-5" /> Meus Pedidos</Link>
                        </TabsTrigger>
                        <TabsTrigger value="favoritos" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none" asChild>
                           <Link href="/minha-conta/favoritos"> <Heart className="h-5 w-5" /> Favoritos</Link>
                        </TabsTrigger>
                        <TabsTrigger value="seguranca" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none" asChild>
                           <Link href="/minha-conta/seguranca"> <Shield className="h-5 w-5" /> Segurança</Link>
                        </TabsTrigger>
                    </TabsList>
                    <div className="md:col-span-3">
                        <TabsContent value="info">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações Pessoais</CardTitle>
                                    <CardDescription>Atualize seus dados pessoais.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                     <div className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left gap-6">
                                        <Avatar className="h-24 w-24 text-3xl">
                                            <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                                            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-4 flex-grow">
                                            <div>
                                                <Label htmlFor="name">Nome</Label>
                                                <Input id="name" defaultValue={user.displayName || 'Não informado'} />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" defaultValue={user.email ?? ''} disabled />
                                            </div>
                                             <div>
                                                <Label htmlFor="phone">Telefone (opcional)</Label>
                                                <Input id="phone" type="tel" placeholder="(XX) XXXXX-XXXX" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
