import {initializeApp, getApp, getApps, FirebaseApp} from 'firebase/app';
import {Auth, getAuth} from 'firebase/auth';
import {Firestore, getFirestore} from 'firebase/firestore';

import {firebaseConfig} from '@/firebase/config';

export function initializeFirebase(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }

  return initializeApp(firebaseConfig);
}
