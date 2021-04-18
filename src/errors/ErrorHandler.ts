import { Request, Response, NextFunction } from "express";
import HttpException from "./HttpException";

export default function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    return res
      .status(error.statusCode)
      .json({ status: "error", message: error.message });
  }
  return res.status(500).json({
    status: "error",
    message: error.message.replace(/\n|\r|  /gm, "").replace(/\"/gm, "'"),
  });
}
