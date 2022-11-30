const userRoutes = require("./Routes/userRoutes")
const MessagesRoute = require("./Routes/MessagesRoute")

const socket = require("socket.io")
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path')

const dotenv = require('dotenv')
dotenv.config();

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', MessagesRoute);

// Deployment

// const __dirname1 = path.resolve();
// if (process.env.NODE_ENV === 'production') {

//     app.use(express.static(path.join(__dirname1, "/frontend/build")));

//     app.get('*', (req, res) => {

//         res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html "))
//     })
// } else {

//     app.get('/', (req, res) => {

//         res.send("API is running successfully")
//     });
// }

// // Deployment


mongoose.connect(process.env.MONGO_URL, {

    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {

    console.log("DB connected successfully");
}).catch((error) => {

    console.log(error.message);
})


const server = app.listen(process.env.PORT, () => {

    console.log(`Server started on port ${process.env.PORT} successfully`);
})

//socket

const io = socket(server, {

    cors: {

        origin: process.env.ORIGIN,
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {

    console.log("connected to socket.io");
    global.chatSocket = socket;

    socket.on("add-user", (userId) => {

        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {

        console.log("sendmsg", { data });
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {

            socket.to(sendUserSocket).emit("msg-received", data.message)
            // console.log("message",data.message);
        }
    });
});