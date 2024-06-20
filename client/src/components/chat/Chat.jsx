import React from 'react'
import ChatContainer from './ChatContainer';
import ChatHeader from './ChatHeader';
import MessageBar from './MessageBar';

const Chat = () => {
    return (
        <div className='border-conversation-border border-l w-full h-screen z-10 flex flex-col bg-conversation-panel-background '>

            <ChatHeader />
            <ChatContainer />
            <MessageBar />

        </div>
    )
}

export default Chat