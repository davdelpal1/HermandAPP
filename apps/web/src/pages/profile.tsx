import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>({ name: '', email: '', phone: '', memberSince: '', avatar: '' });
  const [groups, setGroups] = useState<string[]>([]);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        setUser({
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: userData.phone || "",
          memberSince: userData.memberSince || "",
          avatar: currentUser.photoURL || "/user-avatar.png",
        });
        setEditableUser({
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: userData.phone || "",
          memberSince: userData.memberSince || "",
          avatar: currentUser.photoURL || "/user-avatar.png",
        });
        const groupsDoc = await getDoc(doc(db, "config", "groups"));
        setGroups(groupsDoc.exists() ? groupsDoc.data().list || [] : []);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    const auth = getAuth();
    const db = getFirestore();
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: editableUser.name,
          photoURL: editableUser.avatar,
        });
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          phone: editableUser.phone,
          memberSince: editableUser.memberSince,
        }, { merge: true });
        alert("Perfil actualizado correctamente.");
        setUser({ ...editableUser });
      } catch (error) {
        console.error("Error al actualizar el perfil", error);
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditableUser({ ...editableUser, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <p>Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow p-4 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-red-700">HERMANDAPP</h2>
        <nav className="space-y-3">
          <SidebarItem icon="👤" label="Hermanos" />
          <SidebarItem icon="🧑‍🤝‍🧑" label="Colaboradores" />
          <SidebarItem icon="👨‍👩‍👧‍👦" label="Familias y grupos" />
          <SidebarItem icon="📇" label="Contactos" />
          <SidebarItem icon="📛" label="Titulares" />
          <SidebarItem icon="🎖️" label="Junta de gobierno" />
          <SidebarItem icon="💰" label="Tesorería" />
          <SidebarItem icon="🎫" label="Lotería" />
          <SidebarItem icon="👕" label="Túnicas" />
          <SidebarItem icon="📦" label="Inventario" />
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow">
          <span>{user.email}</span>
        </header>
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Perfil</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white text-black p-4 rounded shadow">
              <label>Nombre</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.name} onChange={e => setEditableUser({ ...editableUser, name: e.target.value })} />
              <label>Nombre de usuario</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.userName} onChange={e => setEditableUser({ ...editableUser, userName: e.target.value })} />
              <label>Email</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.email} disabled />
              <label>Teléfono</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.phone} onChange={e => setEditableUser({ ...editableUser, phone: e.target.value })} />
              <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded" onClick={handleSave}>Guardar cambios</button>
            </div>
            <div className="bg-white text-black p-4 rounded shadow">
              <label>Foto de perfil</label>
              <Image src={editableUser.avatar} alt="Avatar" width={120} height={120} className="rounded-full mb-2" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
                <div className="mt-4">
                <label className="block mb-2">Grupos</label>
                <select className="border text-black rounded p-2 w-full" value={editableUser.group} onChange={e => setEditableUser({ ...editableUser, group: e.target.value })}>
                  <option value="">Selecciona un grupo</option>
                  {groups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                  ))}
                </select>
              </div>
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
