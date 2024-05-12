import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import ContextMenu from './ContextMenu'
import PhotoPicker from './PhotoPicker'
import PhotoLibrary from './PhotoLibrary'



const Avatar = ({ type, image, setImage }) => {

    const [hover, setHover] = useState(false)
    const [isContextMenuVisible, setIsContextMenuVisible] = useState(false)
    const [contextMenuCordinates, setContextMenuCordinates] = useState({ x: 0, y: 0 })
    const [grabPhoto, setGrabPhoto] = useState(false)
    const [showPhotoLibrary, setShowPhotoLibrary] = useState(false)

    const showContextMenu = (e) => {
        e.preventDefault()
        setIsContextMenuVisible(true)
        setContextMenuCordinates({ x: e.pageX, y: e.pageY })
    }

    const contextMenuOptions = [
        { name: 'Take Photo', callback: () => { } },
        { name: 'Choose From Library', callback: () => { setShowPhotoLibrary(true)} },
        {
            name: 'Upload Photo', callback: () => {
                setGrabPhoto(true)
            }
        },
        { name: 'Remove Photo', callback: () => { setImage('/default_avatar.png') } },
    ]

    const photoPickerChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        const data = document.createElement('img')
        reader.onload = function (event) {
            data.src = event.target.result
            data.setAttribute('data-src', event.target.result)
        }
        reader.readAsDataURL(file)
        setTimeout(() => {
            setImage(data.src)
        }, 100)
        console.log('data.src = ', data.src)
    }
    // console.log('image = ', image)


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

    return (
        <>
            <div className="flex-center">
                {type === 'sm' &&
                    <div className='relative h-10 w-10'>
                        <Image src={image} alt='Avatar' fill className='rounded-full' />
                    </div>
                }
                {type === 'lg' &&
                    <div className='relative h-14 w-14'>
                        <Image src={image} alt='Avatar' fill className='rounded-full' />
                    </div>
                }
                {type === 'xl' &&
                    <div
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        className='relative z-0 cursor-pointer'
                    >
                        <div
                            id='context-opener'
                            onClick={(e) => showContextMenu(e)}
                            className={`z-10 hidden bg-photopicker-overlay-background absolute left-0 top-0 h-60 w-60 flex-col gap-2 duration-300 
                                      ${hover && "flex-center"} `}

                        >
                            <FaCamera
                                id='context-opener'
                                className='text-2xl'
                                onClick={(e) => showContextMenu(e)}
                            />
                            <span
                                id='context-opener'
                                onClick={(e) => showContextMenu(e)}
                                className='text-center'
                            >
                                Change<br />Profile<br />Image
                            </span>
                        </div>
                        <div className='h-60 w-60 flex-center'>
                            <Image src={image} alt='Avatar' fill className='rounded-full' />
                        </div>
                    </div>
                }
            </div>

            {/* menu  */}
            {isContextMenuVisible &&
                <ContextMenu
                    options={contextMenuOptions}
                    cordinates={contextMenuCordinates}
                    contextMenu={isContextMenuVisible}
                    setContextMenu={setIsContextMenuVisible}
                />}

            {showPhotoLibrary &&
                <PhotoLibrary
                    setImage={setImage}
                    hidePhotoLibrary={setShowPhotoLibrary}
                />}
            {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
        </>
    )
}

export default Avatar