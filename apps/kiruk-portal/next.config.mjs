/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // pglite ships WASM + resolves its data dir via paths that break when bundled — load it from
  // node_modules at runtime instead. (Neon driver externalized too; harmless and avoids surprises.)
  serverExternalPackages: ['@electric-sql/pglite', '@neondatabase/serverless'],
};

export default nextConfig;
