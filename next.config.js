/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // API 路由在静态导出时不支持，使用客户端调用
  trailingSlash: true,
}

module.exports = nextConfig
