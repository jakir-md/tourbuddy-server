import express, { type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./app/routes";
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "TourBuddy is listening.."
    })
});

export default app;