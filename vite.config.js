import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Dev-only middleware so `npm run dev` serves /api/submit with the same
 * handler Vercel runs in production. Reads secrets from .env (never bundled).
 */
function localApi(env) {
  return {
    name: 'local-api',
    configureServer(server) {
      Object.assign(process.env, env);
      server.middlewares.use('/api/submit', async (req, res) => {
        let raw = '';
        req.on('data', (c) => (raw += c));
        req.on('end', async () => {
          try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = null; }
          res.status = (code) => { res.statusCode = code; return res; };
          res.json = (obj) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(obj)); };
          const { default: handler } = await server.ssrLoadModule('/api/submit.js');
          handler(req, res);
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), localApi(env)],
    base: process.env.PREVIEW_BUILD ? './' : '/',
    build: { target: 'es2019', cssCodeSplit: true },
  };
});
