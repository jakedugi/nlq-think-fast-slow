/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Tell Next.js that app directory is in src/
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
