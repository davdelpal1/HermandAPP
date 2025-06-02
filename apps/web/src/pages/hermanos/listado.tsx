import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';

interface Hermano {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export default function ListadoHermano() {
  const [hermanos, setHermanos] = useState<Hermano[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHermanos = async () => {
      try {
        const q = query(collection(db, 'hermanos'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const hermanosData: Hermano[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          hermanosData.push({
            id: doc.id,
            name: data.name,
            email: data.email,
            phone: data.phone
          });
        });
        setHermanos(hermanosData);
      } catch (error) {
        console.error('Error al obtener hermanos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHermanos();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Listado de Hermanos</h1>
        <Link href="/hermanos" className="text-white underline">Volver a Hermanos</Link>
      </header>
      <main className="flex-1 p-6">
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table-auto w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Correo</th>
                <th className="border px-4 py-2">Teléfono</th>
              </tr>
            </thead>
            <tbody>
              {hermanos.map(h => (
                <tr key={h.id}>
                  <td className="border px-4 py-2">{h.name}</td>
                  <td className="border px-4 py-2">{h.email}</td>
                  <td className="border px-4 py-2">{h.phone || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}
