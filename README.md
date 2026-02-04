# Chit-Chat App

A simple real-time messaging app built with Socket.IO. It supports instant message delivery, system notifications when users join/leave, and a clean UI for quick demos or learning.

## Features
- Real-time messaging with Socket.IO.
- Join flow with a display name.
- System messages for join/leave events.
- Simple, responsive UI.

## Tech Stack
- **Backend**: Node.js + Express + Socket.IO
- **Frontend**: Vanilla HTML/CSS/JavaScript

## Run locally
> Works on any computer that can run Node.js. This is a free and local setup.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
3. Open your browser:
   ```
   http://localhost:3000
   ```

## Optional: run on your own computer as a small “server”
If you want to let other people on the same network access the app:

1. Find your local IP address (example: `192.168.1.50`).
2. Start the server with a public host/port:
   ```bash
   PORT=3000 npm start
   ```
3. Ask your friends to open:
   ```
   http://YOUR_IP:3000
   ```

### Optional: Apache (free) for static hosting
If you prefer, you can serve the **static** frontend (`public/`) with Apache or Nginx. However, real-time messaging still requires the Socket.IO server running in Node.js. You can also set up Apache as a reverse proxy to the Node server:

- Serve `/public` as normal static files.
- Proxy `/socket.io` and the root `/` to your Node.js server.

This way you can use Apache for hosting and keep real-time communication in Node.js.

## Usage
1. Open the app and enter a display name.
2. Join the chat.
3. Send messages and see real-time updates.

## Project structure
```
.
├── public
│   ├── client.js
│   ├── index.html
│   └── styles.css
├── server.js
└── package.json
```

## Notes
- This project is intentionally minimal for learning and demos.
- You can expand it with rooms, typing indicators, and message persistence.
