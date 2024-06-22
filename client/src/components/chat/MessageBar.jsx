import React, { useState } from 'react'
import axios from 'axios'
import { useStateProvider } from '@/context/stateContext'
import { ADD_MESSAGE_ROUTE } from './../../utils/apiRoutes';

// icons
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'

const MessageBar = () => {

  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    // console.log("{ userInfo, currentChatUser } ", { userInfo, currentChatUser })
    try {
      if (!message) return;

      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        from: userInfo.id,
        to: currentChatUser.id
      })
      console.log("Message stored response => ", data)
      setMessage("")
    } catch (error) {
      console.log("Error while storing message")
    }

  }

  return (
    <div className='h-20 flex items-center gap-6 relative bg-panel-header-background px-4 '>
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Emoji'
          />
          <ImAttachment
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Attach File'
          />
        </div>

        <div className='h-10 w-full rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='bg-input-background h-10 text-white focus:outline-none px-5 py-4 w-full'
          />
        </div>

        <div className='flex-center w-10 '>
          <MdSend
            onClick={sendMessage}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Send Message'
          />
          {/* <FaMicrophone
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Record'
          /> */}
        </div>
      </>
    </div>
  )
}

export default MessageBar