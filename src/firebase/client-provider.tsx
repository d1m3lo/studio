'use client';
import {useEffect, useState} from 'react';

import {FirebaseProvider} from '@/firebase/provider';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {FirebaseApp} from 'firebase/app';
import {initializeFirebase} from '@/firebase';

export function FirebaseClientProvider({children}: {children: React.ReactNode}) {
  const [firebaseApp, setFirebaseApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    const app = initializeFirebase();
    setFirebaseApp(app);
  }, []);

  if (!firebaseApp) {
    return null;
  }

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return (
    <FirebaseProvider
      firebaseApp={firebaseApp}
      firestore={firestore}
      auth={auth}
    >
      {children}
    </FirebaseProvider>
  );
}
