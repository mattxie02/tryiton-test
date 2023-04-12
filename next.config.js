/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['images.unsplash.com', 'upcdn.io'],
  },
}

module.exports = nextConfig
