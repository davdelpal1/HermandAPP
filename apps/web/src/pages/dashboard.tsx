import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Image from 'next/image';
import dashboardPreview from '../assets/images/dashboard-preview.png'; // Usa tu propia imagen

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

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-red-700">HERMANDAPP</h2>
        <nav className="space-y-3">
          <p className="font-semibold text-sm text-gray-700">GENERAL</p>
          <SidebarItem icon="👤" label="Hermanos" />
          <SidebarItem icon="🧑‍🤝‍🧑" label="Colaboradores" />
          <SidebarItem icon="👨‍👩‍👧‍👦" label="Familias y grupos" />
          <SidebarItem icon="📇" label="Contactos" />
          <SidebarItem icon="📛" label="Titulares" />
          <SidebarItem icon="🎖️" label="Junta de gobierno" />
          <p className="font-semibold text-sm text-gray-700 mt-4">TESORERÍA</p>
          <SidebarItem icon="💰" label="Tesorería" />
          <SidebarItem icon="🎫" label="Lotería" />
          <p className="font-semibold text-sm text-gray-700 mt-4">INVENTARIO</p>
          <SidebarItem icon="👕" label="Túnicas" />
          <SidebarItem icon="📦" label="Inventario" />
        </nav>
      </aside>

      {/* Main panel */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow">
          <div></div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm font-semibold uppercase">
                  {user.displayName || 'USUARIO'}
                </span>
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-white text-red-700 px-3 py-1 rounded hover:bg-gray-200"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Bienvenido a <span className="text-red-700">HERMANDAPP</span></h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Bienvenido {user?.displayName || 'Hermano/a'}
          </h2>
          <p className="mb-4">
            Para acceder a todas las funcionalidades que ofrece HermandApp como estadísticas,
            comparativas o la aplicación para hermanos y colaboradores, actualiza tu plan actual.
            Consulta todos los planes disponibles en{' '}
            <a href="https://hermandapp.io/#planes" className="text-red-600 underline">https://hermandapp.io/#planes</a>
          </p>
          <p className="mb-8">
            Si quieres actualizar tu plan envíanos un email a <a href="mailto:contacto@hermandapp.io" className="text-blue-700 underline">contacto@hermandapp.io</a>
          </p>

          {/* Dashboard previews */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-bold mb-2">Panel de administración</h3>
              <p className="text-sm mb-2 text-gray-600">Panel de administración más completo</p>
              <Image src={dashboardPreview} alt="Panel administración" className="rounded" />
            </div>
            <div className="bg-white p-4 shadow rounded">
              <h3 className="text-lg font-bold mb-2">Panel de miembros</h3>
              <p className="text-sm mb-2 text-gray-600">Panel de hermanos y colaboradores</p>
              <Image src={dashboardPreview} alt="Panel miembros" className="rounded" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);

export default Dashboard;
