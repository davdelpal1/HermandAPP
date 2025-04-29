import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f6f8',
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
