const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create directory if not exists
}

const storageConfiguration = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use dynamically created directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploader = multer({ storage: storageConfiguration });

module.exports = uploader;
