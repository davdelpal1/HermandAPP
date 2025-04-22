import React from 'react';
import logo from '../assets/images/Logo-HermandAPP.jpg';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <header className="flex items-center justify-between p-4 shadow">
      <Image src={logo} alt="Logo HermandApp" width={200} />
        <nav className="hidden md:flex gap-4">
          <a href="#ventajas">Ventajas</a>
          <a href="#opiniones">Opiniones</a>
          <a href="/planes">Planes</a>
          <a href="/planes#recomendaciones">Descuentos</a>
          <a href="#contact-section">Contacto</a>
        </nav>
        <a href="../login" className="btn">Acceso</a>
      </header>

      <main className="p-8">
        <section id="hermandapp" className="text-center py-10">
          <h1 className="text-3xl font-bold">El software cofrade que lo cambiará TODO</h1>
          <h2 className="text-xl my-4">Perfecto para la gestión de hermandades, asociaciones, agrupaciones y cofradías</h2>
          <a href="../registro" className="btn bg-red-700 text-white px-6 py-2 rounded-full mt-4 inline-block">
            Regístrate gratis
          </a>
        </section>

        <section id="ventajas" className="py-10">
          <h2 className="text-center text-2xl font-bold mb-4">Ventajas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold">Efectividad</h4>
              <p>Gestiona tu organización de forma integral, sencilla y eficaz.</p>
            </div>
            <div>
              <h4 className="font-semibold">Comodidad</h4>
              <p>Accede desde cualquier dispositivo en cualquier momento.</p>
            </div>
            {/* Puedes seguir agregando más ventajas como las demás */}
          </div>
        </section>

        <section id="contact-section" className="bg-red-700 text-white text-center py-10">
          <p className="text-lg">¿Tienes alguna duda?</p>
          <button className="btn bg-white text-red-700 px-6 py-2 rounded-full mt-4">
            Contacta con nosotros
          </button>
        </section>
      </main>

      <footer className="bg-gray-100 p-8">
        <p className="text-center text-sm">Desarrollado por David Delgado Pallares</p>
      </footer>
    </div>
  );
}
