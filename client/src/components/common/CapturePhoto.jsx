import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useRef } from 'react'

const CapturePhoto = ({ setImage, hide }) => {

    const videoRef = useRef(null)

    // take photo
    const handleCapturePhoto = () => {
        const canvas = document.createElement('canvas')
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, 300, 150)
        setImage(canvas.toDataURL('image/jpeg'))
        hide(false)
    }

    useEffect(() => {
        let stream

        const startCamera = async () => {
            stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            videoRef.current.srcObject = stream
        }

        startCamera()
        return () => {
            stream?.getTracks().forEach((track) => track.stop())
        }
    }, [])

    return (
        <div className='absolute h-4/6 w-2/6 top-1/4 left-1/3 bg-gray-900 rounded-lg pt-2 flex-center  '>
            <div className="flex-center flex-col gap-4 w-full">
                {/* close button */}
                <div className='pt-2 pr-2 flex items-end justify-end cursor-pointer ' onClick={() => hide(false)}>
                    <IoClose className='w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full p-1 duration-200' />
                </div>

                <div className="flex justify-center">
                    <video id='video' width='400' autoPlay ref={videoRef}></video>
                </div>

                {/* capture photo button */}
                <button
                    onClick={handleCapturePhoto}
                    className='h-16 w-16 bg-white rounded-full border-8 cursor-pointer border-teal-light'
                >
                </button>

            </div>
        </div>
    )
}

export default CapturePhoto