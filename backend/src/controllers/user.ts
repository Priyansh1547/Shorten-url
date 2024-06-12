import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth";

export async function createUser(req: any, res: any) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.redirect("/");
}

export async function getUser(req: any, res: any) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}
