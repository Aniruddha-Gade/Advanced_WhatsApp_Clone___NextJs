import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import ChatList from '@/components/chatList/ChatList'
import Empty from '@/components/Empty'
import { reducerCases } from '@/context/constants'
import { useStateProvider } from '@/context/stateContext'

import { CHECK_USER_ROUTE } from '@/utils/apiRoutes'
import { firebaseAuth } from '@/utils/firebaseConfig'
import Chat from '@/components/chat/Chat'

const Main = () => {

    const router = useRouter()
    const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
    const [redirectLogin, setRedirectLogin] = useState(false)

    // firebase auth state change
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
        if (!currentUser) setRedirectLogin(true)
        if (!userInfo && currentUser?.email) {
            const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email })
            if (!data.status) {
                router.push('/login')
            }

            const { id, name, email, profileImage, about } = data.data
            dispatch({
                type: reducerCases.SET_USER_INFO,
                userInfo: { id, name, email, profileImage, about }
            })
        }
    })

    useEffect(() => {
        if (redirectLogin) router.push('/login')
    }, [redirectLogin])

    // console.log("from Main component = ", currentChatUser)

    return (
        <>
            <div className='grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden '>
                <ChatList />
                {currentChatUser ? <Chat /> : <Empty />}
            </div>
        </>
    )
}

export default Main