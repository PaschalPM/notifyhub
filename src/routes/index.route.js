import notificationsRouter from "./notifications.route.js";
import "./chats.route.js"
import { app } from "../config/server.js";

app.use('/notifications', notificationsRouter)