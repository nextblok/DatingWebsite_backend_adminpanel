const http = require("http");
const { Server } = require("socket.io");
const Chatcontroller = require("./controllers/chatcontroller.js");
const { emitNotificationForChat } = require("./controllers/socketController");

const server = http.createServer();
global.io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://104.236.35.101"], // Allow these origins
    methods: ["GET", "POST"], // Allow these HTTP methods
    allowedHeaders: ["my-custom-header"], // Optional: Specify allowed headers
    credentials: true, // Optional: Allow credentials like cookies
  },
});

io.on("connection", (socket) => {
  // console.log(socket.id);

  socket.on("register", (user_id) => {
    console.log("register", user_id);
    socket.join(user_id);
  });

  socket.on("message", async (message) => {
    console.log("message", message);
    io.to(message.receiver).emit("message", message);
    await Chatcontroller.createChat(
      message.sender,
      message.receiver,
      message.message
    );
    await emitNotificationForChat(
      message.receiver,
      message.sender,
      message.message
    );
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
  });
});

io.listen(8080);
console.log("Socket.io listening on port 8080");
