import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import Image from 'next/image';

export default function HermanoDetalle() {
  const router = useRouter();
  const { id } = router.query;
  const [hermano, setHermano] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchHermano = async () => {
      const docRef = doc(db, 'hermanos', id as string);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHermano(docSnap.data());
      } else {
        alert('Hermano no encontrado');
        router.push('/hermanos');
      }
      setLoading(false);
    };
    fetchHermano();
  }, [id, router]);

  if (loading) return <p>Cargando...</p>;
  if (!hermano) return <p>No se encontró el hermano.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Detalle del hermano</h1>
      <div className="bg-white rounded p-4 shadow">
        <h2 className="text-lg font-bold">Información básica</h2>
        <p><strong>Nombre:</strong> {hermano.name} {hermano.lastName}</p>
        <p><strong>Género:</strong> {hermano.gender}</p>
        <p><strong>DNI:</strong> {hermano.dni}</p>
        <p><strong>Tipo:</strong> {hermano.type}</p>
        {hermano.avatarUrl && <Image src={hermano.avatarUrl} alt="Avatar" width={150} height={150} className="rounded" />}
        <h2 className="text-lg font-bold mt-4">Secretaría</h2>
        <p><strong>Dirección:</strong> {hermano.address}, {hermano.city}, {hermano.province}, {hermano.postalCode}, {hermano.country}</p>
        <p><strong>Email:</strong> {hermano.secretaryEmail}</p>
        <p><strong>Teléfono:</strong> {hermano.secretaryPhone}</p>
        <p><strong>Trabajo:</strong> {hermano.occupation}</p>
        <p><strong>Parroquia:</strong> {hermano.parish} ({hermano.parishCity})</p>

        <h2 className="text-lg font-bold mt-4">Familias y Grupos</h2>
        <p>{hermano.familyGroups || 'No especificado'}</p>

        <h2 className="text-lg font-bold mt-4">Túnicas</h2>
        {hermano.hasTunic ? <p>Posee túnica en propiedad</p> : <p>No posee túnica</p>}
        <ul>{hermano.tunics?.map((t: string, i: number) => <li key={i}>{t}</li>)}</ul>

        <h2 className="text-lg font-bold mt-4">Cuotas</h2>
        <ul>{hermano.quotas?.map((q: string, i: number) => <li key={i}>{q}</li>)}</ul>

        <h2 className="text-lg font-bold mt-4">Salidas</h2>
        <p>{hermano.outingsPermission ? 'Permitido' : 'No permitido'}</p>

        <h2 className="text-lg font-bold mt-4">Observaciones</h2>
        <div dangerouslySetInnerHTML={{ __html: hermano.observations || '<p>Sin observaciones</p>' }} />
      </div>
      <button onClick={() => router.push('/hermanos')} className="mt-4 px-4 py-2 bg-red-700 text-white rounded">Volver</button>
    </div>
  );
}
