import express, { Express } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import usersRouter from "./routes/users";
import { errorHandlerMiddleware } from "./middlewares/error";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8181;

app.use(cors());
app.use(bodyParser.json());
app.use(errorHandlerMiddleware);

app.use("/users", usersRouter);

const server = app.listen(port, () => {
  console.log(`[server]: server is running at http://localhost:${port}`);
});

export { app, server };
