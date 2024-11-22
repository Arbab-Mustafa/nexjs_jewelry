/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "media.licdn.com", // Add this domain
      "example.com", // You can add other domains here as well
    ], // Add the domain here
  },
};

export default nextConfig;
