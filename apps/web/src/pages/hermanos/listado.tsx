import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Link from 'next/link';
import Image from 'next/image';

export default function ListadoHermanos() {
  const [hermanos, setHermanos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHermanos = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'hermanos'));
        const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHermanos(lista);
      } catch (error) {
        console.error('Error al obtener hermanos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHermanos();
  }, []);

  if (loading) return <p>Cargando listado...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Listado de Hermanos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hermanos.length === 0 && <p>No hay hermanos registrados.</p>}
        {hermanos.map((hermano) => (
          <div key={hermano.id} className="bg-white rounded p-4 shadow flex flex-col items-center">
            {hermano.avatarUrl ? (
              <Image src={hermano.avatarUrl} alt={hermano.name} width={150} height={150} className="rounded" />
            ) : (
              <div className="w-[150px] h-[150px] bg-gray-200 rounded flex items-center justify-center">Sin foto</div>
            )}
            <h2 className="text-lg font-bold mt-2">{hermano.name} {hermano.lastName}</h2>
            <p>{hermano.type || 'Tipo no especificado'}</p>
            <Link href={`/hermanos/${hermano.id}`} className="mt-2 px-4 py-1 bg-red-700 text-white rounded">Ver Detalle</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
