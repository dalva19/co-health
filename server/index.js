const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv");
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
  ],
  credentials: true,
  exposedHeaders: ["set-cookie"],
};

app.use(express.json({ limit: "10mb" }));
app.use(urlencoded({ extended: false, limit: "10mb" }));
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

//io server for chat feature
io.on("connect", (socket) => {
  let chatRoom;
  let id;

  console.log("connected to socket io");

  socket.on("join", async ({ chatId }, callback) => {
    if (chatId) {
      id = chatId;
      chatRoom = `${chatId}chat`;
      socket.join(chatRoom);
    }

    console.log(`connected to sockect io in ${chatRoom}`);

    callback();
  });

  socket.on("sendMessage", async ({ log, chatId }, callback) => {
    const update = { $push: { chatLog: log } };

    try {
      await Chat.findByIdAndUpdate(chatId, update, {
        new: true,
      });
    } catch (err) {
      return err;
    }

    io.in(chatRoom).emit("message", {
      username: log.username,
      message: log.message,
    });

    callback();
  });

  socket.on("leaveRoom", async ({ chatId }) => {
    if (chatRoom === `${chatId}chat`) {
      socket.leave(chatRoom);
    }

    console.log(`left ${chatRoom}`);
  });

  socket.on("disconnect", () => {
    if (chatRoom) {
      socket.leave(chatRoom);
    }
    console.log("disconnect");
  });
});

//server
server.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

module.exports = app;
