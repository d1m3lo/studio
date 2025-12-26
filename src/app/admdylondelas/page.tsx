
'use client';

import { useState, type FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShieldCheck, ShieldAlert, LayoutGrid, PlusCircle, MoreHorizontal, File, ListFilter, Upload, Trash2 } from 'lucide-react';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';
import { products } from '@/lib/products';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from '@/components/ui/textarea';

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

function AddProductDialog() {
    const { toast } = useToast();
    const [imageUrls, setImageUrls] = useState(['']);
    const [colors, setColors] = useState([{ name: '', hex: '' }]);

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleRemoveImageUrl = (index: number) => {
        if (imageUrls.length > 1) {
            const newImageUrls = [...imageUrls];
            newImageUrls.splice(index, 1);
            setImageUrls(newImageUrls);
        }
    };

    const handleImageUrlChange = (index: number, value: string) => {
        const newImageUrls = [...imageUrls];
        newImageUrls[index] = value;
        setImageUrls(newImageUrls);
    };

    const handleAddColor = () => {
        setColors([...colors, { name: '', hex: '' }]);
    };

    const handleRemoveColor = (index: number) => {
        if (colors.length > 1) {
            const newColors = [...colors];
            newColors.splice(index, 1);
            setColors(newColors);
        }
    };

    const handleColorChange = (index: number, field: 'name' | 'hex', value: string) => {
        const newColors = [...colors];
        newColors[index][field] = value;
        setColors(newColors);
    };


    const handleAddProduct = (e: FormEvent) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., send data to an API
        toast({
            title: "Produto adicionado!",
            description: "O novo produto foi adicionado com sucesso.",
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                 <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Adicionar Produto
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <form onSubmit={handleAddProduct}>
                    <DialogHeader>
                        <DialogTitle>Adicionar Novo Produto</DialogTitle>
                        <DialogDescription>
                            Preencha as informações abaixo para adicionar um novo produto ao catálogo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-6">
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-name" className="text-right">
                                Nome
                            </Label>
                            <Input id="product-name" placeholder="Nome do produto" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-price" className="text-right">
                                Preço
                            </Label>
                            <Input id="product-price" type="number" placeholder="99.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-old-price" className="text-right">
                                Preço Antigo
                            </Label>
                            <Input id="product-old-price" type="number" placeholder="199.99" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-brand" className="text-right">
                                Marca
                            </Label>
                            <Input id="product-brand" placeholder="Marca do produto" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-description" className="text-right">
                                Descrição
                            </Label>
                            <Textarea id="product-description" placeholder="Descreva o produto" className="col-span-3 min-h-[100px]" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-category" className="text-right">
                                Categoria
                            </Label>
                            <Input id="product-category" placeholder="Calçados, Roupas, etc." className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="product-sizes" className="text-right">
                                Tamanhos
                            </Label>
                            <Input id="product-sizes" placeholder="P,M,G ou 39,40,41 (separados por vírgula)" className="col-span-3" />
                        </div>
                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Cores
                            </Label>
                            <div className="col-span-3 space-y-2">
                                {colors.map((color, index) => (
                                     <div key={index} className="flex items-center gap-2">
                                        <Input 
                                            placeholder="Nome da cor (ex: Preto)" 
                                            value={color.name}
                                            onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                                        />
                                         <Input 
                                            placeholder="Hex (ex: #000000)" 
                                            value={color.hex}
                                            onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                                            className="w-28"
                                        />
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleRemoveColor(index)}
                                            disabled={colors.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                 <Button type="button" variant="outline" size="sm" onClick={handleAddColor}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar cor
                                </Button>
                            </div>
                        </div>

                         <div className="grid grid-cols-4 items-start gap-4">
                            <Label className="text-right pt-2">
                                Imagens
                            </Label>
                            <div className="col-span-3 space-y-2">
                                {imageUrls.map((url, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <Input 
                                            id={`product-image-url-${index}`} 
                                            placeholder="https://..." 
                                            value={url}
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                        />
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon"
                                            onClick={() => handleRemoveImageUrl(index)}
                                            disabled={imageUrls.length === 1}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Adicionar outra imagem
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Salvar Produto</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}


function ProductManager() {
    return (
        <Tabs defaultValue="all">
            <div className="flex items-center">
                <TabsList>
                    <TabsTrigger value="all">Todos</TabsTrigger>
                    <TabsTrigger value="active">Ativos</TabsTrigger>
                    <TabsTrigger value="draft">Rascunho</TabsTrigger>
                    <TabsTrigger value="archived" className="hidden sm:flex">
                        Arquivados
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                                <ListFilter className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Filtro
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Ativo</DropdownMenuItem>
                            <DropdownMenuItem>Rascunho</DropdownMenuItem>
                            <DropdownMenuItem>Arquivado</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" variant="outline" className="h-8 gap-1">
                        <File className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Exportar
                        </span>
                    </Button>
                    <AddProductDialog />
                </div>
            </div>
            <TabsContent value="all">
                 <Card>
                    <CardHeader>
                        <CardTitle>Produtos</CardTitle>
                        <CardDescription>
                            Gerencie seus produtos aqui. Adicione, edite ou remova produtos.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                        <span className="sr-only">Imagem</span>
                                    </TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden md:table-cell">Preço</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Categoria
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Ações</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map(product => (
                                    <TableRow key={product.id}>
                                        <TableCell className="hidden sm:table-cell">
                                            <Image
                                                alt={product.name}
                                                className="aspect-square rounded-md object-cover"
                                                height="64"
                                                src={product.image.imageUrl}
                                                width="64"
                                            />
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">Ativo</Badge>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            R$ {product.price.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {product.category}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Toggle menu</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                                    <DropdownMenuItem>Editar</DropdownMenuItem>
                                                    <DropdownMenuItem>Remover</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Mostrando <strong>1-{products.length}</strong> de <strong>{products.length}</strong> produtos
                        </div>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
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
               <ProductManager />
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

  useEffect(() => {
    // Check if user is already authenticated in localStorage
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);


  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    // NEVER store passwords in plaintext in a real application.
    // This is for demonstration purposes only.
    if (password === 'Retnuoctercou-13@') {
      localStorage.setItem('isAdminAuthenticated', 'true');
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

    
