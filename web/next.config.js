/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images :{
    domains : ['res.cloudinary.com', 'encrypted-tbn0.gstatic.com']
  }
}

module.exports = nextConfig
