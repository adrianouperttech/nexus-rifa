import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://nexus-rifa.onrender.com').replace(/\/+$/g, '');

async function apiFetch(path: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const isAbsolute = /^https?:\/\//i.test(path);
  const normalizedPath = isAbsolute ? path : path.replace(/^\/+/, '');
  const url = isAbsolute
    ? normalizedPath
    : new URL(normalizedPath, `${API_BASE_URL}/`).toString();

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => '');
    throw new Error(body || `${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return null;
  return response.json();
}

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await apiFetch('/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      setMessage('Um link para redefinição de senha foi enviado para o seu e-mail.');
    } catch (err: any) {
      setError(`Falha ao enviar o e-mail: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container small">
      <h1>Esqueci minha senha</h1>
      <p>Insira seu e-mail para receber um link de redefinição de senha.</p>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit" disabled={loading}>Enviar</button>
      </form>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
      <br />
      <Link to="/login">Voltar para o Login</Link>
    </main>
  );
};

export default ForgotPasswordPage;
