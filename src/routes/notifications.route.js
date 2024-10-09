import { Router } from "express";
import notificationsController from "../socket-controllers/notifications.controller.js";
import ensureSubjectId from "../middlewares/ensureSubjectId.js";

const router = Router()

router.use(ensureSubjectId)
router.post('/notify',  notificationsController.notify)

export default router