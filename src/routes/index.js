import pushNotificationsRouter from "./push-notifications.route.js";
import { Router } from "express";

const router = Router()

router.use('/push-notifications', pushNotificationsRouter)
export default router