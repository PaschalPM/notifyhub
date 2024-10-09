import express from "express";
import { Server as httpServer } from "http"
import { Server as wsServer } from "socket.io"
import dotenv from "dotenv" 
dotenv.config()

const app = express()
const http = new httpServer(app)
const io = new wsServer(http, {
    cors: {
        origin: process.env.HOST_URL
    }
})

app.use(express.json())
export { app, io }
export default http