import React from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'

const MessageBar = () => {
  return (
    <div className='h-20 flex items-center gap-6 relative bg-panel-header-background px-4 '>
      <>
        <div className="flex gap-6">
          <BsEmojiSmile className='text-panel-header-icon cursor-pointer text-xl ' title='Emoji' />
          <ImAttachment
            className='text-panel-header-icon cursor-pointer text-xl '
            title='Attach File'
          />
        </div>

        <div className='h-10 w-full rounded-lg flex items-center'>
          <input type='text' placeholder='Type a message' className='bg-input-background h-10 text-white focus:outline-none px-5 py-4 w-full' />
        </div>

        <div className='flex-center w-10 '>
          <MdSend
            className='text-panel-header-icon cursor-pointer text-xl '
            title='Send Message'
          />
          {/* <FaMicrophone
            className='text-panel-header-icon cursor-pointer text-xl '
            title='Record'
          /> */}
        </div>
      </>
    </div>
  )
}

export default MessageBar