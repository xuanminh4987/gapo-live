// SERVER
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");

//  LIBS
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// ROUTES
const postsRouter = require("./routes/posts.route");
const usersRouter = require("./routes/users.route");
const groupsRouter = require("./routes/groups.route");
const messagesRouter = require("./routes/messages.route");

//  USING LIBS
app.use(cors());
app.use(bodyParser());
mongoose.connect(
  "mongodb+srv://xuanminh4987:Minh1751010088@cluster0.hat8c.mongodb.net/gapo?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;

    console.log("Connect MONGODB successfully!");
  }
);

app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.use("/posts", postsRouter);

app.use("/users", usersRouter);

app.use("/groups", groupsRouter);

app.use("/messages", messagesRouter);

app.get("*", (req, res) => {
  res.send("404 NOT FOUND!");
});

app.listen(port, () => {
  console.log(`${port}`);
});
