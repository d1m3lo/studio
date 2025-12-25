import {initializeApp, getApp, getApps, FirebaseApp} from 'firebase/app';
import {Auth, getAuth} from 'firebase/auth';
import {Firestore, getFirestore} from 'firebase/firestore';

import {firebaseConfig} from '@/firebase/config';

import {
    FirebaseProvider,
    useFirebase,
    useFirebaseApp,
    useFirestore,
    useAuth,
} from '@/firebase/provider';
import { FirebaseClientProvider } from '@/firebase/client-provider';

import { useUser } from '@/firebase/auth/use-user';


export function initializeFirebase(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}


export {
    FirebaseProvider,
    FirebaseClientProvider,
    useFirebase,
    useFirebaseApp,
    useFirestore,
    useAuth,
    useUser
}
