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
        console.log(``)
    }
}