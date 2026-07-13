import React from 'react'

const AllTask = ({ employees }) => {

  if (employees.length === 0) {
    return (
      <div className='bg-[#1c1c1c] p-5 rounded mt-5 text-gray-400 text-sm'>
        No employees yet. Add one above to get started.
      </div>
    )
  }

  return (
    <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
      <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
        <h3 className='text-lg font-medium w-1/5'>New Task</h3>
        <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5'>Completed</h5>
        <h5 className='text-lg font-medium w-1/5'>Failed</h5>
      </div>
      <div>
        {employees.map((emp) => (
          <div key={emp.id} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
            <h2 className='text-lg font-medium w-1/5'>{emp.firstName}</h2>
            <h3 className='text-lg font-medium w-1/5 text-blue-400'>{emp.taskCounts.newTask}</h3>
            <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{emp.taskCounts.active}</h5>
            <h5 className='text-lg font-medium w-1/5 text-white'>{emp.taskCounts.completed}</h5>
            <h5 className='text-lg font-medium w-1/5 text-red-600'>{emp.taskCounts.failed}</h5>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllTask
