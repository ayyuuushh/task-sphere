import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('https://team-task-manager-production-926d.up.railway.app/api/auth/login',{
        email, password
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))

      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">TaskSphere</h1>
        <p className="auth-subtitle">Smart Team Manager</p>

        <h2>Welcome Back 👋</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="your password"
              required
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="auth-link">
          New here? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login