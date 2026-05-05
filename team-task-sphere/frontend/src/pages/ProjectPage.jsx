import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const BASE_URL = "https://task-sphere-production.up.railway.app"

function ProjectPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    status: 'todo',
    dueDate: ''
  })
  const [selectedUser, setSelectedUser] = useState('')
  const [error, setError] = useState('')
  const [taskError, setTaskError] = useState('')

  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const token = localStorage.getItem('token')
  const authHeader = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    fetchProjectData()
  }, [id])

  const fetchProjectData = async () => {
    try {
      const [projectRes, tasksRes, usersRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/projects/${id}`, authHeader),
        axios.get(`${BASE_URL}/api/tasks/project/${id}`, authHeader),
        axios.get(`${BASE_URL}/api/auth/users`, authHeader)
      ])
      setProject(projectRes.data)
      setTasks(tasksRes.data)
      setUsers(usersRes.data)
    } catch (err) {
      console.log(err)
      if (err.response?.status === 403) {
        navigate('/dashboard')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (e) => {
    e.preventDefault()
    setTaskError('')
    try {
      await axios.post(`${BASE_URL}/api/tasks`, {
        ...newTask,
        projectId: id,
        assignedTo: newTask.assignedTo || null,
        dueDate: newTask.dueDate || null
      }, authHeader)
      setNewTask({ title: '', description: '', assignedTo: '', status: 'todo', dueDate: '' })
      setShowTaskForm(false)
      fetchProjectData()
    } catch (err) {
      setTaskError(err.response?.data?.message || 'Failed to create task')
    }
  }

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.put(`${BASE_URL}/api/tasks/${taskId}`, { status: newStatus }, authHeader)
      fetchProjectData()
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  const handleAddMember = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await axios.post(`${BASE_URL}/api/projects/${id}/members`, { userId: selectedUser }, authHeader)
      setSelectedUser('')
      setShowAddMember(false)
      fetchProjectData()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member')
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${taskId}`, authHeader)
      fetchProjectData()
    } catch (err) {
      alert('Failed to delete task')
    }
  }

  if (loading) return <div className="loading">Loading project...</div>
  if (!project) return <div className="loading">Project not found</div>

  const nonMembers = users.filter(u =>
    !project.members.some(m => m._id === u._id)
  )

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h2>{project.name}</h2>
          <p className="project-desc">{project.description || 'No description'}</p>
          <p className="created-by">Created by {project.createdBy?.name}</p>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Tasks ({tasks.length})</h3>
        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          tasks.map(task => (
            <div key={task._id}>
              <strong>{task.title}</strong>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ProjectPage