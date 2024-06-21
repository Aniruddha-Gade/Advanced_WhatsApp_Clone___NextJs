import React, { useState, useEffect } from 'react'
import ChatListHeader from './ChatListHeader'
import SearchBar from './SearchBar'
import List from './List'
import { useStateProvider } from '@/context/stateContext'
import ContactsList from './ContactsList'

const ChatList = () => {

    const [{ contactsPage }] = useStateProvider()
    const [pageType, setPageType] = useState('default')

    useEffect(() => {
        if (contactsPage) {
            setPageType('all-contacts')
        }
        else setPageType('default')
    }, [contactsPage])

    return (
        <div className='bg-panel-header-background flex flex-col max-h-screen z-20 '>

            {/* default */}
            {
                pageType === 'default' && (
                    <>
                        <ChatListHeader />
                        <SearchBar />
                        <List />
                    </>)
            }

            {/* show All contacts list */}
            {pageType === 'all-contacts' &&
                <ContactsList />
            }

        </div>
    )
}

export default ChatList