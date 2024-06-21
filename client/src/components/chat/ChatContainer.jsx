import React from 'react'

const ChatContainer = () => {
  return (
    <div className='h-[80vh] w-full relative overflow-auto flex-grow custom-scrollbar '>
      <div className="bg-chat-background w-full h-full fixed opacity-20 left-0 top-0 z-0">
        <div className="flex-w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">

          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer