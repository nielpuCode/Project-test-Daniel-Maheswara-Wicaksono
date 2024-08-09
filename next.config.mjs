/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.suitdev.com', // Specify the exact hostname
        port: '',
        pathname: '/storage/files/**', // Specify the path pattern
      },
    ],
  },
}
export default nextConfig;
