// src/components/FirebaseAuthProvider.jsx
import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { getAuth, signInWithCustomToken, signOut } from 'firebase/auth';

export function FirebaseAuthProvider({ children }) {
  const { userId } = useAuth();
  const firebaseAuth = getAuth();

  useEffect(() => {
    if (!userId) {
      signOut(firebaseAuth);
      return;
    }

    const syncFirebaseAuth = async () => {
      try {
        console.log("Requesting Firebase token...");
        
        // Call Vercel serverless function
        const response = await fetch('/api/firebase-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });

        const data = await response.json();
        
        if (data.token) {
          await signInWithCustomToken(firebaseAuth, data.token);
          console.log("✅ Firebase authenticated!");
          console.log("Firebase UID:", firebaseAuth.currentUser?.uid);
        } else {
          console.error("❌ No token:", data);
        }
      } catch (error) {
        console.error("❌ Auth failed:", error);
      }
    };

    syncFirebaseAuth();
  }, [userId, firebaseAuth]);

  return <>{children}</>;
}
