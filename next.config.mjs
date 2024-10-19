/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  experimental: {
    outputStandalone: true,
  },
};

export default nextConfig;
