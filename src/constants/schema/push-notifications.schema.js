import { Joi, Segments } from "celebrate";

export default {
    sendNotification: {
        [Segments.BODY]: {
            notificationType: Joi.string().required(),
            senderId: Joi.number().required(),
            senderName: Joi.string().required(),
            recipientTokens: Joi.array().items(Joi.string()).required()
        }
    }
}