const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv/config");
const { urlencoded } = require("express");
const passport = require("passport");
const routes = require("./routes/index");
const keys = require("./config/keys");
const Chat = require("./models/Chat");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utilities/users");

//PORT
const PORT = process.env.PORT || 8000;

//connect to database
mongoose.connect(
  keys.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to db")
);

//middleware
const corsOptions = {
  //To allow requests from client
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    // "http://104.142.122.231",
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors(corsOptions));

//routes
app.use(routes);

//cofiguring client routes
if (process.env.NODE_ENV === "production") {
  // Serve build assets
  app.use(express.static("client/build"));

  // Serve index.html from /build for base route (catch all)
  app.get("*", (req, res) => {
    // eslint-disable-next-line no-undef
    res.sendFile(path.resolve("client", "build", "index.html"));
  });
}

//io
//how to join 2 members in a chat

io.on("connect", (socket) => {
  let chatRoom;
  let id;

  socket.on("join", ({ username, room, connectId }, callback) => {
    // const { error, user } = addUser({
    //   id: socket.id,
    //   username,
    //   room,
    //   connectId,
    // });

    // if (error) return callback(error);

    if (room === "chat") {
      chatRoom = `${connectId}chat`;
      id = connectId;
      socket.join(chatRoom);

      // const newChat = new Chat({
      //   connectId: connectId,
      // });

      // try {
      //   const savedChat = newChat.save();
      // } catch (err) {
      //   return err;
      // }
    }

    console.log("connected to sockect io");

    callback();
  });

  socket.on("sendMessage", async (log, callback) => {
    // const user = getUser(socket.id);
    const update = { $push: { chatLog: log } };

    try {
      await Chat.findByIdAndUpdate({ _id: id }, update, {
        new: true,
      });
    } catch (err) {
      return err;
    }

    io.in(chatRoom).emit("message", { user: log.username, text: log.message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// let users = [];
// const messages = {
//   chat: [],
//   general: [],
// };
// io.on("connection", (socket) => {
//   // io.emit("message", { username, message });
//   socket.on("join server"),
//     (username) => {
//       const user = {
//         username,
//         id: socket.id,
//       };

//       users.push(user);
//       io.emit("new user", users);
//     };

//   socket.on("join room", (roomName, cb) => {
//     socket.join(roomName);
//     cb(messages[roomName]);
//   });

//   socket.on("send message", ({ content, to, sender, chatName, isChannel }) => {
//     if (isChannel) {
//       const payload = {
//         content,
//         chatName,
//         sender,
//       };

//       socket.to(to).emit("new message", payload);
//     } else {
//       const payload = {
//         content,
//         chatName: sender,
//         sender,
//       };

//       socket.to(to).emit("new message", payload);
//     }

//     if (messages[chatName]) {
//       messages[chatName].push({ sender, content });
//     }
//   });

//   socket.on("disconnec", () => {
//     users = users.filter((u) => u.id !== socket.id);
//     io.emit("new user", users);
//   });
// });

//server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

module.exports = app;
