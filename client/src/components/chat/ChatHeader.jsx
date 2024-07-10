import React from 'react'
import Avatar from '../common/Avatar'
import { useStateProvider } from '@/context/stateContext'

// icons
import { MdCall } from 'react-icons/md'
import { IoVideocam } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { reducerCases } from '@/context/constants'

const ChatHeader = () => {

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  console.log("current Chat User from MAIN CHAT ", currentChatUser)

  return (
    <div className='bg-panel-header-background h-16 px-4 py-3 z-10 flex justify-between items-center'>
      <div className="flex-center gap-6">
        {/* user profile image */}
        <Avatar
          type='sm'
          image={currentChatUser?.profileImage}
        />
        {/* user name and online/offline status */}
        <div className="flex flex-col">
          <span className="text-primary-strong">{currentChatUser?.name}</span>
          <span className="text-secondary text-sm">
            online
          </span>
        </div>
      </div>

      {/* icons */}
      <div className='flex gap-6'>
        <MdCall
          className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
         title='Call'
        />
        <IoVideocam
         className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='Video Call'
        />
        <BiSearchAlt2
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
          className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='search message'
        />
        <BsThreeDotsVertical
          className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='search message'
        />
      </div>

    </div>
  )
}

export default ChatHeader