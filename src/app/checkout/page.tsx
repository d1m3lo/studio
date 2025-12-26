'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useCart, type CartItem } from '@/context/cart-context';
import { products } from '@/lib/products';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { CreditCard, Lock, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const checkoutSchema = z.object({
    paymentMethod: z.enum(['creditCard', 'pix']),
    // Informações de Contato
    email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),

    // Informações de Entrega
    fullName: z.string().min(3, { message: 'O nome completo é obrigatório.' }),
    address: z.string().min(5, { message: 'O endereço é obrigatório.' }),
    city: z.string().min(2, { message: 'A cidade é obrigatória.' }),
    zipCode: z.string().min(8, { message: 'O CEP é obrigatório.' }),
    
    // Informações de Pagamento (opcionais por padrão)
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    cardExpiry: z.string().optional(),
    cardCvc: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cardName && data.cardName.length >= 3;
    }
    return true;
}, {
    message: 'O nome no cartão é obrigatório.',
    path: ['cardName'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cardNumber && data.cardNumber.length === 16;
    }
    return true;
}, {
    message: 'O número do cartão deve ter 16 dígitos.',
    path: ['cardNumber'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cardExpiry && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry);
    }
    return true;
}, {
    message: 'Use o formato MM/AA.',
    path: ['cardExpiry'],
}).refine(data => {
    if (data.paymentMethod === 'creditCard') {
        return !!data.cardCvc && data.cardCvc.length >= 3 && data.cardCvc.length <= 4;
    }
    return true;
}, {
    message: 'O CVC deve ter entre 3 e 4 dígitos.',
    path: ['cardCvc'],
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cart: cartFromContext, addToCart } = useCart();
    const { toast } = useToast();
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId');

    const { cart, totalPrice, cartCount } = useMemo(() => {
        if (productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                const singleItem: CartItem[] = [{ product, quantity: 1 }];
                return {
                    cart: singleItem,
                    totalPrice: product.price,
                    cartCount: 1,
                };
            }
        }
        // Fallback to the full cart from context
        const cartCount = cartFromContext.reduce((total, item) => total + item.quantity, 0);
        const totalPrice = cartFromContext.reduce((total, item) => total + item.product.price * item.quantity, 0);
        return { cart: cartFromContext, totalPrice, cartCount };

    }, [productId, cartFromContext]);

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            paymentMethod: 'creditCard',
            email: '',
            fullName: '',
            address: '',
            city: '',
            zipCode: '',
            cardName: '',
            cardNumber: '',
            cardExpiry: '',
            cardCvc: '',
        },
    });

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
        toast({
            title: "Pedido realizado com sucesso!",
            description: "Agradecemos por sua compra. Você receberá um e-mail de confirmação em breve.",
        });
        // Here you would normally clear the cart and redirect the user
        // But for this example, we'll just redirect to the home page
        router.push('/');
    };
    
    const paymentMethod = form.watch('paymentMethod');

    if (cartCount === 0) {
        return (
             <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow flex items-center justify-center text-center py-12 px-4">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">Seu carrinho está vazio</h1>
                        <p className="text-muted-foreground mb-8">Adicione produtos ao seu carrinho antes de finalizar a compra.</p>
                        <Button asChild>
                            <Link href="/">Voltar para a página inicial</Link>
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                        Finalizar Compra
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Coluna do Formulário */}
                    <div className="order-2 lg:order-1">
                       <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Informações de Contato e Entrega</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl><Input placeholder="seu@email.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={form.control} name="fullName" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome Completo</FormLabel>
                                            <FormControl><Input placeholder="Nome como aparece no documento" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                     <FormField control={form.control} name="address" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Endereço</FormLabel>
                                            <FormControl><Input placeholder="Rua, número, complemento" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="city" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cidade</FormLabel>
                                                <FormControl><Input placeholder="Sua cidade" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <FormField control={form.control} name="zipCode" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>CEP</FormLabel>
                                                <FormControl><Input placeholder="00000-000" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                    </div>
                                </CardContent>
                            </Card>

                            <Tabs 
                                defaultValue="creditCard" 
                                className="w-full"
                                onValueChange={(value) => form.setValue('paymentMethod', value as 'creditCard' | 'pix')}
                            >
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="creditCard">
                                        <CreditCard className="mr-2 h-5 w-5" />
                                        Cartão de Crédito
                                    </TabsTrigger>
                                    <TabsTrigger value="pix">
                                        <QrCode className="mr-2 h-5 w-5" />
                                        PIX
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="creditCard">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Pagamento com Cartão</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <FormField control={form.control} name="cardName" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Nome no Cartão</FormLabel>
                                                    <FormControl><Input placeholder="Nome como aparece no cartão" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Número do Cartão</FormLabel>
                                                    <FormControl>
                                                        <div className="relative">
                                                            <Input placeholder="0000 0000 0000 0000" {...field} />
                                                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <div className="grid grid-cols-2 gap-4">
                                                <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Validade</FormLabel>
                                                        <FormControl><Input placeholder="MM/AA" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <FormField control={form.control} name="cardCvc" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>CVC</FormLabel>
                                                        <FormControl><Input placeholder="123" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="pix">
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Pagamento com PIX</CardTitle>
                                            <CardDescription>Escaneie o QR Code ou copie o código para pagar.</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center gap-4">
                                             <div className="p-4 border rounded-md bg-white">
                                                <Image src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Pisa%20Vibe%20Store6009SAO%20PAULO62070503***6304E2D4" alt="PIX QR Code" width={200} height={200} />
                                            </div>
                                            <Button variant="outline" className='w-full' onClick={() => {
                                                navigator.clipboard.writeText('00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-4266554400005204000053039865802BR5913Pisa%20Vibe%20Store6009SAO%20PAULO62070503***6304E2D4');
                                                toast({ title: "Código PIX copiado!" });
                                            }}>
                                                Copiar Código PIX
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>

                            <Button type="submit" size="lg" className="w-full mt-8" disabled={form.formState.isSubmitting}>
                                <Lock className="mr-2 h-5 w-5" />
                                {form.formState.isSubmitting ? 'Processando...' : `Pagar R$ ${totalPrice.toFixed(2).replace('.', ',')}`}
                            </Button>
                        </form>
                       </Form>
                    </div>

                    {/* Coluna do Resumo do Pedido */}
                    <div className="order-1 lg:order-2">
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                                <CardDescription>{cartCount} {cartCount === 1 ? 'item' : 'itens'} no seu carrinho</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4 max-h-80 overflow-y-auto">
                                    {cart.map(item => (
                                        <div key={item.product.id} className="flex items-center gap-4">
                                             <div className="relative h-16 w-16 overflow-hidden rounded-md border">
                                                <Image src={item.product.image.imageUrl} alt={item.product.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-medium text-sm">{item.product.name}</p>
                                                <p className="text-muted-foreground text-sm">Qtd: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium text-sm">R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</p>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <p>Subtotal</p>
                                        <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                     <div className="flex justify-between">
                                        <p>Frete</p>
                                        <p>Grátis</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-bold text-lg">
                                    <p>Total</p>
                                    <p>R$ {totalPrice.toFixed(2).replace('.', ',')}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
    