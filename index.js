import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const tweets = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
  },
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "trietse demais com isso",
  },
];

const users = [];

let userActive = {
  username: "",
  avatar: "",
};

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  userActive = {
    username: username,
    avatar: avatar,
  };

  users.push(userActive);

  if (!username || !avatar) {
    res.status(422).send("Preencha todos os campos!");
    return;
  }

  res.status(200).send("ok");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!tweet) {
    res.status(422).send("Preencha todos os campos!");
    return;
  }

  tweets.push({
    username,
    avatar: userActive.avatar,
    tweet,
  });

  res.status(201).send("ok");
});

app.listen(5000, () => console.log("Serve running port: 5000"));
