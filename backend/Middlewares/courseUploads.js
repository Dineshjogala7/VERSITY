const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Decide the folder based on file type
    let folder = 'courses';
    if (file.mimetype.startsWith('video/')) folder = 'courses_videos';
    else if (file.mimetype === 'application/pdf') folder = 'course_pdfs';
    else if (file.mimetype.startsWith('image/')) folder = 'course_thumbnails';

    // ✅ Determine the resource type
    let resourceType = 'auto';
    if (file.mimetype === 'application/pdf') {
      resourceType = 'raw'; // PDFs should be treated as raw
    }

    return {
      folder,
      allowed_formats: ['mp4', 'mov', 'avi', 'pdf', 'jpg', 'jpeg', 'png', 'webp'],
      public_id: `${file.fieldname}-${Date.now()}`,
      resource_type: resourceType, // 👈 use raw for pdfs
    };
  },
});

const uploadMultiple = multer({ storage });

module.exports = uploadMultiple;
