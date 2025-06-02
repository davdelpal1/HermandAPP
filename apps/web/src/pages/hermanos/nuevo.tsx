import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function NuevoHermano() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    gender: '',
    dni: '',
    email: '',
    phone: '',
    admissionDate: '',
    birthDate: '',
    identifier: '',
    denomination: '',
    height: '',
    type: 'Asociado',
    avatarFile: null as File | null,
    avatarUrl: '',
    files: [] as File[]
  });
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, avatarFile: file }));
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  // Limpia el objeto URL cuando cambia el archivo o al desmontar
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setForm(prev => ({ ...prev, files }));
  };

  const canSave = form.name && form.lastName && form.gender && form.type;

  const handleSave = async () => {
    if (!canSave) return;
    try {
      setSaving(true);
      let avatarUrl = '';
      if (form.avatarFile) {
        const avatarRef = ref(storage, `hermanos/avatars/${form.avatarFile.name}`);
        await uploadBytes(avatarRef, form.avatarFile);
        avatarUrl = await getDownloadURL(avatarRef);
      }

      const fileUrls: string[] = [];
      for (const file of form.files) {
        const fileRef = ref(storage, `hermanos/files/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        fileUrls.push(url);
      }

      await addDoc(collection(db, 'hermanos'), {
        ...form,
        avatarUrl,
        files: fileUrls,
        createdAt: serverTimestamp()
      });

      alert('Hermano creado correctamente.');
      setForm({
        name: '',
        lastName: '',
        gender: '',
        dni: '',
        email: '',
        phone: '',
        admissionDate: '',
        birthDate: '',
        identifier: '',
        denomination: '',
        height: '',
        type: 'Asociado',
        avatarFile: null,
        avatarUrl: '',
        files: []
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nuevo hermano</h1>
        <Link href="/hermanos" className="text-white underline">Volver</Link>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Información del hermano */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg text-black font-bold mb-4">Información del hermano</h2>
          <div className="grid text-black grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Nombre*" value={form.name} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="lastName" placeholder="Apellidos*" value={form.lastName} onChange={handleChange} className="border text-black rounded p-2" />
            <select name="gender" value={form.gender} onChange={handleChange} className="border text-black rounded p-2">
              <option value="">Selecciona género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            <input name="dni" placeholder="DNI/NIF/CIF" value={form.dni} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="admissionDate" type="date" placeholder="Fecha de admisión" value={form.admissionDate} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="birthDate" type="date" placeholder="Fecha de nacimiento" value={form.birthDate} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="identifier" placeholder="Identificador adicional" value={form.identifier} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="denomination" placeholder="Denominación/Tratamiento" value={form.denomination} onChange={handleChange} className="border text-black rounded p-2" />
            <input name="height" placeholder="Altura/Talla (cm)" value={form.height} onChange={handleChange} className="border text-black rounded p-2" />
            <select name="type" value={form.type} onChange={handleChange} className="border text-black rounded p-2">
              <option value="Asociado">Asociado</option>
              <option value="Activo">Activo</option>
              <option value="Aspirante">Aspirante</option>
              <option value="Honorífico">Honorífico</option>
            </select>
          </div>
        </div>

        {/* Foto y Archivos */}
        <div className="bg-white text-black p-4 rounded shadow flex flex-col gap-4">
          <div>
            <h2 className="text-lg text-black font-bold mb-2">Foto de perfil</h2>
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Preview"
                className="rounded text-black w-full h-auto mb-2"
                width={300}
                height={300}
                style={{ objectFit: 'cover' }}
              />
            ) : (
              <div className="border rounded p-4 text-center text-black">No imagen seleccionada</div>
            )}
            <input type="file" accept="image/*" onChange={handleAvatar} />
          </div>
          <div>
            <h2 className="text-lg text-black font-bold mb-2">Archivos del hermano</h2>
            <input type="file" multiple onChange={handleFiles} />
            <p className="text-sm text-black">Archivos seleccionados: {form.files.length}</p>
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white border-t flex justify-end">
        <button onClick={handleSave} disabled={!canSave || saving} className="bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50">
          {saving ? 'Guardando...' : 'Crear hermano'}
        </button>
      </footer>
    </div>
  );
}
