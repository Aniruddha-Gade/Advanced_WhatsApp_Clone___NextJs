import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { firebaseAuth } from '@/utils/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { io } from 'socket.io-client'

import { useStateProvider } from '@/context/stateContext'
import { reducerCases } from '@/context/constants'
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE, HOST } from '@/utils/apiRoutes'

import ChatList from '@/components/chatList/ChatList'
import Empty from '@/components/Empty'
import Chat from '@/components/chat/Chat'


const Main = () => {

    const router = useRouter()
    const [{ userInfo, currentChatUser }, dispatch] = useStateProvider()
    const [redirectLogin, setRedirectLogin] = useState(false)
    const socket = useRef()
    const [socketEvent, setSocketEvent] = useState(false)

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


    // get messages as soons as there is a new current-chat-user
    useEffect(() => {
        const getMessages = async () => {
            try {
                const { data: { messages } } = await axios.get(`${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`)
                console.log("GET MESSAGE RESPONSE => ", messages)

                // set message to context
                dispatch({ type: reducerCases.SET_MESSAGES, messages })
            } catch (error) {
                console.log("GET MESSAGE RESPONSE ERROR => ", error)
            }
        }
        if (currentChatUser?.id) {
            getMessages()
        }
    }, [currentChatUser])


    // store socket to context
    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST)
            socket.current.emit("add-user", userInfo.id)
            dispatch({ type: reducerCases.SET_SOCKET, socket })
        }
    }, [userInfo])


    // sets up a one-time event listener for incoming messages via socket,
    // dispatching each new received message to the state.
    useEffect(() => {
        if (socket.current && !socketEvent) {
            socket.current.on("msg-receive", (data) => {
                dispatch({
                    type: reducerCases.ADD_MESSAGE,
                    newMessage: { ...data.message }
                })
            })
            setSocketEvent(true)
        }
    }, [socket.current])

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