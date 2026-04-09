/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.everyspaces.com" }],
        destination: "https://everyspaces.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
