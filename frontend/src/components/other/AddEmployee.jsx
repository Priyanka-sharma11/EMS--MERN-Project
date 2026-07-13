import React, { useState } from 'react'
import api from '../../utils/api'

const AddEmployee = ({ onEmployeeAdded }) => {

    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setMessage('')
        setSubmitting(true)

        try {
            await api.post('/employees', { firstName, email, password })
            setMessage(`${firstName} was added successfully!`)
            setFirstName('')
            setEmail('')
            setPassword('')
            onEmployeeAdded()
        } catch (err) {
            setMessage(err.response?.data?.message || 'Could not add employee')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            <h2 className='text-lg font-semibold mb-3'>Add Employee</h2>
            <form onSubmit={submitHandler} className='flex flex-wrap gap-3 items-end'>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Name</h3>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="text" placeholder='Employee name' />
                </div>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Email</h3>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="email" placeholder='employee@example.com' />
                </div>
                <div>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Password</h3>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='text-sm py-1 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400'
                        type="password" placeholder='Set a password' />
                </div>
                <button
                    disabled={submitting}
                    className='bg-emerald-500 py-2 hover:bg-emerald-600 px-5 rounded text-sm disabled:opacity-60'>
                    {submitting ? 'Adding...' : 'Add Employee'}
                </button>
            </form>
            {message && <p className='text-sm mt-3 text-emerald-400'>{message}</p>}
        </div>
    )
}

export default AddEmployee
