import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Layout from '@/components/Layout';

// Configura tu proyecto de Firebase aquí
const firebaseConfig = {
    apiKey: "AIzaSyBa48T8X9LC95zI5lKZpOAD5DalmGuCytI",
    authDomain: "hermandapp-bed16.firebaseapp.com",
    projectId: "hermandapp-bed16",
    storageBucket: "hermandapp-bed16.firebasestorage.app",
    messagingSenderId: "326574651601",
    appId: "1:326574651601:web:fc34c05902155f2b322df0"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Layout>
        <h1>Bienvenido al Dashboard</h1>
      </Layout>
    </div>
  );
}
