import { v2 as Cloudinary } from "cloudinary";
import { EnvVars } from "./env";

Cloudinary.config({
  api_key: EnvVars.CLOUDINARY_API_KEY as string,
  api_secret: EnvVars.CLOUDINARY_API_SECRET as string,
  cloud_name: EnvVars.CLOUDINARY_CLOUD_NAME as string,
});

export const cloudinaryUpload = Cloudinary;
