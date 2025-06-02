import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Layout from '@/components/Layout';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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
const db = getFirestore(app);

const Register = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      let avatarURL = '';
      if (avatarFile) {
        const storage = getStorage(app);
        const avatarRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(avatarRef, avatarFile);
        avatarURL = await getDownloadURL(avatarRef);
      }

      await setDoc(doc(db, "users", user.uid), {
        name,
        userName,
        email,
        phone,
        avatar: avatarURL,
        uid: user.uid,
      });
      window.location.href = '/dashboard';
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Ocurrió un error inesperado.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <Layout>
        <main className="p-2 md:p-4" style={{ background: '#f4f6f8' }}>
          <section id="hermandapp" className="text-center py-10">
            <h2 className="text-3xl font-bold mb-4">Bienvenido a HermandAPP</h2>
            <p className="text-xl mb-4">Regístrate para acceder a todas las funcionalidades.</p>
          </section>
          <div style={styles.container}>
            <div style={styles.box}>
              <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>
                <form onSubmit={handleRegister}>
                <label style={{ fontWeight: 'bold' }}>
                  Nombre y apellidos <span className=" text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  required
                />

                <label style={{ fontWeight: 'bold' }}>
                  Nombre de usuario <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={styles.input}
                  required
                />

                <label style={{ fontWeight: 'bold' }}>
                  Correo electrónico <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />

                <label style={{ fontWeight: 'bold' }}>
                  Teléfono <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                  required
                />

                <label style={{ fontWeight: 'bold' }}>
                  Foto de perfil
                </label>
                <input
                  type="file"
                  accept="image/*"
                  style={styles.input}
                  onChange={e => setAvatarFile(e.target.files?.[0] || null)}
                />

                <label style={{ fontWeight: 'bold' }}>
                  Contraseña <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  required
                />

                <label style={{ fontWeight: 'bold' }}>
                  Confirmar contraseña <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
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
        </main>
      </Layout>
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
    paddingTop: '0px',
  },
  box: {
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