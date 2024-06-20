import React from 'react'
import Avatar from './../common/Avatar';
import { useStateProvider } from '@/context/stateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical, } from 'react-icons/bs'

const ChatListHeader = () => {

  const [{ userInfo }, dispatch] = useStateProvider()
  console.log("userInfo = ", userInfo)


  return (
    <div className='flex-between h-16 px-4 py-3 '>
      <div className='cursor-pointer'>
        <Avatar type='sm' image={userInfo?.profileImage} />
      </div>

      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className='text-panel-header-icon text-xl'
          title='New Chat'
        />
        <>
          <BsThreeDotsVertical
            className='text-panel-header-icon text-xl'
            title='Menu'
          />
        </>
      </div>

    </div>
  )
}

export default ChatListHeader