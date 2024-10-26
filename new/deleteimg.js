require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImagesInFolder = async (folder) => {
  try {
    const response = await cloudinary.api.delete_resources_by_prefix(folder, {
      resource_type: 'image',
    });
    console.log(`Deleted all images in folder "${folder}":`, response);
  } catch (error) {
    console.error(`Error deleting images in folder "${folder}":`, error);
  }
};

const deleteFolder = async (folder) => {
  try {
    const response = await cloudinary.api.delete_folder(folder);
    console.log(`Deleted folder "${folder}":`, response);
  } catch (error) {
    console.error(`Error deleting folder "${folder}":`, error);
  }
};

const deleteFolderWithImages = async (folder) => {
  console.log(`Deleting all images from folder: "${folder}"...`);
  await deleteImagesInFolder(folder);

  console.log(`Deleting folder: "${folder}"...`);
  await deleteFolder(folder);
};

const folderName = 'transit_car_images';

(async () => {
  await deleteFolderWithImages(folderName);
})();
