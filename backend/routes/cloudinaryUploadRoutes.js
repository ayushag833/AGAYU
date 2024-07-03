import express from "express";
import multer from "multer";
import uploadFile from "../utils/uploadFile.js";

const router = express.Router();

const storage = multer.diskStorage({});

const upload = multer({ storage, limits: { fileSize: 10000000 } });

router.post("/", (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    } else if (req.file) {
      const upload = await uploadFile(req.file, "AGAYU");
      return res.status(200).json({
        file: upload.secure_url,
        message: "File uploaded successfully",
      });
    } else {
      return res.status(400).json({ message: "No file provided" });
    }
  });
});

export default router;
