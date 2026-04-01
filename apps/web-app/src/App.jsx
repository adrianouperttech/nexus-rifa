import { useEffect, useState } from 'react'
import './App.css'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://nexus-rifa.onrender.com').replace(/\/+$/g, '')

function getToken() {
  return window.localStorage.getItem('nexus_rifa_token')
}

function setToken(token) {
  window.localStorage.setItem('nexus_rifa_token', token)
}

function clearToken() {
  window.localStorage.removeItem('nexus_rifa_token')
}

async function apiFetch(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const isAbsolute = /^https?:\/\//i.test(path)
  const normalizedPath = isAbsolute ? path : path.replace(/^\/+/, '')
  const url = isAbsolute ? normalizedPath : `${API_BASE_URL}/${normalizedPath}`

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(body || `${response.status} ${response.statusText}`)
  }

  if (response.status === 204) return null
  return response.json()
}

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [tenantId, setTenantId] = useState('default')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [rifas, setRifas] = useState([])
  const [title, setTitle] = useState('')
  const [descr, setDescr] = useState('')
  const [valor, setValor] = useState(10)
  const [minNum, setMinNum] = useState(1)
  const [maxNum, setMaxNum] = useState(100)

  const isLogged = Boolean(getToken())

  const fetchRifas = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await apiFetch('/rifas')
      setRifas(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(`Erro ao buscar rifas: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged) {
      fetchRifas()
    }
  }, [isLogged])

  const handleLogin = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password, tenant_id: tenantId }),
      })

      setToken(data.access_token)
      setEmail('')
      setPassword('')
      setError('')
      await fetchRifas()
    } catch (err) {
      setError(`Login falhou: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    clearToken()
    setRifas([])
    setError('')
    window.location.reload()
  }

  const handleCreateRifa = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const payload = {
        titulo: title,
        descricao: descr,
        valor_cota: Number(valor),
        min_num: Number(minNum),
        max_num: Number(maxNum),
        nome: title,
        limite: Number(maxNum),
      }

      await apiFetch('/rifas', {
        method: 'POST',
        body: JSON.stringify(payload),
      })

      setTitle('')
      setDescr('')
      setValor(10)
      setMinNum(1)
      setMaxNum(100)
      await fetchRifas()
    } catch (err) {
      setError(`Não foi possível criar rifa: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const dashboard = (
    <main className="container">
      <header className="topbar">
        <div>
          <h1>Nexus Rifa Dashboard</h1>
          <p>API: {API_BASE_URL}</p>
        </div>
        <button className="btn danger" onClick={handleLogout}>Logout</button>
      </header>

      <section className="panel">
        <h2>Nova Rifa</h2>
        <form onSubmit={handleCreateRifa} className="grid-form">
          <label>
            Título
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </label>
          <label>
            Descrição
            <input value={descr} onChange={(e) => setDescr(e.target.value)} />
          </label>
          <label>
            Valor cota
            <input type="number" min="1" value={valor} onChange={(e) => setValor(e.target.value)} required />
          </label>
          <label>
            Mínimo número
            <input type="number" min="1" value={minNum} onChange={(e) => setMinNum(e.target.value)} required />
          </label>
          <label>
            Máximo número
            <input type="number" min="1" value={maxNum} onChange={(e) => setMaxNum(e.target.value)} required />
          </label>
          <button className="btn primary" type="submit" disabled={loading}>Criar Rifa</button>
        </form>
      </section>

      <section className="panel">
        <h2>Rifas existentes</h2>
        {loading && <p>Carregando rifas...</p>}
        {!loading && rifas.length === 0 && <p>Sem rifas cadastradas.</p>}

        <div className="cards">
          {rifas.map((rifa) => (
            <article key={rifa.id} className="card">
              <h3>{rifa.titulo || rifa.nome}</h3>
              <p>{rifa.descricao || 'Sem descrição.'}</p>
              <small>
                Preço: R$ {rifa.valor_cota} | Min: {rifa.min_num} | Max: {rifa.max_num}
              </small>
              <span className={`badge ${rifa.status}`}>{rifa.status}</span>
            </article>
          ))}
        </div>
      </section>

      {error && <p className="error">{error}</p>}
    </main>
  )

  const loginForm = (
    <main className="container small">
      <div className="brand">Nexus Rifa</div>
      <h1>Entrar</h1>
      <form onSubmit={handleLogin}>
        <label>
          Tenant ID
          <input value={tenantId} onChange={(e) => setTenantId(e.target.value)} required />
        </label>
        <label>
          E-mail
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Senha
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className="btn primary" type="submit" disabled={loading}>Entrar</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="help">Use um usuário existente (admin/test) e o mesmo tenant do backend.</p>
    </main>
  )

  return isLogged ? dashboard : loginForm
}

export default App
