import React from 'react'
import Avatar from '@/components/common/Avatar'
import { useStateProvider } from '@/context/stateContext'
import { reducerCases } from '@/context/constants';

const ChatListItem = ({ data, isContactPage = false }) => {

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  function handleContactClick() {
    dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: data })
    // dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
  }

  console.log("current chat user is = ", currentChatUser)

  return (
    <div
      onClick={handleContactClick}
      className={`flex items-center cursor-pointer hover:bg-background-default-hover`}
    >
      <div className='min-w-fit px-5 pt-3 pb-1'>
        <Avatar type='sm' image={data?.profileImage} />
      </div>

      <div className='min-h-full flex flex-col justify-center mt-3 pr-2 w-full'>
        <div className='flex justify-between'>
          <div>
            <span className='text-white'>{data?.name}</span>
          </div>
        </div>

        <div className='border-b border-conversation-border pb-2 pt-1 '>
          <div className='flex justify-between w-full'>
            <span className='text-secondary line-clamp-1 text-sm'>{data?.about || '\u00A0'}</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ChatListItem