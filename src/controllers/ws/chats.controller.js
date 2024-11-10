import { Socket } from "socket.io";
import { format } from 'date-fns'; 


/**
 * 
 * @param {Socket} chatNamespace 
 * @param {Socket} socket 
 * @param {object} data 
 */
const sendMessage = (chatNamespace, data) => {
    const date = new Date();
    const creationTime = format(date, 'yyyy-MM-dd HH:mm:ss');
    
    // TODOS
    // Create middleware for JWT handshake .....
    // Send message to Main API server ....
    // Edit payload for post message on main server to contain createdAt ....
    
    chatNamespace.emit("message", {
        ...data,
        creationTime
    })
}

export default {
    sendMessage
}
