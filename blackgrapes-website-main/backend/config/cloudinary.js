import { v2 as cloudinary } from 'cloudinary';

// Black Grapes Softech - Official Cloudinary Credentials
const DEFAULT_CLOUD_NAME = 'i88tgcfi';
const DEFAULT_API_KEY = '584639751272124';
const DEFAULT_API_SECRET = 'b7ciD4NFy0MoFhnj6g4UjV-m7Rc';

export const isCloudinaryReady = () => {
  if (process.env.CLOUDINARY_URL) {
    return true;
  }
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME || DEFAULT_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || DEFAULT_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || DEFAULT_API_SECRET;

  return Boolean(
    cloudName &&
    apiKey &&
    apiSecret &&
    !cloudName.includes('your_') &&
    !apiKey.includes('your_') &&
    !apiSecret.includes('your_')
  );
};

export const ensureCloudinaryConfig = () => {
  if (!isCloudinaryReady()) return false;

  if (process.env.CLOUDINARY_URL) {
    cloudinary.config({
      cloudinary_url: process.env.CLOUDINARY_URL,
      secure: true
    });
    return true;
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME || DEFAULT_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY || DEFAULT_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET || DEFAULT_API_SECRET;

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
  return true;
};

// Auto-configure on load
ensureCloudinaryConfig();
console.log('\x1b[32m%s\x1b[0m', `[Cloudinary Active] Cloud: ${process.env.CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUD_NAME}`);

/**
 * Upload a file path, base64 data URI, or URL to Cloudinary
 * @param {string} fileOrDataUri - Absolute path, base64 data URI, or remote URL
 * @param {object} options - Options such as folder, resource_type ('image' | 'video' | 'auto')
 */
export const uploadToCloudinary = async (fileOrDataUri, options = {}) => {
  ensureCloudinaryConfig();

  const defaultOptions = {
    folder: 'blackgrapes_media',
    resource_type: options.resourceType || options.resource_type || 'auto',
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    ...options
  };

  return await cloudinary.uploader.upload(fileOrDataUri, defaultOptions);
};

/**
 * Delete an asset from Cloudinary by public ID
 * @param {string} publicId - The public ID returned by Cloudinary
 * @param {string} resourceType - 'image' or 'video'
 */
export const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  if (!publicId) return null;
  ensureCloudinaryConfig();
  return await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

export default cloudinary;
