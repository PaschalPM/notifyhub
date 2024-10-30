import { Socket } from "socket.io";
import chatsController from "../../controllers/ws/chats.controller.js";

/**
 * 
 * @param {Socket} chatNamespace 
 * @param {Socket} socket 
*/

const chatsEvent = (chatNamespace, socket) => {

    // data = {user1Id, user2Id}
    socket.on("joinChat", (data) => chatsController.joinChat(chatNamespace, socket, data))

    // data = {message, senderId, receiverId}
    socket.on("sendMessage", (data) => chatsController.sendMessage(chatNamespace, socket, data))
}

export default chatsEvent