import { io } from "../config/server.js"

const ns = io.of("/chats")

ns.on("connection", (socket) => {
    console.log("Client connected for chats")
    socket.on('msg', (data)=>{
        socket.broadcast.emit('message', data)
    })
})