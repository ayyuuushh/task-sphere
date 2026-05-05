import { useEffect, useState } from 'react'
import axios from 'axios'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [search, setSearch] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          'https://team-task-manager-production-926d.up.railway.app/api/tasks',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )
        setTasks(res.data)
      } catch (err) {
        console.log(err)
      }
    }

    fetchTasks()
  }, [])

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="dashboard">
      <h1>Good to see you, {user?.name}! 👋</h1>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="search-box"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* STATS */}
      <div className="stats">
        <div className="card">Pending: {tasks.filter(t => t.status === 'todo').length}</div>
        <div className="card">Ongoing: {tasks.filter(t => t.status === 'inprogress').length}</div>
        <div className="card">Completed: {tasks.filter(t => t.status === 'done').length}</div>
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

              {/* Priority badge */}
              <span className="priority medium">Medium</span>
            </div>
          ))
        )}
      </div>

      {/* EXTRA SECTION */}
      <div className="activity-box">
        <h3>Recent Activity</h3>
        <p>No recent updates</p>
      </div>
    </div>
  )
}

export default Dashboard