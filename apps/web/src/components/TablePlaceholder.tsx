import React from 'react';

export default function TablePlaceholder() {
  return (
    <div className="w-full bg-white rounded shadow p-4">
      <p className="text-center text-gray-600">[Tabla de datos aparecerá aquí]</p>
      <table className="table-auto w-full text-black mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Columna 1</th>
            <th className="border px-4 py-2">Columna 2</th>
            <th className="border px-4 py-2">Columna 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">Dato 1</td>
            <td className="border px-4 py-2">Dato 2</td>
            <td className="border px-4 py-2">Dato 3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
