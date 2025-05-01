import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../assets/images/Logo.jpg';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white font-sans text-black flex flex-col">
      <header className="flex items-center justify-between p-6 md:p-10 shadow bg-[#191970] text-white">
        <Link href="/" passHref>
          <Image src={logo} alt="Logo HermandApp" width={300} />
        </Link>
        <Link
          href={
            typeof window !== 'undefined' && window.location.pathname === '/register'
              ? '/login'
              : typeof window !== 'undefined' && window.location.pathname === '/login'
              ? '/register'
              : '/login'
          }
          className="text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]"
        >
          {typeof window !== 'undefined' && window.location.pathname === '/register'
            ? 'Login'
            : typeof window !== 'undefined' && window.location.pathname === '/login'
            ? 'Registro'
            : 'Login'}
        </Link>
      </header>

      <main className="flex-1 p-4 md:p-10 bg-[#f4f6f8]">
        {children}
      </main>

      <footer className="bg-[#191970] text-white text-center py-8 text-sm">
        <p className="text-lg mb-4">¿Tienes alguna duda?</p>
        <a
          href="mailto:delgado.pallares.david@gmail.com"
          className="inline-block text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]"
        >
          Contacta con nosotros
        </a>
        <div className="mt-6">
          <p>Desarrollado por David Delgado Pallares</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
