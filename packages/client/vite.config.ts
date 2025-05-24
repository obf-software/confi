import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const basePath = env.VITE_BASE_PATH || '/';

  return {
    base: basePath,
    plugins: [react()],
  };
});
