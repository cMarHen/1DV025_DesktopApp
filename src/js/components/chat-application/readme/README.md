# &lt;chat-application&gt;

Main component for the chat application. 
Using a WebSocket from 'wss://courselab.lnu.se/message-app/socket'

## Methods

### `checkIfLoggedIn()`

A method that check if user has a username.

Parameters: None.

Returns: None.

### `gotNewMessage()`

Called when a new message has arrived. Parses the data and append it to messagefield. If the message is sent by the user, it is displayed different.

Parameters: event - The event.

Returns: none.

## Events

| Event Name | Fired When |
|------------|------------|
| `username-set`| When a username is set.
| `user-message`| When the user want to send a message.
| `clicked`| When user want to change its username.
| `message`| When a new message has arrived from socket.
