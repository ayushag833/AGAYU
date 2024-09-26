// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "backend/uploads");
//   },
//   filename: function (req, file, cb) {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single("image");

// router.post("/", (req, res) => {
//   uploadSingleImage(req, res, (err) => {
//     if (err) {
//       res.status(400).json({ message: err.message });
//     } else if (req.file) {
//       res.status(200).json({
//         message: "Image uploaded successfully",
//         image: `/uploads/${req.file.filename}`,
//       });
//     } else {
//       res.status(400).json({ message: "No image file provided" });
//     }
//   });
// });

// export default router;
