import { useEffect, useState } from 'react'
import { useStateProvider } from "@/context/stateContext"
import Image from "next/image"
import Input from "@/components/common/Input"
import Avatar from "@/components/common/Avatar"

// icons
import { IoCreateOutline } from "react-icons/io5";
import axios from 'axios'
import { ONBOARD_USER_ROUTE } from '@/utils/apiRoutes'
import { reducerCases } from '@/context/constants'
import { useRouter } from 'next/router'


const onboarding = () => {

    const [{ userInfo, newUser }, dispatch] = useStateProvider()
    const [name, setName] = useState(userInfo?.name || '')
    const [about, setAbout] = useState('')
    const [image, setImage] = useState(userInfo?.profileImage || '/default_avatar.png')
    const router = useRouter()

    // if there is no email - return to login page
    useEffect(() => {
        if (!newUser && !userInfo?.email) router.push('/login')
        else if (!newUser && userInfo?.email) router.push('/')
    }, [newUser, userInfo, router])


    const onBoardUserHandler = async () => {
        if (validateDetails()) {
            const email = userInfo.email
            try {
                const { data } = await axios.post(ONBOARD_USER_ROUTE, { email, name, about, profileImage: image })
                console.log("user created data = ", data)

                if (data.status) {
                    dispatch({ type: reducerCases.SET_NEW_USER, newUser: false })
                    dispatch({
                        type: reducerCases.SET_USER_INFO,
                        userInfo: {
                            id: data.data.id, name, email, profileImage: image, about
                        }
                    })
                    router.push('/')
                }

            } catch (error) {
                console.log("Error while registering user => ", error)
            }
        }
        else {
            alert('All filed required')
        }
    }

    const validateDetails = () => {
        if (name.length < 2 || about.length < 3) {
            return false
        }
        return true
    }

    return (
        <div className='bg-panel-header-background h-screen w-screen text-white flex-center flex-col'>
            <div className="flex-center gap-2 text-white">
                <Image
                    src='/whatsapp.gif'
                    width={300}
                    height={300}
                    alt='WhatsApp'
                />
                <span className='text-7xl'>WhatsApp</span>
            </div>

            <h2 className="text-2xl">Create Your Profile</h2>

            <div className="flex gap-6 mt-6">
                <div className="flex-center flex-col gap-6 mt-5">
                    <Input
                        name='Display Name'
                        label
                        state={name}
                        setState={setName}
                    />
                    <Input
                        name='About'
                        label
                        state={about}
                        setState={setAbout}
                    />

                    <button
                        onClick={onBoardUserHandler}
                        className='flex-center gap-3 w-full bg-search-input-container-background p-3  rounded-lg'
                    >
                        <IoCreateOutline /> Create Profile
                    </button>
                </div>

                {/* avatar */}
                <Avatar type={'xl'} image={image} setImage={setImage} />
            </div>
        </div>
    )
}

export default onboarding
