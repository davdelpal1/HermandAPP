import React from 'react';
import Link from 'next/link';
import ChartPlaceholder from '../../components/ChartPlaceholder';

export default function EstadisticasPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-red-700 text-white px-6 py-4 shadow flex items-center justify-between">
        <h1 className="text-2xl font-bold">Estadísticas y Métricas</h1>
        <Link href="/hermanos" className="text-white underline">Volver a Hermanos</Link>
      </header>
      <main className="flex-1 p-6">
        <p className="text-lg text-black">Aquí se podrán visualizar métricas y estadísticas de los hermanos.</p>
        {/* Placeholder de tabla */}
        <div className="mt-4 bg-white text-black rounded shadow p-4">
          <p>Próximamente se mostrará un gráfico de estadísticas de los hermanos.</p>
        </div>
        <ChartPlaceholder />
      </main>
    </div>
  );
}
