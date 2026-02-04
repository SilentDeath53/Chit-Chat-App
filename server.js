const path = require("path");
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("join", (payload) => {
    const username = payload?.username?.trim() || "Guest";
    socket.data.username = username;
    socket.broadcast.emit("system", `${username} joined the chat.`);
    socket.emit("system", `Welcome ${username}!`);
  });

  socket.on("message", (payload) => {
    const username = socket.data.username || "Guest";
    const text = payload?.text?.trim();
    if (!text) {
      return;
    }
    io.emit("message", {
      username,
      text,
      timestamp: new Date().toISOString()
    });
  });

  socket.on("disconnect", () => {
    const username = socket.data.username || "Guest";
    socket.broadcast.emit("system", `${username} left the chat.`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
