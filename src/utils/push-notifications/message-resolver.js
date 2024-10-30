//Notification object type names
const MESSAGE_SENT = "MESSAGE_SENT";
const HELLO_RECEIVED = "HELLO_RECEIVED";
const EVENT_RSVP_SENT = "EVENT_RSVP_SENT";
const DATING_PACKAGE_INVITATION_SENT = "DATING_PACKAGE_INVITATION_SENT";
const DATING_AGENT_INVITATION_SENT = "DATING_AGENT_INVITATION_SENT";
const NEW_MATCH_FOUND = "NEW_MATCH_FOUND";
const CHAT_REQUEST_SENT = "CHAT_REQUEST_SENT";
const GETAWAY_RSVP_SENT = "GETAWAY_RSVP_SENT";
const EVENT_INVITE_SENT = "EVENT_INVITE_SENT";
const FRIEND_REQUEST_SENT = "FRIEND_REQUEST_SENT";
const PREMIUM_CONNECTION_REQUEST_SENT = "PREMIUM_CONNECTION_REQUEST_SENT";

const getMessage = ({ data: { type, senderId, senderName }, recipientTokens }) => {

    const data = {
        type,
        senderId,     // Unique ID of the sender
        senderName,   // Name of the person sending the request
        timestamp: new Date().toISOString()
    }
    return ({ title, body }) => {
        return {
            notification: {
                title,
                body,
                data
            },
            tokens: recipientTokens  // Array of recipient tokens for multiple devices
        }
    }

};


const messageResolver = (notificationType, senderName, senderId, recipientTokens) => {
    const messageFunc = getMessage({
        data: {
            type: notificationType,
            senderId,
            senderName
        },
        recipientTokens
    })

    const cases = {
        [MESSAGE_SENT]: messageFunc({
            title: "New Message Received",
            body: `${senderName} has sent you a message.`
        }),

        [HELLO_RECEIVED]: messageFunc({
            title: "Hello Received",
            body: `A hello was received from ${senderName}`
        }),

        [EVENT_RSVP_SENT]: messageFunc({
            title: "Event RSVP Received",
            body: `An Event RSVP was sent to you.`
        }),

        [DATING_PACKAGE_INVITATION_SENT]: messageFunc({
            title: "New Invitation to a Dating Package!",
            body: `${senderName} sent you a dating package invite`
        }),

        [DATING_AGENT_INVITATION_SENT]: messageFunc({
            title: "New Client Invitation Request!",
            body: `${senderName} has sent an invitation. Tap to view.`
        }),

        [NEW_MATCH_FOUND]: messageFunc({
            title: "You've Got a New Match!",
            body: "You’ve been matched! Check out their profile."
        }),

        [CHAT_REQUEST_SENT]: messageFunc({
            title: "You've Got a Chat Request!",
            body: `${senderName} has sent you a chat request!`
        }),

        [GETAWAY_RSVP_SENT]: messageFunc({
            title: "You've Received an RSVP for the Getaway!",
            body: `${senderName} has sent you an RSVP for the getaway!`
        }),

        [EVENT_INVITE_SENT]: messageFunc({
            title: "New Event Invitation Sent Your Way!",
            body: `${senderName} has invited you to an event!`
        }),

        [FRIEND_REQUEST_SENT]: messageFunc({
            title: "New Friend Request",
            body: `You have a friend request from ${senderName}`
        }),

        [PREMIUM_CONNECTION_REQUEST_SENT]: messageFunc({
            title: "You've Received a Premium Connection Request!",
            body: `${senderName} has sent you a premium request. Check it out!`
        })
    }

    const selectedMessage = cases[notificationType]

    if (!selectedMessage) throw new Error(`Notification Type, ${notificationType} is not recognized!`)

    return selectedMessage;

}

export default messageResolver