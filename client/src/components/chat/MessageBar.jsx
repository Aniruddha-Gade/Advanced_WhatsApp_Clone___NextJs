import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import EmojiPicker from 'emoji-picker-react';

import { useStateProvider } from '@/context/stateContext'
import { ADD_IMAGE_MESSAGE_ROUTE, ADD_MESSAGE_ROUTE } from './../../utils/apiRoutes';
import { reducerCases } from '@/context/constants';
import PhotoPicker from '../common/PhotoPicker';

// icons
import { BsEmojiSmile } from 'react-icons/bs'
import { ImAttachment } from 'react-icons/im'
import { MdSend } from 'react-icons/md'
import { FaMicrophone } from 'react-icons/fa'


const MessageBar = () => {

  const [{ userInfo, currentChatUser, socket }, dispatch] = useStateProvider()
  const [message, setMessage] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const emojiPickerRef = useRef(null)
  const [grabPhoto, setGrabPhoto] = useState(false)


  // send message
  const sendMessage = async () => {
    // console.log("{ userInfo, currentChatUser } ", { userInfo, currentChatUser })
    try {
      if (!message) return;

      // store msg to database
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        message,
        from: userInfo.id,
        to: currentChatUser.id
      })

      // 
      socket.current.emit("send-msg", {
        message: data.newMessage,
        from: userInfo.id,
        to: currentChatUser.id
      })

      // save current sent mesg to context
      dispatch({
        type: reducerCases.ADD_MESSAGE,
        newMessage: { ...data.newMessage },
        fromSelf: true
      })


      console.log("Message stored response => ", data)
      setMessage("")
    } catch (error) {
      console.log("Error while storing message => ", error)
    }

  }

  // handle Emoji Click - save emoji to 'message' variable
  const handleEmojiClick = (emoji) => {
    setMessage((prevMsg) => prevMsg += emoji.emoji)
  }

  // close emoji picker , if outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id !== 'emoji-open') {
        if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
          setShowEmojiPicker(false)
        }
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [])


  // upload image message to database and sned via socket
  const photoPickerChange = async (e) => {
    try {
      const file = e.target.files[0]
      console.log("image file => ", file)

      // save to database
      const formData = new FormData()
      formData.append('image', file)
      const response = await axios.post(ADD_IMAGE_MESSAGE_ROUTE, formData, {
        headers: {
          'content-Type': 'multipart/form-data'
        },
        params: {
          from: userInfo.id,
          to: currentChatUser.id
        }
      })

      console.log("ADD_IMAGE_MESSAGE_ROUTE RESPONSE ===> ", response)

      // send image message via socket
      if (response.status === 201) {
        socket.current.emit("send-msg", {
          message: response.data.newMessage,
          from: userInfo.id,
          to: currentChatUser.id
        })

        // save current sent img mesg to context
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: { ...response.data.newMessage },
          fromSelf: true
        })
      }
    } catch (error) {
      console.log("Error while saving image message to database")
    }
    setGrabPhoto(false);
  }


  // to close file select modal
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById('photo-picker')
      data.click()
      document.body.focus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false)
        }, 1000)
      }
    }
  }, [grabPhoto])

  console.log('grabPhoto = ', grabPhoto)


  return (
    <div className='h-20 flex items-center gap-6 relative bg-panel-header-background px-4 '>
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            id='emoji-open'
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Emoji'
          />
          {/* show emoji picker */}
          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              className='absolute bottom-24 left-16 z-40'
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} theme='dark' />
            </div>)
          }

          <ImAttachment
            onClick={() => setGrabPhoto(true)}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Attach File'
          />
        </div>

        <div className='h-10 w-full rounded-lg flex items-center'>
          <input
            type='text'
            placeholder='Type a message'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='bg-input-background h-10 text-white focus:outline-none px-5 py-4 w-full'
          />
        </div>

        <div className='flex-center w-10 '>
          <MdSend
            onClick={sendMessage}
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Send Message'
          />
          {/* <FaMicrophone
            className='text-panel-header-icon text-xl cursor-pointer hover:text-panel-header-icon-hover active:scale-90'
            title='Record'
          /> */}
        </div>
      </>

      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </div>
  )
}

export default MessageBar