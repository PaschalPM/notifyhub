import express from "express";
import { Server as httpServer } from "http"

import websocketConfig from "./ws.config.js"

import indexRouter from "../routes/index.js";
import apiErrorMiddleware from "../middlewares/api-error-handler.middleware.js";

import "./firebase-admin.config.js"

// Set up express server
const app = express()
const http = new httpServer(app)
websocketConfig.configureWebSocket(http)



app.use(express.json())
app.use(indexRouter)
app.use(apiErrorMiddleware)
export default http