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

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("message", ({ room, name, message }) => {
    console.log(room, message);
    io.in(room).emit("message", { name, message });
  });

  socket.on("join", (room) => {
    socket.join(room);
  });
});

// app.get("/send-mssg-to-client", (req, res) => {
//   io.emit("mssg", "hello, from server");
//   res.send("message sent");
// });

const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
