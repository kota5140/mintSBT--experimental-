/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
  /* これでエラー解決 */
  images: {
    domains: ['ipfs.io'], // 画像を提供するドメインを設定
  },
};

module.exports = nextConfig;
