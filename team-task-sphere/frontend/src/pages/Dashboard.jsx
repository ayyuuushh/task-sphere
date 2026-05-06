import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = "https://task-sphere-production.up.railway.app"

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState('')

  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksRes, projectsRes] = await Promise.all([
          axios.get(`${BASE_URL}/api/tasks`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }),
          axios.get(`${BASE_URL}/api/projects`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        ])

        setTasks(tasksRes.data)
        setProjects(projectsRes.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchData()
  }, [])

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard">

      <h1>Good to see you, {user?.name}! 👋</h1>

      <input
        type="text"
        placeholder="Search tasks..."
        className="search-box"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* STATS */}
      <div className="stats">
        <div className="card">
          Pending: {tasks.filter(t => t.status === 'todo').length}
        </div>

        <div className="card">
          Ongoing: {tasks.filter(t => t.status === 'in-progress').length}
        </div>

        <div className="card">
          Completed: {tasks.filter(t => t.status === 'done').length}
        </div>
      </div>

      {/* PROJECTS */}
      <div className="card" style={{ marginTop: '20px' }}>
        <h2>Your Projects</h2>

        {projects.length === 0 ? (
          <p>No projects yet</p>
        ) : (
          projects.map(project => (
            <Link
              key={project._id}
              to={`/project/${project._id}`}
              style={{
                display: 'block',
                padding: '15px',
                marginBottom: '10px',
                background: '#1e293b',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'white'
              }}
            >
              <h3>{project.name}</h3>
              <p>{project.description}</p>
            </Link>
          ))
        )}
      </div>

      {/* TASK LIST */}
      <div className="tasks">
        {filteredTasks.length === 0 ? (
          <p>No tasks yet 🚀</p>
        ) : (
          filteredTasks.map(task => (
            <div key={task._id} className="task-card">
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <span className="priority medium">
                Medium
              </span>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default Dashboard