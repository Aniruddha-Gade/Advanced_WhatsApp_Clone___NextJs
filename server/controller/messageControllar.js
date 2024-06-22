const getPrismaInstance = require("../utils/prismaClient")


exports.addMessage = async (req, res) => {
    try {
        const prisma = getPrismaInstance()

        const { message, from, to } = req.body
        console.log({ message, from, to })
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

