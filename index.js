const express = require("express");
const cors = require("cors");
const http = require("http");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
const commentRouter = require("./routes/comment.routes");
const notificationRouter = require("./routes/notification.routes");
const followerRouter = require("./routes/follower.routes");
const passport = require("passport");
const likesRouter = require("./routes/likes.routes");
const conversationRouter = require("./routes/conversation.routes");
const messageRouter = require("./routes/message.routes");

// --------------------
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://instaclonevi.netlify.app",
      "https://intagra-frontend.vercel.app",
      "https://stunning-hummingbird-49823f.netlify.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Instagram Server");
});
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/notifications", notificationRouter);
app.use("/followers", followerRouter);
app.use("/likes", likesRouter);
app.use("/conversations", conversationRouter);
app.use("/messages", messageRouter);
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),

  function (req, res) {
    // Successful authentication, redirect home.
    const token = req.token;
    res.cookie("insta_token", token, {
      httpOnly: false,
      sameSite: "lax",
    });
    res.redirect(`http://localhost:3000`);
  }
);

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://instaclonevi.netlify.app",
      "https://intagra-frontend.vercel.app",
      "https://stunning-hummingbird-49823f.netlify.app",
    ],
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //on connection
  console.log("a user connected");
  //take userId and socket Id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text, senderImage }) => {
    const user = getUser(receiverId);
    if (user) {
      io.to(user.socketId).emit("getMessage", {
        senderImage,
        senderId,
        text,
      });
    }
  });

  //disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, "0.0.0.0", async () => {
  try {
    await connection;
    console.log(`server running on ${PORT}`);
    console.log("database connected");
  } catch (error) {
    console.log("error while listening", error);
  }
});
