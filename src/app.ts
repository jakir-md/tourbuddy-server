import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
import { createServer } from "http";
import { initSocket } from "./socket";
import statusCode from "http-status";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app = express();
const httpServer = createServer(app);
initSocket(httpServer);

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(statusCode.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not found!",
    },
  });
});

app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "TourBuddy is listening..",
  });
});

export default app;