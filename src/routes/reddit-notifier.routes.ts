import { Router } from "express";
import {
  addUser,
  addUserSubReddits,
  getAllUsers,
  turningOffNewsLetter,
  turningOnNewsLetter,
  updateUser,
} from "../controllers/user-favs-subreddits.controller";

const redditRoutes = Router();

redditRoutes.get("/", getAllUsers);
redditRoutes.get("/users", getAllUsers);
redditRoutes.post("/user", addUser);
redditRoutes.patch("/user", updateUser);

redditRoutes.post("/user/subreddit", addUserSubReddits);
redditRoutes.patch("/user/subreddit", addUserSubReddits);

redditRoutes.post("/user/newsletter/turnon", turningOnNewsLetter);
redditRoutes.post("/user/newsletter/turnoff", turningOffNewsLetter);

export default redditRoutes;
