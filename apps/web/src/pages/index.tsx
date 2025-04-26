import React from 'react';
import logo from '../assets/images/Logo.jpg';
import SanAgustin from '../assets/images/SanAgustin.jpg';
import SantoEntierro from '../assets/images/SantoEntierro.jpg';
import TresCaidas from '../assets/images/TresCaidas.jpg';
import Macarena from '../assets/images/Macarena.jpg';
import Image from 'next/image';
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <header className="flex items-center justify-between p-10 shadow bg-[#191970] text-white">
        <Image src={logo} alt="Logo HermandApp" width={300} />
        <a href="../login" className="btn text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]">
          Acceso
        </a>
      </header>

      <main className="p-8">
        <section id="hermandapp" className="text-center py-10">
            <p className="text-xl">HermandApp es un software diseñado para la gestión integral de hermandades, asociaciones y agrupaciones. Con una interfaz intuitiva y fácil de usar, permite llevar un control exhaustivo de todos los aspectos relacionados con la organización.
              Desde la gestión de miembros y cuotas, hasta la planificación de eventos y actividades, HermandApp es la herramienta perfecta para cualquier organización que busque mejorar su eficiencia y organización.
              Además, cuenta con un sistema de notificaciones y recordatorios que te mantendrá siempre informado de las novedades y actividades de tu organización.
              No pierdas más tiempo gestionando tu organización de forma manual. Prueba HermandApp y descubre todo lo que puede hacer.</p>
            <p className="text-xl">¡Regístrate gratis y empieza a disfrutar de todas sus ventajas!</p>
          <div className="my-10"></div>

          <a href="../register" className="btn text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]">
            ¿No tienes cuenta? Regístrate gratis
          </a>
        </section>

        <section id="opiniones" className="py-2 bg-white-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Opiniones</h2>
            <div className="relative flex items-center">
              {/* Botón para retroceder */}
              <button
          className="absolute left-0 z-10 p-2 bg-[#800000] text-white rounded-full hover:bg-[#990000]"
          onClick={() => {
            const container = document.getElementById('opiniones-slider');
            container?.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
          }}
              >
          &#8592;
              </button>

              {/* Contenedor de opiniones */}
              <div
          id="opiniones-slider"
          className="flex overflow-x-auto scroll-smooth space-x-8"
          style={{ scrollSnapType: 'x mandatory' }}
              >
          {/* Testimonio 1 */}
          <div className="flex-shrink-0 w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg" style={{ scrollSnapAlign: 'start' }}>
            <Image src={SanAgustin} alt="Hermandad de San Agustín" className="w-full h-auto rounded-lg mb-4" />
            <p className="text-gray-700 italic mb-4">
              "Un software sencillo, intuitivo y con todas las funcionalidades que necesitamos. Gran soporte y mejoras constantes. ¡Recomendado al 100%!"
            </p>
            <div className="text-center font-bold text-gray-900">Hermandad de San Agustín (Granada)</div>
          </div>

          {/* Testimonio 2 */}
          <div className="flex-shrink-0 w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg" style={{ scrollSnapAlign: 'start' }}>
            <Image src={SantoEntierro} alt="Hermandad del Santo Entierro" className="w-full h-auto rounded-lg mb-4" />
            <p className="text-gray-700 italic mb-4">
              "HermandApp ha sido una revolución en nuestra organización interna. Fácil de usar y con un equipo detrás que escucha nuestras sugerencias."
            </p>
            <div className="text-center font-bold text-gray-900">Hermandad del Santo Entierro (Sevilla)</div>
          </div>

          {/* Testimonio 3 */}
          <div className="flex-shrink-0 w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg" style={{ scrollSnapAlign: 'start' }}>
            <Image src={TresCaidas} alt="Hermandad de la Esperanza de Triana" className="w-full h-auto rounded-lg mb-4" />
            <p className="text-gray-700 italic mb-4">
              "Gracias a HermandApp, la gestión de hermanos, cuotas y papeletas de sitio nunca había sido tan ágil. Muy recomendable."
            </p>
            <div className="text-center font-bold text-gray-900">Hermandad de la Esperanza de Triana (Sevilla)</div>
          </div>

          {/* Testimonio 4 */}
          <div className="flex-shrink-0 w-full max-w-sm bg-white p-6 rounded-2xl shadow-lg" style={{ scrollSnapAlign: 'start' }}>
            <Image src={Macarena} alt="Hermandad de la Esperanza Macarena" className="w-full h-auto rounded-lg mb-4" />
            <p className="text-gray-700 italic mb-4">
              "HermandApp ha transformado nuestra forma de trabajar. La gestión de eventos y actividades es mucho más sencilla y eficiente."
            </p>
            <div className="text-center font-bold text-gray-900">Hermandad de la Esperanza Macarena (Sevilla)</div>
          </div>
              </div>

              {/* Botón para avanzar */}
              <button
          className="absolute right-0 z-10 p-2 bg-[#800000] text-white rounded-full hover:bg-[#990000]"
          onClick={() => {
            const container = document.getElementById('opiniones-slider');
            container?.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
          }}
              >
          &#8594;
              </button>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#191970] text-white text-center py-10">
        <p className="text-lg mb-4">¿Tienes alguna duda?</p>
        <a href="mailto:delgado.pallares.david@gmail.com" className="btn text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]">
          Contacta con nosotros
        </a>
        <div className="my-8"></div>
        <p className="text-center text-sm">Desarrollado por David Delgado Pallares</p>
      </footer>
    </div>
  );
}