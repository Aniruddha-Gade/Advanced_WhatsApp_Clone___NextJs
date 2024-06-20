import React from 'react'
import Avatar from '../common/Avatar'

// icons
import { MdCall } from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'

const ChatHeader = () => {
  return (
    <div className='bg-panel-header-background h-16 px-4 py-3 z-10 flex justify-between items-center'>
      <div className="flex-center gap-6">
        {/* user profile image */}
        <Avatar
          type='sm'
          image={'/profile'}
        />
        {/* user name and online/offline status */}
        <div className="flex flex-col">
          <span className="text-primary-strong">Demo username</span>
          <span className="text-secondary text-sm">
            online
          </span>
        </div>
      </div>

      {/* icons */}
      <div className='flex gap-6'>
        <MdCall className='text-panel-header-icon cursor-pointer text-xl' />
        <IoVideocam className='text-panel-header-icon cursor-pointer text-xl' />
        <BiSearchAlt2 className='text-panel-header-icon cursor-pointer text-xl' />
        <BsThreeDotsVertical className='text-panel-header-icon cursor-pointer text-xl' />
      </div>

    </div>
  )
}

export default ChatHeader