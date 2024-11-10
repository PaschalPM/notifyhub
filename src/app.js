import express from "express";
import initializeHttpServerWithWebSocket from "./config/http-ws.config.js";
import indexRouter from "./routes/index.js";
import apiErrorMiddleware from "./middlewares/http/api-error-handler.middleware.js";
import "./config/firebase-admin.config.js"

// Set up express server
const app = express()

const httpServer = initializeHttpServerWithWebSocket(app)

app.use(express.json())
app.use(indexRouter)
app.use(apiErrorMiddleware)

export default { application: app, httpServer }