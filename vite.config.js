import { VitePWA } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "",
  build: {
    outDir: "dist",
    base: "",
  },

  //   plugins: [
  //     VitePWA({
  //       injectManifest: true,
  //     }),
  //   ],
});
