const getPrismaInstance = require("../utils/prismaClient")



exports.checkUser = async (req, res, next) => {
    try {
        const { email } = req.body

        if (!email) {
            return res.json({
                status: false,
                message: 'Email is required'
            })
        }

        const prisma = getPrismaInstance()
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.json({
                status: false,
                message: 'User not found'
            })
        }
        return res.json({
            status: true,
            message: 'User found successfully',
            data: user
        })
    } catch (error) {
        console.log('Error while checking user register or not')
        console.log(error)
        return res.status().json({
            status: false,
            messgae: 'Error while checking user register or not',
            error: error.message
        })
    }
}


// =============== Register User ===============
exports.onBoardUser = async (req, res) => {
    try {
        const { email, name, about, profileImage } = req.body
        // console.log('req.body = ', req.body)
        if (!email || !name || !about || !profileImage) {
            return res.status().json({
                status: false,
                messgae: 'All fieds are required'
            })
        }

        const prisma = getPrismaInstance()

        const user = await prisma.user.create({
            data: { email, name, about, profileImage }
        })

        return res.status(200).json({
            status: true,
            message: 'User registered successfuly',
            data: user
        })
    } catch (error) {
        console.log('Error while registering user')
        console.log(error)
        return res.status().json({
            status: false,
            messgae: 'Error while registering user',
            error: error.message
        })
    }
}