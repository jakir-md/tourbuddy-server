import express from "express";
import { UserControllers } from "./user.controller";
import { multerUpload } from "../../../../config/multer.config";
const router = express.Router();

router.post(
  "/register",
  multerUpload.single("file"),
  UserControllers.registerUser
);

export const UserRoutes = router;
