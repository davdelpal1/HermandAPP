import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [editableUser, setEditableUser] = useState<any>({ name: '', userName: '', email: '', phone: '', avatar: '', avatarFile: null });
  const [groups, setGroups] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

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
        userName: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: userData.phone || "",
          avatar: currentUser.photoURL || "/user-avatar.png",
        });
        setEditableUser({
          name: currentUser.displayName || "",
          userName: currentUser.displayName || "",
          email: currentUser.email || "",
          phone: userData.phone || "",
          avatar: currentUser.photoURL || "/user-avatar.png",
          avatarFile: null,
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
    const storage = getStorage();
    if (auth.currentUser) {
      try {
        setUploading(true);
        let avatarURL = user.avatar;
        if (editableUser.avatarFile) {
          const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
          await uploadBytes(avatarRef, editableUser.avatarFile);
          avatarURL = await getDownloadURL(avatarRef);
        }

        await updateProfile(auth.currentUser, {
          displayName: editableUser.name,
          photoURL: avatarURL,
        });

        await setDoc(doc(db, "users", auth.currentUser.uid), {
          phone: editableUser.phone,
          userName: editableUser.userName,
          name: editableUser.name,
          avatar: avatarURL,
        }, { merge: true });

        alert("Perfil actualizado correctamente.");
        setUser({ ...editableUser, avatar: avatarURL });
        setUploading(false);
      } catch (error) {
        console.error("Error al actualizar el perfil", error);
        setUploading(false);
      }
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditableUser({ ...editableUser, avatar: URL.createObjectURL(file), avatarFile: file });
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
        <header className="bg-red-700 text-white px-6 py-4 flex justify-between items-center shadow">
            <div className="relative group">
                <span className="text-lg font-bold">Perfil</span>
            </div>
            

            <button className="relative group flex items-center px-4 py-2 text-white rounded hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400">
                <div className="relative flex items-center gap-3">
                    <Image
                        src={user.avatar || "/user-avatar.png"}
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-white"
                    />
                    <span className="hidden md:inline">{user.userName}</span>
                </div>
            
                <div className="absolute left-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity z-10">
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => { window.location.href = "/"; }}
                    >
                        Inicio
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={async () => {
                            const auth = (await import("firebase/auth")).getAuth();
                            await auth.signOut();
                            window.location.href = "/login";
                        }}
                    >
                        Cerrar sesión
                    </button>
                </div>
            </button>
        </header>
        <main className="p-6 overflow-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Editar Perfil</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white text-black p-4 rounded shadow">
              <label>Nombre</label>
              <input className="border rounded text-black p-2 w-full mb-2" value={editableUser.name} onChange={e => setEditableUser({ ...editableUser, name: e.target.value })} />
              <label>Nombre de usuario</label>
              <input className="border rounded text-black p-2 w-full mb-2" value={editableUser.userName} onChange={e => setEditableUser({ ...editableUser, userName: e.target.value })} />
              <label>Email</label>
              <input className="border rounded text-black p-2 w-full mb-2" value={editableUser.email} disabled />
              <label>Teléfono</label>
              <input className="border rounded text-black p-2 w-full mb-2" value={editableUser.phone} onChange={e => setEditableUser({ ...editableUser, phone: e.target.value })} />
              <button className="mt-2 px-4 py-2 bg-red-700 text-white rounded" onClick={handleSave} disabled={uploading}>
                {uploading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
            <div className="bg-white text-black p-4 rounded shadow">
              <label>Foto de perfil</label>
              <Image src={editableUser.avatar || "/user-avatar.png"} alt="Avatar" width={120} height={120} className="rounded-full mb-2" />
              <input type="file" accept="image/*" onChange={handleAvatarChange} />
                {editableUser.avatarFile && (
                <div className="mt-2 text-sm text-black">
                    <p>Archivo seleccionado: {editableUser.avatarFile.name}</p>
                </div>
                )}
                <p className="text-sm text-black mt-2">Sube una imagen para actualizar tu foto de perfil.</p>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-black">Grupos</label>
                    <select
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500"
                        value={editableUser.group || ""}
                        onChange={e => setEditableUser({ ...editableUser, group: e.target.value })}
                    >
                      <option value="">Selecciona un grupo</option>
                      {groups.map((group, index) => (
                        <option key={index} value={group}>
                            {group}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Información del usuario</h2>
            <div className="bg-white text-black p-4 rounded shadow">
              <p className="font-semibold">Nombre:</p>
              <p>{editableUser.name}</p>
              <p className="font-semibold">Nombre de usuario:</p>
              <p>{editableUser.userName}</p>
              <p className="font-semibold">Email:</p>
              <p>{editableUser.email}</p>
              <p className="font-semibold">Teléfono:</p>
              <p>{editableUser.phone}</p>
              <p className="font-semibold">Grupo:</p>
              <p>{editableUser.group}</p>
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
