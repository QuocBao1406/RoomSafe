import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// cau hinh cloudinary
cloudinary.config({
    cloud_name: 'huubao1213',
    api_key: '923727338452816',
    api_secret: '1aAvN7ELlEay-DLkIln04K1a9tw'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'roomsafe_upload',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

export default upload;