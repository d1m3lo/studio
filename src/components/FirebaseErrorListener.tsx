'use client';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { errorEmitter } from '@/firebase/error-emitter';
import type { FirestorePermissionError } from '@/firebase/errors';

// This component is a client-side component that listens for Firestore permission errors.
// It is used to display a toast notification to the user when a permission error occurs.
// This is useful for debugging security rules during development.
// This can be safely removed for production builds.

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Firestore Permission Error:', error.message, error.context);
      
      toast({
        variant: 'destructive',
        title: 'Erro de Permissão do Firestore',
        description: (
          <div className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <p className="text-xs text-white">A seguinte requisição foi negada pelas regras de segurança do Firestore:</p>
            <code className="text-xs text-white">
              <pre>{JSON.stringify({
                path: error.context.path,
                operation: error.context.operation,
                // Uncomment to see the data that was sent
                // data: error.context.requestResourceData
              }, null, 2)}</pre>
            </code>
          </div>
        ),
      });
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
