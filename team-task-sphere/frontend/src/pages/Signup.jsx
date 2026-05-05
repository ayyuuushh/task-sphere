import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await axios.post('/api/auth/signup', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-orb auth-orb-1"></div>
      <div className="auth-orb auth-orb-2"></div>

      <div className="auth-box">
        <div className="auth-brand">
          <span className="auth-logo">⬡</span>
          <h1 className="auth-title">TaskSphere</h1>
        </div>

        <p className="auth-subtitle">Smart Team Collaboration</p>

        <h2 className="auth-heading">Create your account 🚀</h2>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Alex Carter"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="alex@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="choose a password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Get Started'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup