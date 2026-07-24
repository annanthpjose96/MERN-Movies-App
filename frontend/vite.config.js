import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://movieflix-backend-g4wd.onrender.com",
      "/uploads/": "https://movieflix-backend-g4wd.onrender.com",
    },
  },
});
