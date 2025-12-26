
'use client';

import { doc, collection, addDoc, deleteDoc, serverTimestamp, type Firestore } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export const addFavorite = (firestore: Firestore, userId: string, productId: string) => {
  const favoritesColRef = collection(firestore, 'users', userId, 'favorites');
  const data = {
    productId,
    userId,
    addedAt: serverTimestamp(),
  };

  addDoc(favoritesColRef, data)
    .catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: favoritesColRef.path,
        operation: 'create',
        requestResourceData: data,
      });
      errorEmitter.emit('permission-error', permissionError);
    });
};

export const removeFavorite = (firestore: Firestore, userId: string, favoriteId: string) => {
  const favDocRef = doc(firestore, 'users', userId, 'favorites', favoriteId);
  
  deleteDoc(favDocRef)
    .catch(async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: favDocRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    });
};
