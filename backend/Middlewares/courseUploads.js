const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');

const storage =  new CloudinaryStorage({
    cloudinary,
    params : async (req,file)=>{
        let folder = 'courses'
        if ( file.mimetype.startsWith("video/")) folder = "courses_videos"
        else if (file.mimetype ==="application/pdf")folder = "course_pdfs";
        else if (file.mimetype.startsWith("image/")) folder = "course_thumbnails";
        return {
            folder,
            allowed_formats:["mp4", "mov", "avi", "pdf", "jpg", "jpeg", "png", "webp"],
            public_id: `${file.fieldname}-${Date.now()}`,
            resource_type: "auto",
        }
    }
})

const uploadMultiple = multer({storage});

module.exports = uploadMultiple