import React from 'react';
import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

interface UserDropdownProps {
  user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 focus:outline-none">
        <Image
          src={user.photoURL || '/user-avatar.png'}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-semibold">{user.displayName || user.email}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity z-10">
        <div className="py-2">
          <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Perfil</Link>
          <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Configuración</Link>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              const auth = getAuth();
              auth.signOut();
              router.push('/login');
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
