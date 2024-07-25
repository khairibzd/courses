/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Adjust the limit as needed (e.g., '5mb', '20mb')
    },
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foundr.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
