import { Router } from "express";
import pushNotificationController from "../controllers/http/push-notifications.controller.js";
import { celebrate } from "celebrate";
import pushNotificationSchema from "../constants/schema/push-notifications.schema.js";

const router = Router()

router.post(
    '/send-notifications',
    celebrate(pushNotificationSchema.sendNotification),
    pushNotificationController.sendNotification
)

export default router