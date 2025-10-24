const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');


const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "userProfiles",
            allowed_formats: ["jpg", "png", "jpeg", "webp"], // allowed file types
            public_id:file.originalname.split('.')[0]+'-'+Date.now()
        };
    }
});

const upload = multer({storage:storage})

module.exports = upload
