import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const tweets = [];

const users = [];

let userActive = {
  username: "",
  avatar: "",
};

app.get("/tweets", (req, res) => {
  const numbPage = parseInt(req.query.page);

  if (numbPage < 1) {
    res.status(400).send("Informe uma página válida!");
    return;
  }

  const maxTweets = 10 * numbPage;
  const minTweets = maxTweets - 10;

  const lastTenTweets = tweets.filter(
    (tweet, indx) => minTweets <= indx && indx < maxTweets
  );

  res.status(200).send(lastTenTweets);
});

app.get("/tweets/:id", (req, res) => {
  const username = req.params.id;

  const tweetsUser = tweets.filter((tweet) => tweet.username === username);

  res.send(tweetsUser);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(400).send("Preencha todos os campos!");
    return;
  }

  userActive = {
    username: username,
    avatar: avatar,
  };

  users.push(userActive);

  res.status(201).send("ok");
});

app.post("/tweets", (req, res) => {
  const username = req.headers.user;
  const { tweet } = req.body;

  if (!tweet) {
    res.status(400).send("Preencha todos os campos!");
    return;
  }

  const newTweet = {
    username,
    avatar: userActive.avatar,
    tweet,
  };

  tweets.unshift(newTweet);

  res.status(201).send("ok");
});

app.listen(5000, () => console.log("App running port: 5000"));
