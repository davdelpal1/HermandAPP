import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEditor, EditorContent } from '@tiptap/react';
import Toolbar from '../../components/TiptapToolbar';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Blockquote from '@tiptap/extension-blockquote';
import Heading from '@tiptap/extension-heading';


export default function NuevoHermano() {
  const [form, setForm] = useState({
    name: '', lastName: '', gender: '', dni: '', email: '', phone: '',
    admissionDate: '', birthDate: '', identifier: '', denomination: '', height: '',
    type: 'Asociado', avatarFile: null as File | null, avatarUrl: '', files: [] as File[],
    // 🟢 Campos adicionales para la secretaría
    country: '', province: '', city: '', postalCode: '', address: '', secretaryEmail: '', secretaryPhone: '',
    occupation: '', phone2: '', medalDate: '', parish: '', parishCity: '', baptized: false, dataProtection: false,
    notifications: false, postalMail: false, emails: false,
    // 🟢 Añadido para familias y grupos
    familyGroups: '', hasTunic: false, tunics: [], quotas: [], outingsPermission: false,
  });
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false); // 🟢 Flag para indicar render en cliente

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2] }, // Configurar niveles de heading
      }),
      Underline, // Ahora complementamos StarterKit con otras extensiones
      Blockquote,
      Heading.configure({ levels: [2] }),
    ],
    content: '',
  });


  useEffect(() => {
    setIsClient(true); // Activamos el renderizado del cliente
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl); };
  }, [previewUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm(prev => ({ ...prev, avatarFile: file }));
    if (file) setPreviewUrl(URL.createObjectURL(file));
    else setPreviewUrl(null);
  };

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
        name: '', lastName: '', gender: '', dni: '', email: '', phone: '',
        admissionDate: '', birthDate: '', identifier: '', denomination: '', height: '',
        type: 'Asociado', avatarFile: null, avatarUrl: '', files: [],
        country: '', province: '', city: '', postalCode: '', address: '', secretaryEmail: '', secretaryPhone: '',
        occupation: '', phone2: '', medalDate: '', parish: '', parishCity: '', baptized: false, dataProtection: false,
        notifications: false, postalMail: false, emails: false,
        familyGroups: '', hasTunic: false, tunics: [], quotas: [], outingsPermission: false,
      });
      setPreviewUrl(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nuevo hermano</h1>
        <Link href="/hermanos" className="text-white underline">Volver</Link>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Información del hermano</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 🟢 Campos con labels y placeholders */}
            <div><label>Nombre*</label><input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Apellidos*</label><input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Apellidos" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Género*</label><select name="gender" value={form.gender} onChange={handleChange} className="border rounded p-2 w-full text-black"><option value="">Selecciona género</option><option>Hombre</option><option>Mujer</option></select></div>
            <div><label>DNI/NIF/CIF</label><input name="dni" value={form.dni} onChange={handleChange} placeholder="DNI" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Correo electrónico</label><input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Teléfono</label><input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Fecha de admisión*</label><input name="admissionDate" type="date" value={form.admissionDate} onChange={handleChange} className="border rounded p-2 w-full text-black" /></div>
            <div><label>Fecha de nacimiento</label><input name="birthDate" type="date" value={form.birthDate} onChange={handleChange} className="border rounded p-2 w-full text-black" /></div>
            <div><label>Identificador adicional</label><input name="identifier" value={form.identifier} onChange={handleChange} placeholder="Identificador" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Denominación</label><input name="denomination" value={form.denomination} onChange={handleChange} placeholder="Denominación" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Altura/Talla (cm)</label><input name="height" value={form.height} onChange={handleChange} placeholder="Altura" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Tipo*</label><select name="type" value={form.type} onChange={handleChange} className="border rounded p-2 w-full text-black"><option>Asociado</option><option>Activo</option><option>Aspirante</option><option>Honorífico</option></select></div>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex flex-col gap-4">
          <h2 className="text-lg font-bold mb-2">Foto de perfil</h2>
          {previewUrl ? <Image src={previewUrl} alt="Preview" width={300} height={300} className="rounded" /> : <div className="border rounded p-4 text-center text-gray-500">No imagen seleccionada</div>}
          <input type="file" accept="image/*" onChange={handleAvatar} />
          <h2 className="text-lg font-bold mb-2">Archivos del hermano</h2>
          <input type="file" multiple onChange={handleFiles} />
          {/* 🔥 Mostrar solo si estamos en cliente */}
          {isClient && <p>{form.files.length} archivos seleccionados</p>}
        </div>

        <div className="md:col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Secretaría</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label>País</label><input name="country" value={form.country || ''} onChange={handleChange} placeholder="País" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Provincia</label><input name="province" value={form.province || ''} onChange={handleChange} placeholder="Provincia" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Localidad</label><input name="city" value={form.city || ''} onChange={handleChange} placeholder="Localidad" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Código Postal</label><input name="postalCode" value={form.postalCode || ''} onChange={handleChange} placeholder="Código Postal" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Dirección</label><input name="address" value={form.address || ''} onChange={handleChange} placeholder="Dirección" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Email</label><input name="secretaryEmail" value={form.secretaryEmail || ''} onChange={handleChange} placeholder="Email" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Teléfono</label><input name="secretaryPhone" value={form.secretaryPhone || ''} onChange={handleChange} placeholder="Teléfono" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Trabajo/ocupación</label><input name="occupation" value={form.occupation || ''} onChange={handleChange} placeholder="Ocupación" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Teléfono 2</label><input name="phone2" value={form.phone2 || ''} onChange={handleChange} placeholder="Teléfono 2" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Fecha de imposición de medalla</label><input name="medalDate" type="date" value={form.medalDate || ''} onChange={handleChange} className="border rounded p-2 w-full text-black" /></div>
            <div><label>Parroquia</label><input name="parish" value={form.parish || ''} onChange={handleChange} placeholder="Parroquia" className="border rounded p-2 w-full text-black" /></div>
            <div><label>Localidad de la parroquia</label><input name="parishCity" value={form.parishCity || ''} onChange={handleChange} placeholder="Localidad parroquia" className="border rounded p-2 w-full text-black" /></div>
            <div><label><input type="checkbox" name="baptized" checked={form.baptized || false} onChange={handleChange} /> Bautizado</label></div>
            <div><label><input type="checkbox" name="dataProtection" checked={form.dataProtection || false} onChange={handleChange} /> Protección de datos firmada</label></div>
            <div><label><input type="checkbox" name="notifications" checked={form.notifications || false} onChange={handleChange} /> Puede recibir notificaciones</label></div>
            <div><label><input type="checkbox" name="postalMail" checked={form.postalMail || false} onChange={handleChange} /> Correo postal</label></div>
            <div><label><input type="checkbox" name="emails" checked={form.emails || false} onChange={handleChange} /> Puede recibir emails</label></div>
          </div>

          {/* Observaciones */}
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Observaciones</h3>
            {editor && (
              <>
                <Toolbar editor={editor} />
                <EditorContent editor={editor} className="border rounded p-2 bg-white min-h-[150px]" />
              </>
            )}
          </div>
        </div>

        {/* 🔥 Añadimos las nuevas secciones */}
        <div className="md:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Familias y grupos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
          <p className="text-sm text-gray-800 mb-1">Familias o grupos a los que pertenece el miembro</p>
          <select name="familyGroups" value={form.familyGroups} onChange={handleChange}
                className="border rounded p-2 w-full">
            <option value="">Selecciona las familias o grupos</option>
            <option value="GrupoA">Grupo A</option>
            <option value="GrupoB">Grupo B</option>
          </select>
        </div>
        <div className="bg-white p-4 rounded shadow flex flex-col gap-4">
          <h2 className="text-lg font-bold mb-2">Salidas</h2>
          <p className="text-sm text-gray-800 mb-1">Datos relativos a las salidas</p>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="outingsPermission" checked={form.outingsPermission} onChange={handleChange} />
              Permiso para participar en las salidas
            </label>
        </div>

      <div className="md:col-span-3 bg-white p-4 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Túnicas</h2>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="hasTunic" checked={form.hasTunic} onChange={handleChange} />
          Túnica/s en propiedad
        </label>
          <div className="mt-2">El miembro no tiene túnicas asociadas</div>
            <button type="button" className="mt-2 text-red-700">+ Añadir túnica</button>
        </div>

        <div className="md:col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Cuotas</h2>
          <div>El miembro no tiene cuotas asociadas</div>
          <button type="button" className="mt-2 text-red-700">+ Añadir cuota</button>
        </div>
      </main>

      <footer className="p-4 bg-gray-100 border-t flex justify-end">
        <button onClick={handleSave} disabled={!canSave || saving} className="bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50">
          {saving ? 'Guardando...' : 'Crear hermano'}
        </button>
      </footer>
    </div>
  );
}
