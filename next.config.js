/** @type {import('next').NextConfig} */
// Next.js configuration.
// Security headers are delivered via vercel.json in production (see vercel.json).
const nextConfig = {
  reactStrictMode: true,
  // Keep the bundle lean: we ship no database client, only Edge-safe code in the API route.
  poweredByHeader: false,
};

module.exports = nextConfig;
