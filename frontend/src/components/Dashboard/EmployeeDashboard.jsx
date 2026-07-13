import React, { useCallback, useEffect, useState } from 'react'
import Header from '../other/Header'
import TaskListNumbers from '../other/TaskListNumbers'
import TaskList from '../TaskList/TaskList'
import api from '../../utils/api'

const EmployeeDashboard = () => {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const loadMyTasks = useCallback(async () => {
    try {
      const res = await api.get('/tasks/mine')
      setTasks(res.data.tasks)
    } catch (err) {
      console.log('Failed to load tasks', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMyTasks()
  }, [loadMyTasks])

  // Passed down to every task card's button (Accept / Complete / Fail).
  // After the backend confirms the change, we just re-fetch so every
  // count and card on screen stays in sync.
  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, { status })
      loadMyTasks()
    } catch (err) {
      console.log('Failed to update task', err)
    }
  }

  const taskCounts = {
    newTask: tasks.filter((t) => t.status === 'new').length,
    active: tasks.filter((t) => t.status === 'active').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    failed: tasks.filter((t) => t.status === 'failed').length
  }

  return (
    <div className='p-10 bg-[#1C1C1C] h-screen overflow-y-auto'>

      <Header />
      <TaskListNumbers taskCounts={taskCounts} />
      {loading ? (
        <p className='mt-10 text-gray-400'>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks} onUpdateStatus={updateTaskStatus} />
      )}
    </div>
  )
}

export default EmployeeDashboard
