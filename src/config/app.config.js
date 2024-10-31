import express from "express";

import indexRouter from "../routes/index.js";
import apiErrorMiddleware from "../middlewares/api-error-handler.middleware.js";
import "./firebase-admin.config.js"

// Set up express server
const app = express()

app.use(express.json())
app.use(indexRouter)
app.use(apiErrorMiddleware)

export default app