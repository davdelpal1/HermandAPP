import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import Image from 'next/image';
import logo from '../assets/images/Logo.jpg';

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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Correo de recuperación enviado.');
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <header className="flex items-center justify-between p-10 shadow bg-[#191970] text-white">
        <Image src={logo} alt="Logo HermandApp" width={300} />
        <a href="../login" className="btn text-xl font-bold px-6 py-3 bg-[#800000] text-white rounded-lg hover:bg-[#990000]">
          Acceso
        </a>
      </header>
      <main className="p-2 md:p-4" style={{ background: '#f4f6f8' }}>
        <section id="hermandapp" className="text-center py-10">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a HermandAPP</h2>
          <p className="text-xl mb-4">Inicia sesión para acceder a todas las funcionalidades.</p>
        </section>
        <div style={styles.container}>
          <div style={styles.box}>
            <h2 style={{ textAlign: 'center' }}>Recuperar contraseña</h2>
            <form onSubmit={handleReset}>
              <input
                type="email"
                placeholder="Introduce tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
              <button type="submit" style={styles.button}>Enviar</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
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
  box: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '300px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    marginTop: '20px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#800020',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  message: {
    marginTop: '10px',
    textAlign: 'center',
    color: '#555',
  },
};

export default ForgotPassword;
