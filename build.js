// Inside of build.js:
const {injectManifest} = require('workbox-build');

// These are some common options, and not all are required.
// Consult the docs for more info.
injectManifest({
  dontCacheBustURLsMatching: [new RegExp('...')],
  globDirectory: '...',
  globPatterns: ['...', '...'],
  maximumFileSizeToCacheInBytes: ...,
  swDest: '...',
  swSrc: '...',
}).then(({count, size, warnings}) => {
  if (warnings.length > 0) {
    console.warn(
      'Warnings encountered while injecting the manifest:'
      warnings.join('\n')
    );
  }

  console.log(`Injected a manifest which will precache ${count} files, totaling ${size} bytes.`);
});