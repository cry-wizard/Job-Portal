import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/";

// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|doc|docx/;

  const ext = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (ext) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF/DOC/DOCX files allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
});