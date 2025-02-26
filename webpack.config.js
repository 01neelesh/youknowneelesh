const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  // Other webpack config...
  optimization: {
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: { quality: 80 },
              webp: { quality: 80 },
              png: { compressionLevel: 9 },
            },
          },
        },
        generator: [
          {
            preset: 'webp',
            options: {
              quality: 80,
            },
          },
        ],
      }),
    ],
  },
};