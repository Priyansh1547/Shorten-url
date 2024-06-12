import express from "express";
import { connectMogodb } from "./connection";
import { userRouter } from "./routes/user";
import { URL } from "./model/url";
import path from "path";
import { User } from "./model/user";
import cors from "cors";
import ShortUniqueId from "short-unique-id";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);

const url =
  "mongodb+srv://patelpiyu468:1547%40%23piyu@short-url.gyinpna.mongodb.net/?retryWrites=true&w=majority&appName=short-url";

connectMogodb(url)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("error", err));

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (entry && entry.redirectUrl) {
    res.redirect(entry.redirectUrl);
  } else {
    // Handle the case where entry is null or redirectUrl is missing
    res.status(404).send("Redirect URL not found");
  }
});

app.delete("/delete/:id", async (req, res) => {
  await URL.findByIdAndDelete(req.params.id);
  res.json({ status: "success" });
});

app.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: "success" });
});

app.get("/analytics/:shortId", async (req, res) => {
  const body = req.params.shortId;
  const result = await URL.findOne({ shortId: body });
  if (result && result.visitHistory) {
    res.json({ VisiteHistory: result.visitHistory.length });
  } else {
    // Handle the case where entry is null or redirectUrl is missing
    res.status(404).send("Redirect URL not found");
  }
});

const uid = new ShortUniqueId({ length: 8 });

app.post("/short", async (req, res) => {
  const body = req.body.websiteUrl;
  const shortId = uid.rnd();

  if (!body) return res.json({ error: "url is require" });
  const result = await URL.create({
    shortId: shortId,
    redirectUrl: body,
    visitHistory: [],
  });
  res.json({ id: shortId });
});

app.listen(port, () => console.log(`running at http://localhost:${port}`));
