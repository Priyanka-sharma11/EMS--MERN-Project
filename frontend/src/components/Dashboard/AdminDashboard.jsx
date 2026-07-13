import React, { useCallback, useEffect, useState } from 'react'
import Header from '../other/Header'
import CreateTask from '../other/CreateTask'
import AllTask from '../other/AllTask'
import AddEmployee from '../other/AddEmployee'
import api from '../../utils/api'

const AdminDashboard = () => {

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    // Shared by AddEmployee (after creating one) and CreateTask (needs the
    // list to populate its "assign to" dropdown) - so it lives up here.
    const loadEmployees = useCallback(async () => {
        try {
            const res = await api.get('/employees')
            setEmployees(res.data.employees)
        } catch (err) {
            console.log('Failed to load employees', err)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadEmployees()
    }, [loadEmployees])

    return (
        <div className='h-screen w-full p-7 overflow-y-auto'>
            <Header />
            <AddEmployee onEmployeeAdded={loadEmployees} />
            <CreateTask employees={employees} onTaskCreated={loadEmployees} />
            {loading ? (
                <p className='mt-5 text-gray-400'>Loading employees...</p>
            ) : (
                <AllTask employees={employees} />
            )}
        </div>
    )
}

export default AdminDashboard
