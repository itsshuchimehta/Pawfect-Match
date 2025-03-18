/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
    basePath: '/Pawfect-Match', 
    assetPrefix: '/Pawfect-Match/',
  }
  
  module.exports = nextConfig
  
  