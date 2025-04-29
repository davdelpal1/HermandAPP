import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
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

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      window.location.href = '/dashboard';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={{ textAlign: 'center' }}>Crear cuenta</h2>
        <form onSubmit={handleRegister}>
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
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>Registrarse</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
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
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '0.9rem',
    textAlign: 'center',
  },
};

export default Register;
