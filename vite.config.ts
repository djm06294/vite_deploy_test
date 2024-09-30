import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/vite_deploy_test/",
});
// export default defineConfig(({ mode }) => ({
//   plugins: [react()],
//   base: mode === 'production' ? '/Vite-githubPages-test/' : '/',
// }));
