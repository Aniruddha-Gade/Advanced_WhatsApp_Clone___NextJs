import React, { useState, useEffect } from 'react'
import { useStateProvider } from '@/context/stateContext';

import { reducerCases } from './../../context/constants';
import { IoClose } from 'react-icons/io5'
import { BiSearchAlt2 } from 'react-icons/bi';
import { calculateTime } from '@/utils/calculateTime';

const SearchMessages = () => {

  const [{ currentChatUser, messages }, dispatch] = useStateProvider()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedMessages, setSearchedMessages] = useState([])


  useEffect(() => {
    if (searchTerm) {
      setSearchedMessages(messages.filter(message =>
        message.type === 'text' &&
        message.message.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }
    else {
      setSearchedMessages([])
    }
  }, [searchTerm])

  return (
    <div className='border-conversation-border border-l w-full bg-conversation-panel-background flex flex-col z-10 max-h-screen'>
      <div className='h-16 px-4 py-5 flex gap-10 items-center bg-panel-header-background text-primary-strong'>
        <IoClose
          onClick={() => dispatch({ type: reducerCases.SET_MESSAGE_SEARCH })}
          className='text-panel-header-icon text-2xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
          title='Close'
        />
        <span>Search Messages</span>
      </div>

      <div className='custom-scrollbar h-full overflow-auto'>
        <div className='flex flex-col items-center w-full'>
          <div className="flex px-5 items-center gap-3 h-14 w-full ">
            <div className='bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow'>
              {/* search icon */}
              <div>
                <BiSearchAlt2 className='text-panel-header-icon text-lg' />
              </div>

              {/* search input */}
              <div className='w-full'>
                <input
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  type='text'
                  placeholder='Search Messages'
                  className='bg-transparent flex text-sm focus:outline-none text-white w-full'
                />
              </div>
            </div>
          </div>

          {!searchTerm.length &&
            <p className='mt-10 text-secondary'>
              Search for messages with
              <span className='font-bold'> {currentChatUser.name}</span>
            </p>}
        </div>

        <div className='flex justify-center flex-col h-full'>
          {
            searchTerm.length > 0 && !searchedMessages.length
            && <span className='flex justify-center w-full text-secondary'>
              No messages found...!
            </span>
          }

          <div className='flex flex-col w-full h-full'>
            {
              searchedMessages.map((message) => (
                <div className='flex flex-col justify-center cursor-pointer hover:bg-background-default-hover 
                                 w-full p-5 border-b-[0.1px] border-secondary '
                >
                  <div className='text-sm text-secondary'>
                    {calculateTime(message.createdAt)}
                  </div>
                  <div className='text-icon-green'>{message.message}</div>
                </div>

              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchMessages