/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true, // Set to false if you want it to be temporary
      },
    ];
  },
};

module.exports = nextConfig;
