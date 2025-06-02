import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";
import UserDropdown from "../components/UserDropdown";
import { auth, db, storage } from '../lib/firebase';

interface EditableUser {
  name: string;
  userName: string;
  email: string;
  phone: string;
  avatar: string;
  avatarFile: File | null;
  group?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<EditableUser | null>(null);
  const [editableUser, setEditableUser] = useState<EditableUser | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const data = userDoc.exists() ? userDoc.data() : {};
        const userInfo: EditableUser = {
          name: data.name || currentUser.displayName || "",
          userName: data.userName || currentUser.displayName || "",
          email: data.email || currentUser.email || "",
          phone: data.phone || "",
          avatar: data.avatar || currentUser.photoURL || '',
          avatarFile: null,
          group: data.group || ""
        };
        setUser(userInfo);
        setEditableUser(userInfo);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setEditableUser(prev => prev ? {
        ...prev,
        avatar: URL.createObjectURL(file), // Solo para previsualización
        avatarFile: file,
        } : null);
    }
  };

  const handleSave = async () => {
    if (!auth.currentUser || !editableUser) return;
    try {
        setUploading(true);
        let avatarURL = editableUser.avatar;
        // Solo sube si hay un archivo nuevo
        if (editableUser.avatarFile) {
        const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(avatarRef, editableUser.avatarFile);
        avatarURL = await getDownloadURL(avatarRef);
        }

        await setDoc(doc(db, "users", auth.currentUser.uid), {
        name: editableUser.name,
        userName: editableUser.userName,
        phone: editableUser.phone,
        avatar: avatarURL,
        email: editableUser.email,
        group: editableUser.group || ""
        }, { merge: true });

        // Actualiza el estado con la URL de Firebase, no la temporal
        setUser({ ...editableUser, avatar: avatarURL, avatarFile: null });
        setEditableUser(prev => prev ? { ...prev, avatar: avatarURL, avatarFile: null } : null);

        alert("Perfil actualizado correctamente.");
    } catch (error: unknown) {
        console.error("Error al guardar:", error);
        if (error instanceof Error) {
        alert(`Ocurrió un error al guardar: ${error.message}`);
        } else {
        alert("Ocurrió un error al guardar.");
        }
    } finally {
        setUploading(false);
    }
  };

  if (!editableUser) {
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
      <div className="flex-1 flex flex-col">
        <header className="bg-red-700 text-white px-6 py-4 flex justify-end items-center shadow">
          {user && <UserDropdown user={{ photoURL: user.avatar, displayName: user.userName, email: user.email }} />}
        </header>
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Perfil</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white text-black p-4 rounded shadow">
              <label>Nombre</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.name} onChange={e => setEditableUser(prev => prev ? { ...prev, name: e.target.value } : null)} />
              <label>Nombre de usuario</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.userName} onChange={e => setEditableUser(prev => prev ? { ...prev, userName: e.target.value } : null)} />
              <label>Email</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.email} disabled />
              <label>Teléfono</label>
              <input className="border rounded p-2 w-full mb-2" value={editableUser.phone} onChange={e => setEditableUser(prev => prev ? { ...prev, phone: e.target.value } : null)} />
              <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded" onClick={handleSave} disabled={uploading}>
                {uploading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
            <div className="bg-white text-black font-bold p-4 rounded shadow">
              <label>Foto de perfil</label>
              <Image src={editableUser.avatar || "/user-avatar.png"} alt="Avatar" width={200} height={200} className="rounded-full mb-2" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
              {editableUser.avatarFile && <p className="text-sm text-black mt-2">Archivo seleccionado: {editableUser.avatarFile.name}</p>}
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
