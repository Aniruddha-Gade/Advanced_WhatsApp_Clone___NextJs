import { useState } from 'react'
import { useStateProvider } from "@/context/stateContext"
import Image from "next/image"
import Input from "@/components/common/Input"
import Avatar from "@/components/common/Avatar"

const onboarding = () => {

    const [{ userInfo },] = useStateProvider()
    const [name, setName] = useState(userInfo?.name || '')
    const [about, setAbout] = useState('')
    const [image, setImage] = useState(userInfo?.profileImage || '/default_avatar.png')

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
                </div>

                {/* avatar */}
                <Avatar type={'xl'} image={image} setImage={setImage} />
            </div>
        </div>
    )
}

export default onboarding
