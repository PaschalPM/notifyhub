import { Server } from "socket.io"

import chatsEvent from "../events/ws/chats.event.js"
import appConfig from "./app.config.js"

const configureWebSocket = (httpServer) => {
    const io = new Server(httpServer, {
        cors: {
            origin: appConfig.corsAllowedOrigin,
        },
    })

    // Set up namespaces
    const chatsNamespace = io.of('/chats')

    // Attach events after connection event
    chatsNamespace.on("connection", (socket) => {
        chatsEvent(chatsNamespace, socket)
    })

}

export default { configureWebSocket }