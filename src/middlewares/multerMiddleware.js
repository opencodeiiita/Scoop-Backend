import multer from "multer";//
import {v2 as cloudinary} from 'cloudinary';






const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);

    }
})

const multerFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PNG, JPG, and SVG files are allowed!'), false);
    }
}
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
export default upload;
