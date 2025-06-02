import React from 'react';
import Link from 'next/link';
import TablePlaceholder from '../../components/TablePlaceholder';

export default function NuevoHermanoPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Nuevo Hermano</h1>
        <Link href="/hermanos" className="text-white underline">Volver a Hermanos</Link>
      </header>
      <main className="flex-1 p-6">
        <p className="text-lg text-black">Formulario para agregar un nuevo hermano.</p>
        <div className="mt-4 bg-white text-black rounded shadow p-4">
          <p>Próximamente podrás registrar un nuevo hermano en la hermandad.</p>
        </div>
        <TablePlaceholder />
      </main>
    </div>
  );
}
