'use client';

import { useUser } from '@/firebase/auth/use-user';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { User, ShoppingBag, Heart, Shield, Eye, EyeOff } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFavorites } from '@/context/favorites-context';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/products';
import { useCart } from '@/context/cart-context';


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

function PedidosContent() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Meus Pedidos</CardTitle>
                <CardDescription>Acompanhe o histórico e o status dos seus pedidos.</CardDescription>
            </CardHeader>
            <CardContent>
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
    );
}

function FavoritosContent() {
    const { favorites, isLoading } = useFavorites();
    const { addToCart } = useCart();
    
    const favoriteProducts = products.filter(p => favorites.some(f => f.productId === p.id));

    if (isLoading) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Favoritos</CardTitle>
                    <CardDescription>Sua lista de desejos e produtos favoritos.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-56 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        )
    }

    if (favoriteProducts.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Favoritos</CardTitle>
                    <CardDescription>Sua lista de desejos e produtos favoritos.</CardDescription>
                </CardHeader>
                <CardContent>
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
        );
    }

    return (
       <Card>
            <CardHeader>
                <CardTitle>Favoritos</CardTitle>
                <CardDescription>Sua lista de desejos e produtos favoritos.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

function SegurancaContent() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    return (
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
            </CardContent>
             <CardFooter>
                <Button>Salvar Alterações</Button>
            </CardFooter>
        </Card>
    );
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
                        <TabsTrigger value="pedidos" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none">
                            <ShoppingBag className="h-5 w-5" /> Meus Pedidos
                        </TabsTrigger>
                        <TabsTrigger value="favoritos" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none">
                           <Heart className="h-5 w-5" /> Favoritos
                        </TabsTrigger>
                        <TabsTrigger value="seguranca" className="w-full justify-start gap-2 text-base data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none">
                           <Shield className="h-5 w-5" /> Segurança
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
                                <CardFooter className='flex-row-reverse'>
                                     <Button>Salvar Alterações</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="pedidos">
                            <PedidosContent />
                        </TabsContent>
                        <TabsContent value="favoritos">
                           <FavoritosContent />
                        </TabsContent>
                        <TabsContent value="seguranca">
                           <SegurancaContent />
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
            <Footer />
        </div>
    );
}
