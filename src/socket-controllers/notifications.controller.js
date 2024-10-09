import { io } from "../config/server.js";

const ns = io.of('/notifications')

ns.on("connection", (socket) => {
    console.log("Client connected for notifications.")
    socket.on('disconnect', (reason) => {
        console.log(`Socket ${socket.id} disconnected`, reason)
    })
})


const notify = (req, res) => {
    const subjectId = req.subjectId
    const eventName = `notify@${subjectId}`
    ns.emit(eventName, req.body)
    res.json({
        status: "success",
        message: `Event ${eventName} emitted.`
    })
}

export default { notify }