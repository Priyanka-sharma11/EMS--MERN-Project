import React from 'react'

const CompleteTask = ({ task }) => {
  return (
    <div className='flex-shrink-0 h-full w-[300px] p-5 bg-blue-400 rounded-xl'>
      <div className='flex justify-between items-center'>
        <h3 className='bg-red-600 text-sm px-3 py-1 rounded'>{task.category}</h3>
        <h4 className='text-sm'>{task.taskDate}</h4>
      </div>
      <h2 className='mt-5 text-2xl font-semibold'>{task.taskTitle}</h2>
      <p className='text-sm mt-2'>
        {task.taskDescription}
      </p>
      <div className='mt-6'>
        <button disabled className='w-full bg-green-600 rounded font-medium py-1 px-2 text-xs opacity-80 cursor-default'>
          Completed
        </button>
      </div>
    </div>
  )
}

export default CompleteTask
