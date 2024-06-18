import { v2 as cloudinary } from "cloudinary";
import config from "../config";
import multer from "multer";

export const sendImageToCloudinary = () => {
  (async function () {
    // Configuration
    cloudinary.config({
      cloud_name: config?.cloudinary_cloud_name,
      api_key: config?.cloudinary_api_key,
      api_secret: config?.cloudinary_api_secret,
    });
    // CLOUDINARY_URL=cloudinary://311358956994637:WY5aZhp5EI3ewjUBJyUKYxPQqJw@dsw3utkei
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(
        "https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        {
          public_id: "flower",
        }
      )
      .catch((error) => {
        console.log(error);
      });

    console.log({ uploadResult });

    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url("shoes", {
      fetch_format: "auto",
      quality: "auto",
    });

    console.log({ optimizeUrl });

    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url("shoes", {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });

    console.log({ autoCropUrl });
  })();
};


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