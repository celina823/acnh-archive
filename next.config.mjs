const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dodo.ac",
      },
    ],
  },
};

export default nextConfig;
