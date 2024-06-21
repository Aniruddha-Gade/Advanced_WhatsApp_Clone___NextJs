import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { reducerCases } from '@/context/constants'
import { useStateProvider } from '@/context/stateContext'
import { GET_ALL_CONTACTS } from '@/utils/apiRoutes'

import { BiArrowBack } from 'react-icons/bi'

const ContactsList = () => {

  const [allContacts, setAllContacts] = useState([])
  const [{ contactsPage }, dispatch] = useStateProvider()
  console.log("contactsPage = ", contactsPage)

  useEffect(() => {
    const getAllContacts = async () => {
      try {
        const { data: { users } } = await axios.get(GET_ALL_CONTACTS)
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
      <div className='flex items-end h-24 px-3 py-4 '>
        <div className='flex items-center gap-12 text-white '>
          <BiArrowBack
            onClick={() => dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Back'
          />
        </div>

      </div>
    </div>
  )
}

export default ContactsList
