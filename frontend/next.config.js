/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    domains: ["plus.unsplash.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/search",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
