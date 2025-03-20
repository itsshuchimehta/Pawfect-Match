/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
      unoptimized: true,
    },
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/Pawfect-Match' : '', 
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Pawfect-Match/' : '',
  }
  
  module.exports = nextConfig
  
  