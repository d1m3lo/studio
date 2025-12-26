'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ShieldAlert, LayoutGrid } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';

function AdminHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="shrink-0" />
          <div className="w-full flex-1">
            {/* Pode adicionar uma barra de busca ou outros elementos aqui */}
          </div>
        </header>
    )
}

// The admin panel content to show after successful login
function AdminDashboard() {
  return (
    <SidebarProvider>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] group">
          <Sidebar>
            <SidebarHeader>
              <h2 className="text-xl font-semibold tracking-tight">Pisa Vibe</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" isActive>
                    <LayoutGrid />
                    Produtos
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        <div className="flex flex-col">
            <AdminHeader />
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                <div className="flex items-center">
                    <h1 className="text-lg font-semibold md:text-2xl">Painel Administrativo</h1>
                </div>
                <div className="flex flex-1 items-start justify-center rounded-lg border border-dashed shadow-sm">
                     <Card className="w-full max-w-4xl m-4">
                        <CardHeader>
                        <CardTitle>Bem-vindo</CardTitle>
                        <CardDescription>Este é o seu painel administrativo.</CardDescription>
                        </CardHeader>
                        <CardContent>
                        <p>Use a barra lateral para navegar e gerenciar os produtos.</p>
                        {/* Admin features will be added here */}
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// The login form for the admin page
export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // NEVER store passwords in plaintext in a real application.
    // This is for demonstration purposes only.
    if (password === 'Retnuoctercou-13@') {
      toast({
        title: 'Acesso concedido',
        description: 'Bem-vindo ao painel administrativo.',
      });
      setIsAuthenticated(true);
    } else {
      toast({
        variant: 'destructive',
        title: 'Acesso Negado',
        description: 'A senha inserida está incorreta.',
      });
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <AdminDashboard />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
             <ShieldCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Acesso Restrito</CardTitle>
          <CardDescription>
            Esta página é protegida. Por favor, insira a senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Senha de Acesso</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <ShieldAlert className="mr-2 h-4 w-4" />
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
