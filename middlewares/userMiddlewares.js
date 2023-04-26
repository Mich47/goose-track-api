const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const AppError = require("../helpers/appError");
const { checkUpdateData } = require("../utils/userValidators");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "avatars",
  allowedFormats: ["jpg", "png", "gif", "jpeg"],
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  file.mimetype.startsWith("image")
    ? cb(null, true)
    : cb(new AppError(400, "Downloaded file must be image type"), false);
};

exports.uploadCloud = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

exports.checkUpdateMiddleware = (req, res, next) => {
  const error = checkUpdateData(req.body);
  if (error) {
    res
      .status(400)
      .json({ message: `Do not valid field ${error.details[0].context.key}` });
  }

  next();
};
