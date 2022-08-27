// `const path = require('path');

// module.exports = {
// swDest: path.join(__dirname, 'dist', 'sw.js'),
// swSrc: path.join(__dirname, 'sw.js'),
// globDirectory: path.join(__dirname, 'dist'),
// globPatterns: ['**/*.{html,js,json,jpeg, png}'],
// };`

module.exports = {
    globDirectory: "build/",
    globPatterns: [
      "**/*.css",
      "index.html",
      "js/*.js",
      "pages/fallback.html",
      "images/home/*.jpg",
      "images/icon/*.svg",
    ],
    swSrc: "js/sw.js",
    swDest: "build/sw.js",
    globIgnores: ["../workbox-config.js"],
  };