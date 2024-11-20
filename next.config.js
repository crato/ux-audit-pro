/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true // Temporarily allow build with type errors
  },
  eslint: {
    ignoreDuringBuilds: true // Temporarily allow build with lint errors
  }
}

module.exports = nextConfig