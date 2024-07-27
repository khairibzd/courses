/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "foundr.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "iuvjdnjyfeheunqhisrq.supabase.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
