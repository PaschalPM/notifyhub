import { InternalServerError } from "../../utils/http/exceptions.js";
import messageResolver from "../../utils/push-notifications/message-resolver.js";
import admin from "firebase-admin";

/**
 * Sends a push notification to the specified recipient tokens.
 *
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
const sendNotification = async (req, res, next) => {
    const { senderId, senderName, recipientTokens, notificationType } = req.body;

    // Validate recipient tokens
    if (!recipientTokens || !recipientTokens.length) {
        return res.status(400).json({ error: 'An array of recipient tokens is required' });
    }

    // Convert notification type to uppercase for consistency
    const notificationTypeToUpperCase = notificationType.toUpperCase();
    let message;

    try {
        // Resolve the notification message based on the type
        message = messageResolver(notificationTypeToUpperCase, senderName, senderId, recipientTokens);

    } catch (e) {
        return res.json({
            status: "error",
            errorMessage: e.message
        });
    }

    try {
        // Send the multicast message to the recipient tokens
        const response = await admin.messaging().sendEachForMulticast(message);
        console.log('Successfully sent friend request notifications:', response);

        // Check for failed tokens in the responses
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
            if (!resp.success) {
                failedTokens.push(recipientTokens[idx]); // Collect failed tokens
            }
        });


        res.status(200).json({
            message: `${message.notification.data.type} notification dispatched successfully`,
            successCount: response.successCount,
            failureCount: response.failureCount,
            failedTokens: failedTokens
        });
    } catch (error) {
        console.error('Error sending notification:', error);
        return next(new InternalServerError(error.message));
    }
}

export default { sendNotification };