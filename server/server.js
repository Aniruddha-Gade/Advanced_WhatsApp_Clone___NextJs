const express = require('express');
const dotenv = require('dotenv')
const cors = require('cors')

const AuthRoutes = require('./routes/authRoutes')
const MessageRoutes = require('./routes/messageRoutes')

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


// sockets 
global.onlineUsers = new Map()