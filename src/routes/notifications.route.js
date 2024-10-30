import { Router } from "express";
import ensureSubjectId from "../middlewares/ensure-subject-id.middleware.js";

const router = Router()

router.use(ensureSubjectId)


export default router