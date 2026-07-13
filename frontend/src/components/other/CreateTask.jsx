import React, { useState } from 'react'
import api from '../../utils/api'

const CreateTask = ({ employees, onTaskCreated }) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskDate, setTaskDate] = useState('')
    const [assignedTo, setAssignedTo] = useState('')
    const [category, setCategory] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setMessage('')

        if (!assignedTo) {
            setMessage('Please choose an employee to assign this task to.')
            return
        }

        setSubmitting(true)

        try {
            await api.post('/tasks', {
                taskTitle,
                taskDescription,
                taskDate,
                category,
                assignedTo
            })

            setMessage('Task created successfully!')
            setTaskTitle('')
            setCategory('')
            setAssignedTo('')
            setTaskDate('')
            setTaskDescription('')
            onTaskCreated()
        } catch (err) {
            setMessage(err.response?.data?.message || 'Could not create task')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <h2 className='text-lg font-semibold mb-3'>Create Task</h2>
            <form onSubmit={submitHandler}
                className='flex flex-wrap w-full items-start justify-between'
            >
                <div className='w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            required
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='Make a UI design'
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="date" />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                        <select
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            required
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-[#1c1c1c] border-[1px] border-gray-400 mb-4'>
                            <option value="">Select an employee</option>
                            {employees.map((emp) => (
                                <option key={emp.id} value={emp.id}>{emp.firstName}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4' type="text" placeholder='design, dev, etc' />
                    </div>
                </div>

                <div className='w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400'></textarea>
                    <button
                        disabled={submitting}
                        className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full disabled:opacity-60'>
                        {submitting ? 'Creating...' : 'Create Task'}
                    </button>
                    {message && <p className='text-sm mt-2 text-emerald-400'>{message}</p>}
                </div>

            </form>
        </div>
    )
}

export default CreateTask
