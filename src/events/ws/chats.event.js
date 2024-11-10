import { Socket } from "socket.io";
import chatsController from "../../controllers/ws/chats.controller.js";
/**
 * 
 * @param {Socket} chatNamespace 
 * @param {Socket} socket 
*/

const chatsEvent = (chatNamespace, socket) => {
    // data = {message, senderId, receiverId}
    socket.on("sendMessage", (data) => chatsController.sendMessage(chatNamespace, data))
}

export default chatsEvent