import React from 'react'
import Avatar from './../common/Avatar';
import { useStateProvider } from '@/context/stateContext';
import { BsFillChatLeftTextFill, BsThreeDotsVertical, } from 'react-icons/bs'
import { reducerCases } from '@/context/constants';

const ChatListHeader = () => {

  const [{ userInfo }, dispatch] = useStateProvider()
  console.log("userInfo = ", userInfo)

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
  }

  return (
    <div className='flex-between h-16 px-4 py-3 '>
      <div className='cursor-pointer'>
        <Avatar type='sm' image={userInfo?.profileImage} />
      </div>

      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          onClick={handleAllContactsPage}
          className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='New Chat'
        />

        <BsThreeDotsVertical
          className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='Menu'
        />
      </div>
    </div>
  )
}

export default ChatListHeader