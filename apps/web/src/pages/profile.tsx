import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import userAvatar from "../assets/images/user-avatar.png"; // Asegúrate de tener una imagen por defecto

interface UserProfile {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
  const [showGroups, setShowGroups] = useState<string[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser({
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          role: "Miembro",
          avatar: currentUser.photoURL || "/default-avatar.png",
        });
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar como en el dashboard */}
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

      {/* Main content similar to dashboard style */}
      <div className="flex-1 flex flex-col">
        <header className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow">
          <div></div>
          <div className="flex items-center gap-4">
            <span>{user.email}</span>
          </div>
        </header>
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Perfil de usuario</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg text-black font-bold">Tu usuario</h2>
              <p className="text-black"><strong>Nombre:</strong> {user.name}</p>
              <p className="text-black"><strong>Email:</strong> {user.email}</p>
              <p className="text-black"><strong>Rol:</strong> {user.role}</p>
              <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded" onClick={() => router.push('/editar-perfil')}>Editar perfil</button>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg text-black font-bold">Foto de perfil</h2>
              <Image src={userAvatar} alt="Avatar" width={120} height={120} className="rounded-full" />
              <div className="mt-2 flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">Cambiar</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded">Eliminar</button>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow md:col-span-2">
              <h2 className="text-lg text-black font-bold">Grupos</h2>
              <select className="text-black border rounded p-2 w-full">
                <option>Selecciona las familias o grupos</option>
                {showGroups.map((group) => (
                  <option key={group}>{group}</option>
                ))}
              </select>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const SidebarItem = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex items-center gap-2 text-gray-800 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer">
    <span>{icon}</span>
    <span>{label}</span>
  </div>
);
