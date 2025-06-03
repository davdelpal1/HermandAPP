// pages/hermanos.tsx
import React from 'react';
import Link from 'next/link';
import UserDropdown from '@/components/UserDropdown';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import {
  Users,
  UserPlus,
  UserMinus,
  MessageSquare,
  FileText,
  Calendar,
  File,
  Gift,
  BarChart,
} from 'lucide-react';

interface EditableUser {
  name: string;
  userName: string;
  email: string;
  phone: string;
  avatar: string;
}

const HermanosPage = () => {
  const [userData, setUserData] = useState<EditableUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        window.location.href = '/login';
      } else {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        const data = userDoc.exists() ? userDoc.data() : {};
        setUserData({
          name: data.name || currentUser.displayName || '',
          userName: data.userName || currentUser.displayName || '',
          email: currentUser.email || '',
          phone: data.phone || '',
          avatar: data.avatar || currentUser.photoURL || '',
        });
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando página de hermanos...</p>
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
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-red-700 text-white px-6 py-4 flex justify-end items-center shadow">
          {userData && <UserDropdown user={{ photoURL: userData.avatar, displayName: userData.userName, email: userData.email }} />}
        </header>

        <main className="p-6 overflow-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Gestión de Hermanos</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <LinkCard icon={<Users size={40} />} label="Listado" href="/hermanos/listado" description="Consulta el listado completo de hermanos registrados en la hermandad." />
          <LinkCard icon={<UserPlus size={40} />} label="Nuevo" href="/hermanos/nuevoHermano" description="Agrega un nuevo hermano al sistema, asignándole información básica y de contacto." />
          <LinkCard icon={<UserMinus size={40} />} label="Bajas" href="/hermanos/bajas" description="Gestiona las bajas de hermanos y actualiza su estado." />
          <LinkCard icon={<MessageSquare size={40} />} label="Mensajes" href="/hermanos/mensajes" description="Envía mensajes personalizados a los hermanos o a grupos específicos." />
          <LinkCard icon={<FileText size={40} />} label="Cartas" href="/hermanos/cartas" description="Genera cartas oficiales para notificaciones, comunicaciones y eventos." />
          <LinkCard icon={<Calendar size={40} />} label="Historial de participación" href="/hermanos/historial" description="Muestra eventos o actividades donde ha participado cada hermano (procesiones, eventos, reuniones)." />
          <LinkCard icon={<File size={40} />} label="Documentos" href="/hermanos/documentos" description="Accede a fichas detalladas y modelos de documentos para gestión interna." />
          <LinkCard icon={<Gift size={40} />} label="Cumpleaños" href="/hermanos/cumpleanos" description="Consulta y organiza las fechas de cumpleaños de los hermanos." />
          <LinkCard icon={<BarChart size={40} />} label="Informes/Estadísticas" href="/hermanos/informes" description="Visualiza datos agregados (por ejemplo, cantidad de hermanos, porcentaje por género, edad, etc.)." />
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

const LinkCard = ({ icon, label, href, description }: { icon: React.ReactNode; label: string; href: string; description: string }) => (
  <Link href={href} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col items-center text-center">
    <div className="text-red-700 mb-2">{icon}</div>
    <h3 className="font-bold text-lg text-red-700 mb-1">{label}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);

export default HermanosPage;
