const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", () => {
  console.log("New client connected");
});

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
