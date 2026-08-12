/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Add your image host(s) here once image storage (Vercel Blob / Cloudinary)
    // is provisioned. Never a localhost/dev-only host in this list.
    remotePatterns: [],
  },
};

export default nextConfig;
