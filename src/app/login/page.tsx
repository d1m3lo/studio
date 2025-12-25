'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInWithEmail } from '@/firebase/auth/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um email válido.' }),
  password: z
    .string()
    .min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await signInWithEmail(data.email, data.password);
      toast({
        title: 'Login bem-sucedido!',
        description: 'Você será redirecionado em breve.',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Falha no login',
        description:
          error.message || 'Verifique seu email e senha e tente novamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Login
          </CardTitle>
          <CardDescription>
            Acesse sua conta para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="seu@email.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                  </Button>
                   <div className="text-center">
                     <Link
                      href="#"
                      className="inline-block text-sm underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <p>
            Não tem uma conta?{' '}
            <Link href="/cadastro" className="font-medium underline">
              Cadastre-se
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
