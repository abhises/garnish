import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  try {
    const result = await cloudinary.uploader.upload(
      path.resolve(process.cwd(), 'public/media/Garnish22.jpg'),
      {
        folder: 'garnish-media',
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      }
    );
    console.log('Uploaded to Cloudinary:', result.secure_url);
  } catch (error) {
    console.error('Upload failed:', error);
  }
}
run().catch(console.error);
