import * as dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const { PORT, SENDGRID_API_KEY } = process.env;
