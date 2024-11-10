import Express from "express"
import http from "http"
import { Server as SocketServer } from "socket.io"
import chatsEvent from "../events/ws/chats.event.js"
import appConfig from "./app.config.js"


/**
 * Function to set up an HTTP server and WebSocket server
 * 
 * @param {Express} app 
 */
const initializeHttpServerWithWebSocket = (app) => {
    const httpServer = http.createServer(app)
    const io = new SocketServer(httpServer, {
        cors: {
            origin: "*"
        }
    })

    // Define a WebSocket namespace specifically for chat-related events
    const chatNamespace = io.of('/chats')

    // Set up an event listener for new WebSocket connections within the '/chats' namespace
    chatNamespace.on("connection", (socket) => {
        // When a client connects, handle chat-related events by calling `chatsEvent`
        chatsEvent(chatNamespace, socket)
    })
    return httpServer
}

export default initializeHttpServerWithWebSocket