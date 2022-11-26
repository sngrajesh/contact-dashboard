/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["fakestoreapi.com", "external-content.duckduckgo.com" ,'github.com', 'images.unsplash.com', 'garwoodcenter.wpengine.com'],
  },
};

module.exports = nextConfig;
