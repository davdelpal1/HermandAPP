import React from 'react';
import Link from 'next/link';
import TablePlaceholder from '../../components/TablePlaceholder';

export default function ListadoPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Listado de Hermanos</h1>
        <Link href="/hermanos" className="text-white underline">Volver a Hermanos</Link>
      </header>
      <main className="flex-1 p-6">
        <p className="text-lg text-black">Aquí se mostrará un listado completo de los hermanos registrados en la hermandad.</p>
        {/* Placeholder de tabla */}
        <div className="mt-4 bg-white text-black rounded shadow p-4">
          <p>Próximamente se mostrará una tabla con datos de los hermanos.</p>
        </div>
        <TablePlaceholder />
      </main>
    </div>
  );
}
