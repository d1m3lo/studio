'use client';

import { useUser } from '@/firebase/auth/use-user';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function getInitials(name?: string | null) {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return ((names[0][0] ?? '') + (names[names.length - 1][0] ?? '')).toUpperCase();
}

export default function MinhaContaPage() {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        }
    }, [user, isLoading, router]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-lg">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold tracking-tight">Minha Conta</CardTitle>
                        <CardDescription>Gerencie suas informações pessoais.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {isLoading ? (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-16 w-16 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                                </div>
                            </div>
                        ) : user ? (
                            <div className="flex flex-col items-center sm:flex-row sm:items-start text-center sm:text-left gap-6">
                                <Avatar className="h-24 w-24 text-3xl">
                                    <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? ''} />
                                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 flex-grow">
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Nome</h3>
                                        <p className="text-lg font-semibold">{user.displayName || 'Não informado'}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                                        <p className="text-lg font-semibold">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Você precisa estar logado para ver esta página.</p>
                        )}
                    </CardContent>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
