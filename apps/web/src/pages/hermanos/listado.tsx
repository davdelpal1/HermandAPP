import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function ListadoHermanos() {
  const [hermanos, setHermanos] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'hermanos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setHermanos(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este hermano?')) {
      await deleteDoc(doc(db, 'hermanos', id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold">Listado de Hermanos</h1>
        <Link href="/hermanos/nuevoHermano" className="bg-white text-red-700 px-4 py-2 rounded">+ Nuevo Hermano</Link>
      </header>

      <main className="flex-1 p-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-4">Hermanos Registrados</h2>
          {hermanos.length === 0 ? (
            <p className="text-gray-500">No hay hermanos registrados.</p>
          ) : (
            <table className="w-full border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border p-2">Nombre</th>
                  <th className="border p-2">Apellidos</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Tipo</th>
                  <th className="border p-2">Fecha Alta</th>
                  <th className="border p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {hermanos.map((hermano) => (
                  <tr key={hermano.id} className="text-center hover:bg-gray-100">
                    <td className="border p-2">{hermano.name}</td>
                    <td className="border p-2">{hermano.lastName}</td>
                    <td className="border p-2">{hermano.email}</td>
                    <td className="border p-2">{hermano.type}</td>
                    <td className="border p-2">{hermano.createdAt?.toDate?.().toLocaleDateString() || '—'}</td>
                    <td className="border p-2 flex justify-center gap-2">
                      <Link href={`/hermanos/${hermano.id}`} className="bg-blue-500 text-white px-2 py-1 rounded">Ver</Link>
                      <button onClick={() => handleDelete(hermano.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <footer className="p-4 bg-gray-100 border-t flex justify-end">
        <p className="text-sm text-gray-600">Total: {hermanos.length} hermanos</p>
      </footer>
    </div>
  );
}
