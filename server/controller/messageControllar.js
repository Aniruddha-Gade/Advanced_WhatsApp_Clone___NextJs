const getPrismaInstance = require("../utils/prismaClient")

// =============== Add Message ===============
exports.addMessage = async (req, res) => {
    try {
        const prisma = getPrismaInstance()

        const { message, from, to } = req.body
        // console.log({ message, from, to })
        const getUser = onlineUsers.get(to)

        if (message && from && to) {
            const newMessage = await prisma.message.create({
                data: {
                    message,
                    sender: { connect: { id: from } },
                    receiver: { connect: { id: to } },
                    messageStatus: getUser ? "delivered" : "sent",
                },
                include: { sender: true, receiver: true }
            })

            return res.status(200).json({
                message: 'message stored successfully',
                newMessage
            })
        }

        return res.status(400).send("From, to and Message is required.");
    } catch (error) {
        console.log('Error while storing message')
        console.log(error)
        return res.status().json({
            status: false,
            messgae: 'Error while storing message',
            error: error.message
        })
    }
}



// =============== Get All Messages ===============
exports.getMessages = async (req, res) => {
    try {
        const prisma = getPrismaInstance()
        const { from, to } = req.params
        // console.log({ from, to })

        const messages = await prisma.message.findMany({
            where: {
                OR: [
                    {
                        senderId: from,
                        receiverId: to,
                    },
                    {
                        senderId: to,
                        receiverId: from,
                    }
                ]
            },
            orderBy: {
                id: 'asc'
            }
        });


        const unreadMessages = []

        messages.forEach((message, index) => {
            if (message.messageStatus !== 'read' && message.senderId === to) {
                messages[index].messageStatus = 'read'
                unreadMessages.push(message.id)
            }
        })

        await prisma.message.updateMany({
            where: {
                id: { in: unreadMessages }
            },
            data: {
                messageStatus: 'read'
            }
        })

        // send response
        res.status(200).json({
            messages,
            unreadMessages,
            message: "All messages fetched successfully"
        })

    } catch (error) {
        console.log('Error while geting all messages')
        console.log(error)
        return res.status().json({
            status: false,
            messgae: 'Error while geting all messages',
            error: error.message
        })
    }
}
