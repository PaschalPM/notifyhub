import Express from "express"
import http from "http"
import { Server as SocketServer } from "socket.io"
import chatsEvent from "../events/ws/chats.event.js"
import appConfig from "./app.config.js"
import checkAuthToken from "../middlewares/ws/check-auth-token.middleware.js"


/**
 * Function to set up an HTTP server and WebSocket server
 * 
 * @param {Express} app 
 */
const initializeHttpServerWithWebSocket = (app) => {
    const httpServer = http.createServer(app)
    const io = new SocketServer(httpServer, {
        cors: {
            origin: "http://localhost:5501"
        }
    })

    // Define a WebSocket namespace specifically for chat-related events
    const chatNamespace = io.of('/chats')

    // Middleware to check authenticity of the access token in the socket handshake
    chatNamespace.use(checkAuthToken)

    // Set up an event listener for new WebSocket connections within the '/chats' namespace
    chatNamespace.on("connection", (socket) => {

        // When a client connects, handle chat-related events by calling `chatsEvent`
        chatsEvent(chatNamespace, socket)
    })
    return httpServer
}

export default initializeHttpServerWithWebSocket