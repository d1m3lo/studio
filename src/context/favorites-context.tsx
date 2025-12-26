
'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useUser } from '@/firebase/auth/use-user';
import { useFirestore } from '@/firebase/provider';
import { collection, onSnapshot, doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { Product } from '@/lib/products';
import { addFavorite as fbAddFavorite, removeFavorite as fbRemoveFavorite } from '@/firebase/firestore/favorites';

export type Favorite = {
  id: string;
  productId: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorited: (productId: string) => boolean;
  isLoading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setIsLoading(true);
      const favsRef = collection(firestore, 'users', user.uid, 'favorites');
      const unsubscribe = onSnapshot(favsRef, (snapshot) => {
        const userFavorites = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Favorite));
        setFavorites(userFavorites);
        setIsLoading(false);
      }, (error) => {
        console.error("Error fetching favorites:", error);
        setIsLoading(false);
      });
      
      return () => unsubscribe();
    } else {
      // Clear favorites when user logs out
      setFavorites([]);
      setIsLoading(false);
    }
  }, [user, firestore]);

  const addFavorite = useCallback(async (productId: string) => {
    if (!user) return;
    // Optimistic update
    const tempId = doc(collection(firestore, 'users', user.uid, 'favorites')).id;
    setFavorites(prev => [...prev, { id: tempId, productId }]);
    await fbAddFavorite(firestore, user.uid, productId);
  }, [user, firestore]);

  const removeFavorite = useCallback(async (productId: string) => {
    if (!user) return;
    const favoriteToRemove = favorites.find(f => f.productId === productId);
    if (!favoriteToRemove) return;
    
    // Optimistic update
    setFavorites(prev => prev.filter(f => f.productId !== productId));
    await fbRemoveFavorite(firestore, user.uid, favoriteToRemove.id);
  }, [user, firestore, favorites]);

  const isFavorited = useCallback((productId: string) => {
    return favorites.some(fav => fav.productId === productId);
  }, [favorites]);

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    isLoading,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
