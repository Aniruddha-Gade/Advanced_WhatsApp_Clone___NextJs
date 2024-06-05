import ChatList from '@/components/chatList/ChatList'
import Empty from '@/components/Empty'
import React from 'react'

const Main = () => {
    return (
        <>
            <div className='grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden '>
                <ChatList />
                <Empty />
            </div>
        </>
    )
}

export default Main