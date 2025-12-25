'use client';

import Link from 'next/link';
import { User, LogOut } from 'lucide-react';
import { useUser } from '@/firebase/auth/use-user';
import { signOut } from '@/firebase/auth/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

function getInitials(name?: string | null) {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return (
    (names[0][0] ?? '') + (names[names.length - 1][0] ?? '')
  ).toUpperCase();
}

export function AuthButton() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return null; // ou um skeleton
  }

  if (!user) {
    return (
      <Button asChild variant="ghost" className="transition-transform hover:-translate-y-0.5">
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full transition-transform hover:-translate-y-0.5">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL ?? ''}
              alt={user.displayName ?? 'Usuário'}
            />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/minha-conta">
            <User className="mr-2 h-4 w-4" />
            <span>Minha Conta</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
