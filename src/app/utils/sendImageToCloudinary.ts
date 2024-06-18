import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

export const sendImageToCloudinary = async (
  imageName: string,
  imagePath: string
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config?.cloudinary_cloud_name,
    api_key: config?.cloudinary_api_key,
    api_secret: config?.cloudinary_api_secret,
  });
  // CLOUDINARY_URL=cloudinary://311358956994637:WY5aZhp5EI3ewjUBJyUKYxPQqJw@dsw3utkei
  // Upload an image
  // console.log({ imagePath });
  try {
    const uploadResult = await cloudinary.uploader.upload(
      `${imagePath}`,
      {
        public_id: imageName,
      },
      function (err: any, result) {
        // console.log("funtion inter");
        // console.log({ err });
        // console.log({ result });
        if (err) {
          throw new AppError(httpStatus.BAD_REQUEST, err);
        }
        return result;
      }
    );
    return uploadResult;
  } catch (err: any) {
    //   return err;
    throw new AppError(httpStatus.BAD_REQUEST, err);
  }
};

// temporary storage to server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
