const { env } = require("process");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,

  env: {
    MONGO_URI:
      "mongodb+srv://david-wagih:uMcaTwBaECPjnz0s@cluster0.5gxme.mongodb.net/Employees?retryWrites=true&w=majority",
  },
};
