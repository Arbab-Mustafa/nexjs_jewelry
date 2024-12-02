/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // You can specify a list of allowed domains here
    domains: [
      "*", // Allow all domains to be used
      "media.licdn.com", // Example of a valid domain
      "example.com",
      "www.lotuscolors.net",
      "treatedcolors.com",
      "scontent-fra3-1.cdninstagram.com",
      "scontent-fra3-2.cdninstagram.com",
      // Add your other trusted domains here
      // You can add more domains
    ],
  },
};

export default nextConfig;
