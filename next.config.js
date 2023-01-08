/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// const withMobx = require("next-mobx-wrapper");

// module.exports = withMobx({
//   webpack(config) {
//     // Add support for loading `.ts` and `.tsx` files
//     config.resolve.extensions.push(".ts", ".tsx");
//     return config;
//   },
// });
