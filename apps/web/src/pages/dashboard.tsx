import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import Image from 'next/image';
import dashboardPreview from '../assets/images/dashboard-preview.png';
import UserDropdown from '@/components/UserDropdown';import Link from 'next/link';


interface EditableUser {
  name: string;
  userName: string;
  email: string;
  phone: string;
  avatar: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<EditableUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          const data = userDoc.exists() ? userDoc.data() : {};
          setUserData({
            name: data.name || currentUser.displayName || '',
            userName: data.userName || currentUser.displayName || '',
            email: currentUser.email || '',
            phone: data.phone || '',
            avatar: data.avatar || currentUser.photoURL || '',
          });
        } catch (error) {
          console.error("Error al cargar los datos del usuario:", error);
          setUserData({
            name: currentUser.displayName || '',
            userName: currentUser.displayName || '',
            email: currentUser.email || '',
            phone: '',
            avatar: currentUser.photoURL || '',
          });
        } finally {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando panel...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-red-700">HERMANDAPP</h2>
        <nav className="space-y-3">
          <p className="font-semibold text-sm text-gray-700">GENERAL</p>
          <SidebarItem icon="👤" label="Hermanos" href="/hermanos" />
          <SidebarItem icon="🧑‍🤝‍🧑" label="Colaboradores" href="/colaboradores" />
          <SidebarItem icon="👨‍👩‍👧‍👦" label="Familias y grupos" href="/familias" />
          <SidebarItem icon="📇" label="Contactos" href="/contactos" />
          <SidebarItem icon="📛" label="Titulares" href="/titulares" />
          <SidebarItem icon="🎖️" label="Junta de gobierno" href="/junta" />
          <p className="font-semibold text-sm text-gray-700 mt-4">TESORERÍA</p>
          <SidebarItem icon="💰" label="Tesorería" href="/tesoreria" />
          <SidebarItem icon="🎫" label="Lotería" href="/loteria" />
          <p className="font-semibold text-sm text-gray-700 mt-4">INVENTARIO</p>
          <SidebarItem icon="👕" label="Túnicas" href="/tunicas" />
          <SidebarItem icon="📦" label="Inventario" href="/inventario" />
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-red-700 text-white px-6 py-4 flex justify-end items-center shadow">
          {userData && (
            <UserDropdown user={{ photoURL: userData.avatar, displayName: userData.userName, email: userData.email }} />
          )}
        </header>

        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido a <span className="text-red-700">HERMANDAPP</span></h1>
          <div className="flex justify-center items-center h-full">
            <Image src={dashboardPreview} alt="Panel administración" className="rounded w-full h-full object-cover" />
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <Link href={href} className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
    <span>{icon}</span>
    <span>{label}</span>
  </Link>
);

export default Dashboard;
