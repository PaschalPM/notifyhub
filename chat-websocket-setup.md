
# NotifyHub (Chat WebSocket Client) Setup

  

This repository provides the client-side setup for connecting to the **NotifyHub** WebSocket chat system. This guide explains how to establish the connection, send messages, and handle various events like errors and incoming messages.

---

  

## 1. Client Connection Setup

  

To connect to NotifyHub’s chat server, use the following WebSocket setup in JavaScript. Make sure to replace the placeholder `access_token` with the user's JWT access token.

  

```javascript
const  socket = io("ws://34.214.77.128:5000/chats", {

transports: ["websocket"], // Use only WebSocket for real-time communication

query: { access_token:  <user-jwt-access-token> } // Add access token for authentication

});
```

### Connection  Details:
URL:  ws://34.214.77.128:5000/chats
Transport:  websocket (ensures  a  persistent, low-latency  connection)
Query  Parameters:
access_token: User’s  JWT  access  token, required  for  authentication.

## 2.	Client  Events  to  Emit

#### 1. "send_message"  Event

To  send  a  message, emit  the  "send_message"  event  with  the  following  payload  structure:

```json
// Payload  Example:
{
	"message": "How are you?",
	"receiver_id": 415
}
```
 **Payload  Fields:**
- message (string, required): The  text  content  of  the  message.
- receiver_id (number, required): The  ID  of  the  user  receiving  the  message.

**Note:** Ensure  both  fields  are  included  and  valid. If  not, an  "error"  event  will  be  emitted  by  the  server  with  specific  error  details.

 
## 3.  Client  Events  to  Listen  For

### 1.  "connect_error"  Event

Listen  for  this  event  to  handle  connection-related  errors, especially  during  the  initial  connection  setup. This  event  provides  the  following  possible  error  messages:

1. **_access  token  not  found_**: The  access_token  parameter  is  missing  in  the  WebSocket  query.

1.  **_access  token  is  invalid_**: The  provided  access  token  could  not  be  decoded  or  verified.

1. **_access  token  has  expired_**: The  token’s  expiration  date  has  passed.

*Example  Usage:*
```js
socket.on("connect_error", (error) => {
	console.error("Connection Error:", error.message);
});
```
### 2.  "error"  Event

The  "error"  event  handles  any  issues  with  the  data  payload  when  sending  a  message. Errors  can  include  the  following:

1.	**_message  property  must  be  defined_**: The  payload  must  include  the  message  property.

2. **_message  must  have  a  value_**: The  message  field  cannot  be  empty.

3. **_receiver_id  property  must  be  defined_**: The  payload  must  include  the  receiver_id  property.

4. **_receiver_id  must  be  a  number_**: The  receiver_id  should  be  a  valid  number.

5. **_receiver  profile  not  found_**: The  specified  receiver_id  does  not  correspond  to  an  existing  user  profile.

Example  Usage:

```js
socket.on("error", (errorMessage) => {
	console.error("Error:", errorMessage);
});
```

### 3.  "message"  Event

The  server  emits  this  event  to  all  clients  in  the  chat  namespace  when  a  new  message  is  sent. Each  message  contains  details  about  the  sender, receiver, content, and  metadata.

*Data  Example:*

``` json
{
	"sender_id": "425",
	"receiver_id": 414,
	"chat_message": "How are you today?",
	"receiver_status": 1,
	"admin_status": 1,
	"created_at": "2024-11-10 09:53:22",
	"flag": 1,
	"id": "140"
}
```

**Data  Fields:**
- sender_id (string): The  ID  of  the  user  who  sent  the  message.
- receiver_id (number): The  ID  of  the  user  receiving  the  message.
- chat_message (string): The  actual  message  content.
- receiver_status (number): Status  indicator  for  the  receiver’s  view (e.g., 1  for  active).
- admin_status (number): Status  indicator  for  administrative  monitoring.
- created_at (string): Timestamp  for  when  the  message  was  created (in  YYYY-MM-DD  HH:MM:SS  format).
- flag (number): Flag  indicator  for  any  special  conditions (e.g., 1  for  a  regular  message).
- id (string): Unique  identifier  for  the  message.

*Example  Usage:*

```js
socket.on("message", (data) => {
	console.log("New Message:", data);
});
```

### 4.  Summary  of  Client  Events

| Event           | Description                                                            | Payload Structure / Example                                                                       |
|-----------------|------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| "send_message"  | Emitted  by  client  to   send  a  message.                            | { "message": "Hello!", "receiver_id": 415 }                                                       |
| "connect_error" | Emitted  by  server  for  connection  errors (e.g., token  issues).    | Examples: "Access token not found.", "Access token has expired."                                  |
| "error"         | Emitted  by  server  for  payload  validation  errors.                 | Examples: "message property must be defined.", "receiver_id must be a number."                    |
| "message"       | Emitted  by  server  to  broadcast  a  new  message  to  all  clients. | Example  data: { "sender_id":  "425", "receiver_id":  414, "chat_message":  "How are you?", ... } |

### 5.  Additional  Notes

Make  sure  the  client’s  access_token  remains  valid by using the refresh token when necessary  to  avoid  connection  issues  due  to  expiration.

Properly  handle  each  error  by  displaying  user-friendly  messages  to  improve  the  chat  experience.

The  "message"  event  includes  status  and  timestamp  details, which  can  be  useful  for  displaying  message  history  and  user  activity  status.

Ensure  that  the  receiver_id  exists  and  is  valid  in  the  system  to  prevent  errors  related  to  non-existent  profiles.

### 6.  Troubleshooting

ERR_CONNECTION_REFUSED: If  you  encounter  this  error  when  connecting  to  the  WebSocket  server, ensure  that  the  server  is  running, and  the  WebSocket  URL  is  correctly  specified.

Access  token  issues: Double-check  the  token  passed  in  the  WebSocket  query. It  must  be  a  valid  JWT  token  that  matches  the  user’s  session.

Message  Sending  Errors: If  the  message  isn't sent, confirm the payload is correct. The message and receiver_id fields must be provided and correctly formatted.