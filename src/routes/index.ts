import { Router } from "express";
import redditRoutes from "./reddit-notifier.routes";

const routes = Router();

routes.use("/api/v1/", redditRoutes);

export default routes;
