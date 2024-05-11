import React from 'react'

const Input = ({ name, state, setState, label = false }) => {
  return (
    <div className='flex flex-col gap-1'>
      {
        label &&
        <label htmlFor={name} className='text-teal-light px-1 text-lg '>
          {name}
        </label>
      }

      <div>
        <input
          type='text'
          name={name}
          value={state}
          onChange={(e) => setState(e.target.value)}
          className='w-full bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg py-4 px-5'
        />
      </div>
    </div>
  )
}

export default Input