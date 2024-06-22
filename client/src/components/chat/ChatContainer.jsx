import { useStateProvider } from '@/context/stateContext'
import { calculateTime } from '@/utils/calculateTime'
import React from 'react'
import MessageStatus from '../common/MessageStatus'

const ChatContainer = () => {

  const [{ messages, userInfo, currentChatUser },] = useStateProvider()
  console.log("messages from chat container = ", messages)




  return (
    <div className='h-[80vh] w-full relative overflow-auto flex-grow custom-scrollbar '>
      {/* background image */}
      <div className="bg-chat-background bg-fixed w-full h-full fixed opacity-15 left-0 top-0 z-0">
      </div>


      <div className='mx-10 my-6 left-0 bottom-0 relative z-40 '>
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId == currentChatUser.id ? 'justify-start' : 'justify-end'}`}
                >
                  {/* {
                    message.type === 'text' && (
                      <div className={`text-white px-5 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]
                            ${message.senderId === currentChatUser.id ? 'bg-incoming-background' : 'bg-outgoing-background'}`}
                      >
                        <span className=''>{message.message}</span>
                      </div>
                    )
                  } */}

                  <div className={`text-white px-3 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]
                            ${message.senderId === currentChatUser.id ? 'bg-incoming-background' : 'bg-outgoing-background'}`}
                  >
                    <span className='break-all'>{message.message}</span>
                    <div className='flex gap-1 items-end'>
                      <span className='text-bubble-meta text-[11px] pt-1 min-w-fit '>
                        {calculateTime(message.createdAt)}
                      </span>
                      <span>
                        {
                          message.senderId === userInfo.id
                          && <MessageStatus messageStatus={message.messageStatus} />
                        }
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatContainer