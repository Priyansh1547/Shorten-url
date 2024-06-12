import { getUser } from "../service/auth";

export async function restrictToLoggedInUser(req: any, res: any, next: any) {
  const userId = req.cookies?.uid;
  console.log(userId);
  if (!userId) return res.redirect("/login");
  const user = getUser(userId);
  if (!user) return res.redirect("/login");
  console.log(user);

  req.user = user;

  next();
}
