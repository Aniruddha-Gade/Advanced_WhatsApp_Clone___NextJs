const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')

const AuthRoutes = require('./routes/authRoutes')
const MessageRoutes = require('./routes/messageRoutes');
const { Server } = require('socket.io');

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;


// middleware 
app.use(express.json()); // to parse json body
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);



// mount route
app.use('/api/auth', AuthRoutes)
app.use("/api/messages", MessageRoutes)


// start server
const server = app.listen(PORT, () => {
    console.log(`Server Started on PORT ${PORT}`);
});


// Default Route
app.get('/', (req, res) => {
    console.log('Your server is up and running..!');
    res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})


// socket.io
global.onlineUsers = new Map()

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://my-web-whatsapp.vercel.app"],
    }
});


io.on("connection", (socket) => {
    global.chatSocket = socket

    // When a user connects, add them to the online users map
    socket.on("add-user", (userId) => {
        // console.log(`user with ID - ${userId} - id added to onlineUsers Map`)
        onlineUsers.set(userId, socket.id)

        // console.log("after adding users to Online List => ", onlineUsers)
    })

    // When a message is sent, find the recipient and forward the message if they are online
    socket.on("send-msg", (data) => {

        // console.log("Message received from Browser => ", data)
        // console.log("onlineUsers = ", onlineUsers)
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-receive", {
                message: data.message,
                from: data.from,
                to: data.to,
            })
            // console.log("Mesage sent to Broswer")
        }
    })
})