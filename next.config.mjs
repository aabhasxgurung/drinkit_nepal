/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvhoi2xg1/**",
      },
    ],
  },
};

export default nextConfig;
