import React from 'react'
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'


const PhotoLibrary = ({ setImage, hidePhotoLibrary }) => {

    const images = [
        '/avatars/1.png',
        '/avatars/2.png',
        '/avatars/3.png',
        '/avatars/4.png',
        '/avatars/5.png',
        '/avatars/6.png',
        '/avatars/7.png',
        '/avatars/8.png',
        '/avatars/9.png',
    ]

    return (
        <div className='fixed top-0 left-0 max-h-screen max-w-[100vw] h-full w-full flex-center   '>
            <div className="h-max w-max bg-gray-900 gap-6 rounded-lg p-4">
                {/* close button */}
                <div className='pt-2 pr-2 flex items-end justify-end cursor-pointer ' onClick={() => hidePhotoLibrary(false)}>
                    <IoClose className='w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full p-1 duration-200' />
                </div>

                <div className='grid grid-cols-3 place-content-center gap-16 p-20 w-full '>
                    {
                        images.map((image) => (
                            <div
                                onClick={() => {
                                    setImage(image)
                                    hidePhotoLibrary(false)
                                }}
                                className=''
                            >
                                <div className='w-24 h-24 cursor-pointer relative'>
                                    <Image src={image} alt='Avatar' fill className='hover:scale-125 duration-300' />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default PhotoLibrary