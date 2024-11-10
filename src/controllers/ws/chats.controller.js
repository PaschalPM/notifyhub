import { Socket } from "socket.io";
import clientConfig from "../../config/client.config.js";
import { AxiosError } from "axios";

/**
 * Function to send a message in a chat namespace and post same to main api server
 * 
 * @param {Socket} chatNamespace 
 * @param {Socket} socket 
 * @param {object} data 
 */
const sendMessage = async (chatNamespace, socket, data) => {
    
    // Check if the 'message' property exists in the data
    if (!data.message) {
        socket.emit('error', data.message === undefined 
            ? "message property must be defined." 
            : "message must have a value.");
    }

    // Check if 'receiver_id' property exists in the data
    else if (!data.receiver_id) {
        socket.emit('error', "receiver_id property must be defined.");
    }

    // Check if 'receiver_id' is a valid number
    else if (isNaN(data.receiver_id)) {
        socket.emit('error', "receiver_id must be a number.");
    } 
    else {
        console.log(socket.accessToken)
        try {
            // Send the message data to an main API endpoint for further processing
            const resp = await clientConfig.mainApiClient.post('/chats/post_chat', data, {
                headers: {
                    "Authorization": `Bearer ${socket.accessToken}`
                }
            });
            console.log(resp.data)
            chatNamespace.emit("message", resp.data.data.created_chat);
        } 
        catch (e) {
            // Check if the error is an instance of AxiosError (specific to Axios library)
            if (e instanceof AxiosError) {
                console.error(e.response.data)
                // Emit the error message from the API response back to the client
                socket.emit('error', e.response?.data?.message || "An error occurred.");
            }
        }
    }
};


export default {
    sendMessage
}
