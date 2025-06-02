import React from 'react';
import Link from 'next/link';
import ChartPlaceholder from '@/components/ChartPlaceholder';

export default function HistorialPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Historial de Participación</h1>
        <Link href="/hermanos" className="text-white underline">Volver a Hermanos</Link>
      </header>
      <main className="flex-1 p-6">
        <p className="text-lg text-black">Aquí podrás consultar el historial de participación de los hermanos en eventos, reuniones y otras actividades de la hermandad.</p>
        {/* Placeholder de tabla o listado */}
        <div className="mt-4 bg-white text-black rounded shadow p-4">
          <p>Próximamente se mostrará un gráfico de eventos y participación.</p>
        </div>
        {/* Placeholder de gráfico */}
        <ChartPlaceholder />
      </main>
    </div>
  );
}
