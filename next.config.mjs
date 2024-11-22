/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // You can specify a list of allowed domains here
    domains: [
      "media.licdn.com", // Example of a valid domain
      "example.com",
      "treatedcolors.com",
      // Add your other trusted domains here
      // You can add more domains
    ],
  },
};

export default nextConfig;
