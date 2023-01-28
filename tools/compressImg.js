import sharp from 'sharp'

export const compressImage = (imageArray) => {
  return Promise.all(
    imageArray.map(async (image) => {
      try {
            const compressedImage = await sharp(image)
                .resize({ width: 500, height: 500, fit: 'inside' })
                .toBuffer();
            return compressedImage;
        } catch (error) {
            console.error(error);
        }
    })
  );
};

// module.exports = {
//   compressImage,
// };

