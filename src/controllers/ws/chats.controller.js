import { Socket } from "socket.io"
import socketioHelper from "../../utils/socketio.js";

/**
 * 
 * @param {Socket} chatNamespace 
 * @param {Socket} socket 
 * @param {*} data 
 */
const joinChat = (_chatNamespace, socket, data) => {
    const privateRoomId = socketioHelper.generateRoomID(data)
    socket.join(privateRoomId)
    socket.emit("chatJoined", { roomId: privateRoomId })
}

const sendMessage = (chatNamespace, _socket, data) => {
    const roomIdData = { user1Id: data.senderId, user2Id: data.receiverId }
    const privateRoomId = socketioHelper.generateRoomID(roomIdData)

    chatNamespace.to(privateRoomId).emit("receiveMessage", {
        message: data.message,
        senderId: data.senderId,
        receiverId: data.receiverId
    })
}

export default { joinChat, sendMessage }