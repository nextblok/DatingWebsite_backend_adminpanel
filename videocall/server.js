const express = require("express");
const http = require("http");
const app = express();

const { Server } = require("socket.io");
const username = require("username-generator");
const path = require("path");

app.use(express.static("./client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const users = {};

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

  //generate username against a socket connection and store it
  const userid = username.generateUsername("-");
  console.log(userid)
  if (!users[userid]) {
    users[userid] = socket.id;
  }
  //send back username
  socket.emit("yourID", userid);
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    delete users[userid];
  });

  socket.on("callUser", (data) => {
    io.to(users[data.userToCall]).emit("hey", {
      signal: data.signalData,
      from: data.from,
    });
  });

  socket.on("acceptCall", (data) => {
    io.to(users[data.to]).emit("callAccepted", data.signal);
  });

  socket.on("close", (data) => {
    io.to(users[data.to]).emit("close");
  });

  socket.on("rejected", (data) => {
    io.to(users[data.to]).emit("rejected");
  });

  socket.on("sendMessage", (data) => {
    io.to(users[data.to]).emit("receiveMessage", data.text);
  });
});

const port = process.env.PORT || 7000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
