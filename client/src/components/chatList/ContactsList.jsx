import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { reducerCases } from '@/context/constants'
import { useStateProvider } from '@/context/stateContext'
import { GET_ALL_CONTACTS_ROUTE } from '@/utils/apiRoutes'

import { BiArrowBack, BiSearchAlt2 } from 'react-icons/bi'
import ChatListItem from './ChatListItem'

const ContactsList = () => {

  const [allContacts, setAllContacts] = useState([])
  const [{ contactsPage }, dispatch] = useStateProvider()
  console.log("contactsPage = ", contactsPage)

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS_ROUTE)
        setAllContacts(users)
        console.log("GET_ALL_CONTACTS API RESPONSE... ", users)
      } catch (error) {
        console.log("Error while getting all contacts => ", error)
      }
    }
    getAllContacts()
  }, [])

  return (
    <div className='h-full flex flex-col'>
      <div className='flex items-center h-16 px-4 py-6'>
        <div className='flex items-center gap-12 text-white'>
          <BiArrowBack
            onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Back'
          />
          <span>
            New Chat
          </span>
        </div>
      </div>

      {/* search  */}
      <div className='bg-search-input-container-background flex-auto overflow-auto custom-scrollbar '>
        <div className='flex h-14 py-3 px-5 gap-3 items-center '>
          <div className='bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow '>
            {/* search icon */}
            <div>
              <BiSearchAlt2 className='text-panel-header-icon text-lg' />
            </div>

            {/* search input */}
            <div className='w-full'>
              <input
                type='text'
                placeholder='Search contacts'
                className='bg-transparent flex text-sm focus:outline-none text-white w-full'
              />
            </div>
          </div>
        </div>

        {/* show all contacts */}
        {
          Object.entries(allContacts).map(([initialLetter, userList]) =>
          (<div key={Date.now() + initialLetter}>
            <div className='text-teal-light pl-7 py-5'>
              {initialLetter}
            </div>
            {userList.map(contact => (
              <ChatListItem
                data={contact}
                isContactPage={true}
                key={contact.id}
              />
            ))}
          </div>
          ))}
      </div>

    </div>
  )
}

export default ContactsList
