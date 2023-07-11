/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          // TODO: codesandbox.io may place the UI and API on different ports or domains.
          // Look into a more secure way to limit ACL dynamically.
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/img/**",
      },
    ],
  },
};
