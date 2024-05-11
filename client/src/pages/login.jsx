import React from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

import { firebaseAuth } from '@/utils/firebaseConfig'
import { FcGoogle } from 'react-icons/fc'
import { reducerCases } from '@/context/constants'
import { useStateProvider } from '@/context/stateContext'
import { CHECK_USER_ROUTE } from '@/utils/apiRoutes'

const Login = () => {

    const router = useRouter()
    const [{ }, dispatch] = useStateProvider()

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider
        const { user: { email, displayName: name, photoURL: profileImage } } = await signInWithPopup(firebaseAuth, provider)


        try {
            const { data } = await axios.post(CHECK_USER_ROUTE, { email })
            console.log("CHECK USER API RESPONSE ==> ", data)

            if (!data.status) {
                dispatch({ type: reducerCases.SET_NEW_USER, newUser: true })
                dispatch({
                    type: reducerCases.SET_USER_INFO,
                    userInfo: { name, email, profileImage, status: '' }
                });
                router.push('/onboarding')
            }
        } catch (error) {
            console.log("Error while checking user register or not 🔴🔴 = ", error)
        }

    }

    return (
        <div className='flex-center flex-col gap-6 bg-panel-header-background h-screen w-screen  '>
            <div className="flex-center gap-2 text-white">
                <Image
                    src='/whatsapp.gif'
                    width={300}
                    height={300}
                    alt='WhatsApp'
                />
                <span className='text-7xl'>WhatsApp</span>
            </div>

            <button
                onClick={handleLogin}
                className='flex-center gap-7 bg-search-input-container-background p-5 rounded-lg'
            >
                <FcGoogle className='text-4xl' />
                <span className="text-white text-2xl">Login With Google</span>
            </button>
        </div>
    )
}

export default Login