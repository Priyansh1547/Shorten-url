import express from "express";
import { createUser , getUser } from "../controllers/user";

export const userRouter = express.Router();

userRouter.post("/", createUser);

userRouter.post("/login" , getUser)