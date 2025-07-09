import express from "express";
import Urlrouter from "./routes/url.js";
import { connectToMongoDB } from "./connect.js";
import { URL } from "./models/url.js";
import path from "path";
import staticRouter from "./routes/staticRouter.js";

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("connect to the Database.")
);

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/url", Urlrouter);

app.use("/", staticRouter);

app.get("/url/:shortID", async (req, res) => {
  const shortId = req.params.shortID;
  console.log("recived shortID", shortId);
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(entry.redirectURL);
});



app.listen(PORT, () => console.log(`Serveris running on ${PORT}`));
