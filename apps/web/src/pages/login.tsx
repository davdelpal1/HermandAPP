import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';  
import Image from 'next/image';
import logo from '../assets/images/Logo.jpg';
import Link from 'next/link';

// Configura tu proyecto de Firebase aquí
const firebaseConfig = {
  apiKey: "AIzaSyBa48T8X9LC95zI5lKZpOAD5DalmGuCytI",
  authDomain: "hermandapp-bed16.firebaseapp.com",
  projectId: "hermandapp-bed16",
  storageBucket: "hermandapp-bed16.firebasestorage.app",
  messagingSenderId: "326574651601",
  appId: "1:326574651601:web:fc34c05902155f2b322df0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirige si quieres
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <header className="flex items-center justify-between p-10 shadow bg-[#191970] text-white">
        <Link href="/" passHref>
          <Image src={logo} alt="Logo HermandApp" width={300} />
        </Link>
        <a href="../register" className="btn text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]">
          Registro
        </a>
      </header>
      <main className="p-2 md:p-4" style={{ background: '#f4f6f8' }}>
        <section id="hermandapp" className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a HermandAPP</h2>
          <p className="text-xl mb-4">Inicia sesión para acceder a todas las funcionalidades.</p>
        </section>
        <div style={styles.container}>
          <div style={styles.loginBox}>
            <h2 style={{ textAlign: 'center', fontWeight: 'bold' }}>Iniciar sesión</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>Entrar</button>
              {error && <p style={styles.error}>{error}</p>}
            </form>
            <div style={styles.links}>
              <a href="../forgotPassword">¿Olvidaste tu contraseña?</a><br />
              <a href="../register">Crear cuenta</a>
            </div>
          </div>
        </div>
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
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: '50vh',
    paddingBottom: '2rem',
    background: '#f4f6f8',
    paddingTop: '0px', // Reducido al mínimo
  },
  loginBox: {
    background: '#f4f6f8',
    color: 'black',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '320px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    background: '#f4f6f8',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#800020', // Burdeos
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
  links: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.9rem',
  },
};

export default Login;
