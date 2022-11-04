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

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.post("/sign-up", (req, res) => {
  res.status(200).send("ok");
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  tweets.push(tweet);
  res.status(201).send("ok");
});

app.listen(5000, () => console.log("Serve running port: 5000"));
