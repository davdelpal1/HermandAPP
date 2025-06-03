import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';

export default function DetalleHermano() {
  const router = useRouter();
  const { id } = router.query;
  const [hermano, setHermano] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newTunic, setNewTunic] = useState('');
  const [newQuota, setNewQuota] = useState('');

  const [form, setForm] = useState({
      name: '', lastName: '', gender: '', dni: '', email: '', phone: '',
      admissionDate: '', birthDate: '', identifier: '', denomination: '', height: '',
      type: 'Asociado', avatarFile: null as File | null, avatarUrl: '', files: [] as File[],
      // 🟢 Campos adicionales para la secretaría
      country: '', province: '', city: '', postalCode: '', address: '', secretaryEmail: '', secretaryPhone: '',
      occupation: '', phone2: '', medalDate: '', parish: '', parishCity: '', baptized: false, dataProtection: false,
      notifications: false, postalMail: false, emails: false,
      // 🟢 Añadido para familias y grupos
      familyGroups: '', hasTunic: false, tunics: [] as string[], quotas: [] as string[], outingsPermission: false,
      paymentMethod: '', paymentAddress: '', paymentIban: '', paymentBic: '', paymentHolder: '', paymentNif: '',
      paymentDate: '', declarante: '',
      // 🟢 Añadido para tesorería
      accountHolderName: '', accountHolderNIF: '', authorizationDate: '',
      iban: '', // 🟢 Añadido para evitar error
      bic: ''   // 🟢 Añadido para evitar error
    });

  useEffect(() => {
    if (id) {
      const fetchHermano = async () => {
        const docRef = doc(db, 'hermanos', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHermano(docSnap.data());
        }
        setLoading(false);
      };
      fetchHermano();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setHermano((prev: any) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const docRef = doc(db, 'hermanos', id as string);
      await updateDoc(docRef, hermano);
      alert('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Ocurrió un error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-center">Cargando...</p>;
  if (!hermano) return <p className="p-6 text-center">Hermano no encontrado.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Detalles del Hermano</h1>
        <Link href="/hermanos" className="bg-white text-red-700 px-4 py-2 rounded">Volver</Link>
      </header>

      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Información personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" value={hermano.name || ''} onChange={handleChange} placeholder="Nombre" className="border p-2" />
            <input name="lastName" value={hermano.lastName || ''} onChange={handleChange} placeholder="Apellidos" className="border p-2" />
            <select name="gender" value={hermano.gender || ''} onChange={handleChange} className="border p-2">
              <option value="">Selecciona género</option>
              <option>Hombre</option>
              <option>Mujer</option>
            </select>
            <input name="dni" value={hermano.dni || ''} onChange={handleChange} placeholder="DNI" className="border p-2" />
            <input name="email" value={hermano.email || ''} onChange={handleChange} placeholder="Email" className="border p-2" />
            <input name="phone" value={hermano.phone || ''} onChange={handleChange} placeholder="Teléfono" className="border p-2" />
            <input name="admissionDate" type="date" value={hermano.admissionDate || ''} onChange={handleChange} className="border p-2" />
            <input name="birthDate" type="date" value={hermano.birthDate || ''} onChange={handleChange} className="border p-2" />
            <input name="identifier" value={hermano.identifier || ''} onChange={handleChange} placeholder="Identificador" className="border p-2" />
            <input name="denomination" value={hermano.denomination || ''} onChange={handleChange} placeholder="Denominación" className="border p-2" />
            <input name="height" value={hermano.height || ''} onChange={handleChange} placeholder="Altura" className="border p-2" />
            <select name="type" value={hermano.type || ''} onChange={handleChange} className="border p-2">
              <option>Asociado</option>
              <option>Activo</option>
              <option>Aspirante</option>
              <option>Honorífico</option>
            </select>
          </div>
        </div>

        <div className="md:col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Secretaría</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>País</label>
              <input name="country" value={hermano.country || ''} onChange={handleChange} placeholder="País" className="border rounded p-2 w-full text-black" />
            </div>
            <div>
              <label>Provincia</label>
              <input name="province" value={hermano.province || ''} onChange={handleChange} placeholder="Provincia" className="border rounded p-2 w-full text-black" />
            </div>
            <div>
                <label>Localidad</label>
                <input name="city" value={hermano.city || ''} onChange={handleChange} placeholder="Localidad" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Código Postal</label>
                <input name="postalCode" value={hermano.postalCode || ''} onChange={handleChange} placeholder="Código Postal" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Dirección</label>
                <input name="address" value={hermano.address || ''} onChange={handleChange} placeholder="Dirección" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Email</label>
                <input name="secretaryEmail" value={hermano.secretaryEmail || ''} onChange={handleChange} placeholder="Email" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Teléfono</label>
                <input name="secretaryPhone" value={hermano.secretaryPhone || ''} onChange={handleChange} placeholder="Teléfono" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Trabajo/ocupación</label>
                <input name="occupation" value={hermano.occupation || ''} onChange={handleChange} placeholder="Ocupación" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Teléfono 2</label>
                <input name="phone2" value={hermano.phone2 || ''} onChange={handleChange} placeholder="Teléfono 2" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Fecha de imposición de medalla</label>
                <input name="medalDate" type="date" value={hermano.medalDate || ''} onChange={handleChange} className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Parroquia</label>
                <input name="parish" value={hermano.parish || ''} onChange={handleChange} placeholder="Parroquia" className="border rounded p-2 w-full text-black" />
                </div>
                <div>
                <label>Localidad de la parroquia</label>
                <input name="parishCity" value={hermano.parishCity || ''} onChange={handleChange} placeholder="Localidad parroquia" className="border rounded p-2 w-full text-black" />
                </div>
                <div className="col-span-1 md:col-span-2 flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="baptized" checked={hermano.baptized || false} onChange={handleChange} />
                    Bautizado
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="dataProtection" checked={hermano.dataProtection || false} onChange={handleChange} />
                    Protección de datos firmada
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="notifications" checked={hermano.notifications || false} onChange={handleChange} />
                    Puede recibir notificaciones
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="postalMail" checked={hermano.postalMail || false} onChange={handleChange} />
                    Correo postal
                </label>
                <label className="flex items-center gap-2">
                    <input type="checkbox" name="emails" checked={hermano.emails || false} onChange={handleChange} />
                    Puede recibir emails
                </label>
                </div>
            </div>
        </div>


        <div className="md:col-span-3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Túnicas</h2>
            <label className="flex items-center gap-2 my-2">
                <input
                type="checkbox"
                checked={form.hasTunic}
                onChange={e => setForm(prev => ({ ...prev, hasTunic: e.target.checked }))}
                />
                Túnica/s en propiedad
            </label>

            {/* Listado de túnicas añadidas */}
            {form.tunics.length > 0 && (
                <ul className="list-disc pl-4 mb-2">
                {form.tunics.map((tunic, idx) => (
                    <li key={idx}>{tunic}</li>
                ))}
                </ul>
            )}

            <div className="flex items-center gap-2 mt-2">
                <input
                type="text"
                value={newTunic}
                onChange={e => setNewTunic(e.target.value)}
                placeholder="Nueva túnica"
                className="border p-2 rounded w-full"
                />
                <button
                onClick={() => {
                    if (newTunic.trim()) {
                    setForm(prev => ({ ...prev, tunics: [...prev.tunics, newTunic] }));
                    setNewTunic('');
                    }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                + Añadir
                </button>
            </div>
            </div>

        <div className="md:col-span-3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Cuotas</h2>

            {/* Listado de cuotas añadidas */}
            {form.quotas.length > 0 && (
                <ul className="list-disc pl-4 mb-2">
                {form.quotas.map((quota, idx) => (
                    <li key={idx}>{quota}</li>
                ))}
                </ul>
            )}

            <div className="flex items-center gap-2 mt-2">
                <input
                type="text"
                value={newQuota}
                onChange={e => setNewQuota(e.target.value)}
                placeholder="Nueva cuota"
                className="border p-2 rounded w-full"
                />
                <button
                onClick={() => {
                    if (newQuota.trim()) {
                    setForm(prev => ({ ...prev, quotas: [...prev.quotas, newQuota] }));
                    setNewQuota('');
                    }
                }}
                className="bg-red-500 text-white px-3 py-1 rounded"
                >
                + Añadir
                </button>
            </div>
            </div>


        <div className="md:col-span-3 bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">Tesorería</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                <label>Método de pago</label>
                <select
                    name="paymentMethod"
                    value={form.paymentMethod || ''}
                    onChange={e => setForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="border p-1 w-full"
                >
                    <option value="">Selecciona un método</option>
                    <option value="Transferencia">Transferencia</option>
                    <option value="Recibo">Recibo</option>
                </select>
                </div>
                <div>
                <label>Dirección de pago</label>
                <input
                    type="text"
                    name="paymentAddress"
                    value={form.paymentAddress || ''}
                    onChange={e => setForm(prev => ({ ...prev, paymentAddress: e.target.value }))}
                    className="border p-1 w-full"
                    placeholder="Dirección"
                />
                </div>
                <div>
                <label>IBAN</label>
                <input
                    type="text"
                    name="iban"
                    value={form.iban || ''}
                    onChange={e => setForm(prev => ({ ...prev, iban: e.target.value }))}
                    className="border p-1 w-full"
                    placeholder="IBAN"
                />
                </div>
                <div>
                <label>Código BIC</label>
                <input
                    type="text"
                    name="bic"
                    value={form.bic || ''}
                    onChange={e => setForm(prev => ({ ...prev, bic: e.target.value }))}
                    className="border p-1 w-full"
                    placeholder="BIC"
                />
                </div>
                {/* 🟥 En la misma línea */}
                <div className="col-span-2 flex gap-2">
                <div className="flex-1">
                    <label>Nombre titular</label>
                    <input
                    type="text"
                    name="accountHolderName"
                    value={form.accountHolderName || ''}
                    onChange={e => setForm(prev => ({ ...prev, accountHolderName: e.target.value }))}
                    className="border p-1 w-full"
                    placeholder="Nombre"
                    />
                </div>
                <div className="flex-1">
                    <label>NIF titular</label>
                    <input
                    type="text"
                    name="accountHolderNIF"
                    value={form.accountHolderNIF || ''}
                    onChange={e => setForm(prev => ({ ...prev, accountHolderNIF: e.target.value }))}
                    className="border p-1 w-full"
                    placeholder="NIF"
                    />
                </div>
                <div className="flex-1">
                    <label>Fecha autorización</label>
                    <input
                    type="date"
                    name="authorizationDate"
                    value={form.authorizationDate || ''}
                    onChange={e => setForm(prev => ({ ...prev, authorizationDate: e.target.value }))}
                    className="border p-1 w-full"
                    />
                </div>
                </div>
            </div>
            </div>

      </main>

      <footer className="p-4 bg-gray-100 border-t flex justify-end">
        <button onClick={handleSave} disabled={saving} className="bg-red-700 text-white px-4 py-2 rounded">
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </footer>
    </div>
  );
}
