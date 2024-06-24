import { useStateProvider } from '@/context/stateContext'
import { HOST } from '@/utils/apiRoutes'
import { calculateTime } from '@/utils/calculateTime'
import Image from 'next/image'
import MessageStatus from './../common/MessageStatus';


const ImageMessage = ({ message }) => {

    const [{ userInfo, },] = useStateProvider()



    return (
        <div className=''>
            <div className="relative">
                <Image
                    src={`${HOST}/${message.message}`}
                    className='rounded-2xl'
                    alt='asset'
                    height={300}
                    width={300}
                />
                <div className='absolute bottom-1 right-1 flex items-end gap-1 '>
                    <span className='text-bubble-meta text-[11px] pt-1 min-w-fit '>
                        {calculateTime(message.createdAt)}
                    </span>
                    <span className=''>
                        {
                            message.senderId === userInfo.id
                            && <MessageStatus messageStatus={message.messageStatus} />
                        }
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ImageMessage