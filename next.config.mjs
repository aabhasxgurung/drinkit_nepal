/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["swiper"],
  trailingSlash: true,
  images: {
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
